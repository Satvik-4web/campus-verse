require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { exec } = require('child_process');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 8080;
const QUEST_IP = process.env.QUEST_IP || '192.168.1.100';

// Intent to launch local media on Quest
const TARGET_VR_PATH = process.env.TARGET_VR_PATH || 'file:///sdcard/Movies/CampusTours/';

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Kiosk Bridge is running.' });
});

wss.on('connection', (ws) => {
    console.log('[Bridge Server] Kiosk Client connected.');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log(`[Bridge Server] Received payload:`, data);

            if (data.event === 'LAUNCH_TOURS') {
                launchCampusTours(ws);
            } else if (data.event === 'LAUNCH_GAME') {
                launchGame(ws, data.package);
            }
        } catch (error) {
            console.error('[Bridge Server] Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('[Bridge Server] Kiosk Client disconnected.');
    });
});

const adbPath = process.env.ADB_PATH ? `"${process.env.ADB_PATH}"` : 'adb';

function launchCampusTours(ws) {
    console.log('[ADB] Initiating connection to Meta Quest...');
    
    // Step 1: Ensure ADB is connected to the Quest
    exec(`${adbPath} connect ${QUEST_IP}:5555`, (err, stdout, stderr) => {
        if (err || stdout.includes('failed to connect') || stdout.includes('cannot connect')) {
            console.error(`[ADB] Connection error: ${err ? err.message : stdout}`);
            ws.send(JSON.stringify({ event: 'ERROR', message: 'Quest not found, please wake headset.' }));
            return;
        }
        
        console.log(`[ADB] Connect Output: ${stdout.trim()}`);
        
        // Step 2: Fire the intent
        const adbCommand = `${adbPath} -s ${QUEST_IP}:5555 shell am start -a android.intent.action.VIEW -d "${TARGET_VR_PATH}" -t "video/*"`;
        console.log(`[ADB] Executing: ${adbCommand}`);
        
        exec(adbCommand, (launchErr, launchStdout, launchStderr) => {
            if (launchErr || launchStderr.includes('Error:')) {
                console.error(`[ADB] Launch error: ${launchErr ? launchErr.message : launchStderr}`);
                ws.send(JSON.stringify({ event: 'ERROR', message: 'Quest connected, but failed to launch tours.' }));
                return;
            }
            console.log(`[ADB] Launch Success: ${launchStdout.trim()}`);
            ws.send(JSON.stringify({ event: 'LAUNCH_SUCCESS' }));
        });
    });
}

function launchGame(ws, packageName) {
    console.log(`[ADB] Initiating connection to Meta Quest to launch game: ${packageName}...`);
    
    exec(`${adbPath} connect ${QUEST_IP}:5555`, (err, stdout, stderr) => {
        if (err || stdout.includes('failed to connect') || stdout.includes('cannot connect')) {
            console.error(`[ADB] Connection error: ${err ? err.message : stdout}`);
            ws.send(JSON.stringify({ event: 'ERROR', message: 'Quest not found, please wake headset.' }));
            return;
        }
        
        console.log(`[ADB] Connect Output: ${stdout.trim()}`);
        
        const adbCommand = `${adbPath} -s ${QUEST_IP}:5555 shell monkey -p ${packageName} -c android.intent.category.LAUNCHER 1`;
        console.log(`[ADB] Executing: ${adbCommand}`);
        
        exec(adbCommand, (launchErr, launchStdout, launchStderr) => {
            if (launchErr || launchStderr.includes('Error:') || launchStdout.includes('No activities found to run')) {
                console.error(`[ADB] Launch error: ${launchErr ? launchErr.message : launchStderr || launchStdout}`);
                ws.send(JSON.stringify({ event: 'ERROR', message: `Quest connected, but failed to launch game (${packageName}).` }));
                return;
            }
            console.log(`[ADB] Launch Success: ${launchStdout.trim()}`);
            ws.send(JSON.stringify({ event: 'LAUNCH_SUCCESS' }));
        });
    });
}

server.listen(PORT, () => {
    console.log(`[Bridge Server] Listening on port ${PORT}`);
    console.log(`[Bridge Server] Configured for Meta Quest IP: ${QUEST_IP}`);
});

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { exec } = require('child_process');

let mainWindow;

const isDev = !app.isPackaged;
const adbPath = isDev 
    ? path.join(__dirname, '..', 'resources', 'platform-tools', 'adb.exe')
    : path.join(process.resourcesPath, 'resources', 'platform-tools', 'adb.exe');

function startBridgeServer() {
    const expressApp = express();
    const server = http.createServer(expressApp);
    const wss = new WebSocket.Server({ server });

    const PORT = 8080;
    const QUEST_IP = process.env.QUEST_IP || '172.31.242.30'; 
    const TARGET_VR_PATH = 'file:///sdcard/Movies/CampusTours/';

    wss.on('connection', (ws) => {
        console.log('[Electron Bridge] Kiosk Client connected.');

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                console.log('[Electron Bridge] Received payload:', data);

                if (data.event === 'LAUNCH_TOURS') {
                    launchCampusTours(ws, QUEST_IP, TARGET_VR_PATH);
                } else if (data.event === 'LAUNCH_GAME') {
                    launchGame(ws, data.package, QUEST_IP);
                }
            } catch (error) {
                console.error('[Electron Bridge] Error parsing message:', error);
            }
        });
    });

    server.listen(PORT, () => {
        console.log('[Electron Bridge] Listening on port ' + PORT);
    });
}

function launchCampusTours(ws, QUEST_IP, TARGET_VR_PATH) {
    exec('"' + adbPath + '" connect ' + QUEST_IP + ':5555', (err, stdout) => {
        if (err || stdout.includes('failed to connect')) {
            ws.send(JSON.stringify({ event: 'ERROR', message: 'Quest not found.' }));
            return;
        }
        const adbCommand = '"' + adbPath + '" -s ' + QUEST_IP + ':5555 shell am start -a android.intent.action.VIEW -d "' + TARGET_VR_PATH + '" -t "video/*"';
        exec(adbCommand, (lErr) => {
            if (!lErr) ws.send(JSON.stringify({ event: 'LAUNCH_SUCCESS' }));
        });
    });
}

function launchGame(ws, packageName, QUEST_IP) {
    exec('"' + adbPath + '" connect ' + QUEST_IP + ':5555', (err, stdout) => {
        if (err || stdout.includes('failed to connect')) {
            ws.send(JSON.stringify({ event: 'ERROR', message: 'Quest not found.' }));
            return;
        }
        const adbCommand = '"' + adbPath + '" -s ' + QUEST_IP + ':5555 shell monkey -p ' + packageName + ' -c android.intent.category.LAUNCHER 1';
        exec(adbCommand, (lErr) => {
            if (!lErr) ws.send(JSON.stringify({ event: 'LAUNCH_SUCCESS' }));
        });
    });
}

function createWindow() {
    startBridgeServer();

    mainWindow = new BrowserWindow({
        width: 1080,
        height: 1920,
        fullscreen: true, 
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: false,
            contextIsolation: true
        }
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '..', 'dist', 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.disableHardwareAcceleration();
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


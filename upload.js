import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://cnckzaybkmlcfxnhvrmp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuY2t6YXlia21sY2Z4bmh2cm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MjQ0NDYsImV4cCI6MjEwNDMwMDQ0Nn0.K5_AlEAFqUFQDQJVHd3DSAuffUxVxeMTQDR8wu0PoYY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (let file of list) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(await walk(file));
        } else {
            if (file.endsWith('.mp4') || file.endsWith('.jpg') || file.endsWith('.png')) {
                results.push(file);
            }
        }
    }
    return results;
}

async function upload() {
    const baseDir = path.resolve('public', 'videos');
    const files = await walk(baseDir);
    console.log("Found " + files.length + " files to upload.");

    for (const file of files) {
        const relPath = path.relative(baseDir, file).replace(/\\\\/g, '/');
        const fileData = fs.readFileSync(file);
        
        console.log("Uploading " + relPath + "...");
        const { data, error } = await supabase.storage
            .from('kiosk-media')
            .upload(relPath, fileData, {
                contentType: file.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg',
                upsert: true
            });

        if (error) {
            console.error("Error uploading " + relPath + ":", error.message);
        } else {
            console.log("Successfully uploaded " + relPath);
        }
    }
    console.log("Done uploading all videos!");
}

upload();
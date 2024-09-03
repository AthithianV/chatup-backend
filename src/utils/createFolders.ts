import * as fs from 'fs';
import * as path from 'path';

const logDir = path.join('logs');
const errorLogPath = path.join(logDir, 'error.log');
const appLogPath = path.join(logDir, 'app.log');

// Function to ensure a file exists
function ensureFileExists(filePath: string) {
    if (!fs.existsSync(filePath)) {
        console.log(`File '${filePath}' does not exist. Creating it...`);
        fs.writeFileSync(filePath, ''); // Create an empty file
    }
}

// Function to ensure a directory exists
function ensureDirectoryExists(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        console.log(`Directory '${dirPath}' does not exist. Creating it...`);
        fs.mkdirSync(dirPath, { recursive: true });
    }
}


export function createLogDirectory():void{
    ensureDirectoryExists(logDir);
    ensureFileExists(errorLogPath);
    ensureFileExists(appLogPath);
}

export function createUploadDirectory():void{
    
    ensureDirectoryExists(path.join("uploads"));

    ["groupIcon", "media", "profile"].forEach(folder=>{
        ensureDirectoryExists(path.join("uploads", folder));
    });

    ["audio", "file", "images", "video"].forEach(folder=>{
        ensureDirectoryExists(path.join("uploads", "media", folder));
    });
    
    ["original", "compressed"].forEach(folder=>{
        ensureDirectoryExists(path.join("uploads", "media", "images", folder));
        ensureDirectoryExists(path.join("uploads", "groupIcon", folder));
        ensureDirectoryExists(path.join("uploads", "profile", folder));
    });

    ["original", "thumbnail"].forEach(folder=>{
        ensureDirectoryExists(path.join("uploads", "media", "video", folder));
    })


}


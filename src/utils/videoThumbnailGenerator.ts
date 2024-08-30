import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

// Function to generate a thumbnail from a video
export const generateVideoThumbnail = (videoPath: string, thumbnailPath: string, callback: (error: Error | null) => void) => {
    ffmpeg(videoPath)
        .on('end', () => {
            console.log('Screenshot taken');
            callback(null);
        })
        .on('error', (err:Error) => {
            console.error('Error generating thumbnail:', err);
            callback(err);
        })
        .screenshots({
            count: 1,
            folder: path.dirname(thumbnailPath),
            filename: path.basename(thumbnailPath),
            size: '320x240'
        });
};

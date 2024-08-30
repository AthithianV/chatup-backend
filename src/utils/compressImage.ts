import sharp from "sharp";

const compressImage = async (inputPath:string, outputPath:string):Promise<void>=>{
    try {
        await sharp(inputPath)
        .toFormat("jpeg", {quality: 30})
        .toFile(outputPath);
    } catch (error) {
        throw error;
    }
}

export default compressImage;


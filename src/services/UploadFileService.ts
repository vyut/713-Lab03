import s3Client from "../awsConfig";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";

function generateSaltedFilename(originalName: string): string {
    const salt = randomBytes(16).toString('hex');
    const extension = originalName.split('.').pop();
    return `${salt}.${extension}`;
}

export async function uploadFile(bucket: string, filePath: string, file: Express.Multer.File): Promise<string> {
    const saltedFilename = generateSaltedFilename(file.originalname);
    const saltedFilePath = `uploads/${saltedFilename}`;
    const params = {
        Bucket: bucket,
        Key: saltedFilePath,
        Body: file.buffer,
        ContentType: file.mimetype
    };
    
    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log("File updaloed successfully", data);
        const publicUrl = `https://uutmhyjcvbahkpyygqke.supabase.co/storage/v1/object/public/bucket-se713/${saltedFilePath}`;
        console.log("File uploaded at", publicUrl);
        return publicUrl;
    } catch (error) {
        console.error("Error uploading file", error);
        throw error;
    }
}
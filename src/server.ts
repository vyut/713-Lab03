import express, { Request, Response } from "express";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
import bookRoute from "./routes/BookRoute";
import { uploadFile } from "./services/UploadFileService";

const upload = multer({ storage: multer.memoryStorage() });

import add from "./function";
const app = express();
app.use(express.json());
app.use('/books', bookRoute);
const port = 3000;

app.post("/upload", upload.single("file"), async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const bucket = process.env.SUPABASE_BUCKET_NAME as string;
    const filePath = process.env.UPLOAD_DIR as string;
    
    const outputUrl = await uploadFile(bucket, filePath, file);

    res.status(200).send(outputUrl);
  } catch (error) {
    res.status(500).send("Error uploading file.");
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
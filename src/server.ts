import express, { Request, Response } from "express";
import multer from "multer";
import dotenv from 'dotenv';
import eventRoute from './routes/EventRoute';
dotenv.config();
import { uploadFile } from "./services/UploadFileService";

const upload = multer({ storage: multer.memoryStorage() });

import add from "./function";
const app = express();
app.use(express.json());
app.use('/events', eventRoute);
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/upload", upload.single("file"), async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const bucket = process.env.SUPABASE_BUCKET_NAME as string;
    const filePath = process.env.UPLOAD_DIR as string;

    if (!bucket || !filePath) {
      return res.status(500).send("Bucket name or file path not configured.");
    }
    const outputUrl = await uploadFile(bucket, filePath, file);

    res.status(201).send(outputUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file");
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

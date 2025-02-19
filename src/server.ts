import express, { Request, Response } from "express";
import { getAllBooks, getBooksByGroup, getBookById, addBook } from "./services/BookService";

import type { Book } from "./models/Book";
import multer from "multer";
import { uploadFile } from "./services/UploadFileService";

const upload = multer({ storage: multer.memoryStorage() });

import add from "./function";
const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/books", async (req, res) => {
  if (req.query.group) {
    const group = req.query.group as string;
    const filteredBooks = await getBooksByGroup(group as string);
    res.json(filteredBooks);
  } else {
    res.json(await getAllBooks());
  }
});

app.get("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await getBookById(id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

app.post("/upload", upload.single("file"), async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const bucket = "bucket-se713";
    const filePath = `uploads`;
    
    const outputUrl = await uploadFile(bucket, filePath, file);

    res.status(200).send(outputUrl);
  } catch (error) {
    res.status(500).send("Error uploading file.");
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
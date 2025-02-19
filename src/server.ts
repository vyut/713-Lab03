import express, { Request, Response } from "express";
import { getAllBooks, getBooksByGroup, getBookById, addBook } from "./services/BookService";
import type { Book } from "./services/BookService";
import add from "./function";
const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/books", (req, res) => {
  if (req.query.group) {
    const group = req.query.group as string;
    const filteredBooks = getBooksByGroup(group as string);
    res.json(filteredBooks);
  } else {
    res.json(getAllBooks());
  }
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = getBookById(id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

app.post("/books", (req, res) => {
  const newBook: Book = req.body;
  addBook(newBook);
  res.json(newBook);
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
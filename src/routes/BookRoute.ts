import express, { Request, Response } from "express";
import { getAllBooks, getBooksByGroup, getBookById, addBook } from "../services/BookService";
import type { Book } from "../models/Book";
import exp from "constants";
const router = express.Router();

router.get("/", async (req, res) => {
    if (req.query.group) {
        const group = req.query.group as string;
        const filteredBooks = await getBooksByGroup(group as string);
        res.json(filteredBooks);
    } else {
        res.json(await getAllBooks());
    }
})

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await getBookById(id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

router.post("/", async (req, res) => {
    const newBook: Book = req.body;
    await addBook(newBook);
    res.json(newBook);
});

export default router;

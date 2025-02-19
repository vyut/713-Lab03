import type { Book } from "../models/Book";
// import { getAllBooks as allBooks, getBookById as bookById, getBooksByGroup as BookByGroup, addBook as addNewBook } from "../repository/BookRepository";
import * as repo from "../repository/BookRepository";

export function getBooksByGroup(group: string): Promise<Book[]> {
    return repo.getBooksByGroup(group);
}

export function getAllBooks(): Promise<Book[]> {
    return repo.getAllBooks();
}

export function getBookById(id: number): Promise<Book | undefined> {
    return repo.getBookById(id);
}

export function addBook(newBook: Book): Promise<Book> {
    return repo.addBook(newBook);
}

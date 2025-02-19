import type { Book } from "../models/Book";
import connection from "../db";
import exp from "constants";

export async function getBooksByGroup(group: string): Promise<Book[]> {
    const [rows] = await connection.execute('SELECT * FROM books WHERE author = ?', [group]);
    return rows as Book[];
}

export async function getAllBooks(): Promise<Book[]> {
    const [rows] = await connection.execute('SELECT * FROM books');
    return rows as Book[];
}

export async function getBookById(id: number): Promise<Book | undefined> {
    const [rows] = await connection.execute('SELECT * FROM books WHERE id = ?', [id]);
    const books = rows as Book[];
    return books.length > 0 ? books[0] : undefined;
}

export async function addBook(newBook: Book): Promise<Book> {
    const { title, author, description, group } = newBook;
    const [result] = await connection.execute('INSERT INTO books (title, author, description, `group`) VALUES (?, ?, ?, ?)', [title, author, description, group]);
    newBook.id = (result as any).insertId;
    return newBook;
}
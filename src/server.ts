import express, { Request, Response } from "express";
import { getAllEvents, getEventByCategory, getEventById, addEvent } from "./services/EventService";
import type { Event } from "./services/EventService";

import add from "./function";
const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/events", (req, res) => {
    if (req.query.category) {
      const category = req.query.category as string;
      const filteredEvents = getEventByCategory(category as string);
      res.json(filteredEvents);
    } else {
      res.json(getAllEvents());
    }
});

app.get("/events/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const event = getEventById(id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).send("Event not found");
    }
});  

app.post("/events", (req, res) => {    
  const newEvent: Event = req.body;
  addEvent(newEvent);
  res.json(newEvent);
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

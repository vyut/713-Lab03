import express, { Request, Response } from "express";
import add from "./function";
const app = express();
app.use(express.json());
const port = 3000;

interface Event {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petsAllowed: boolean;
  organizer: string;
}

const events: Event[] = [
  {
    id: 1,
    category: "Music",
    title: "Concert",
    description: "A live concert",
    location: "London",
    date: "2021-07-01",
    time: "19:00",
    petsAllowed: false,
    organizer: "Live Nation"
  },
  {
    id: 2,
    category: "Music",
    title: "Festival",
    description: "A music festival",
    location: "Manchester",
    date: "2021-07-15",
    time: "12:00",
    petsAllowed: true,
    organizer: "Festival Republic"
  },
  {
    id: 3,
    category: "Sports",
    title: "Football Match",
    description: "A football match",
    location: "Liverpool",
    date: "2021-08-01",
    time: "15:00",
    petsAllowed: false,
    organizer: "Premier League"
  },
  // ...existing code...
  {
    id: 4,
    category: "Music",
    title: "Jazz Night",
    description: "An evening of smooth jazz",
    location: "New Orleans",
    date: "2021-09-10",
    time: "19:00",
    petsAllowed: true,
    organizer: "Jazz Fest"
  },
  {
    id: 5,
    category: "Theatre",
    title: "Shakespeare in the Park",
    description: "A performance of Hamlet",
    location: "Central Park",
    date: "2021-10-05",
    time: "18:00",
    petsAllowed: false,
    organizer: "NYC Theatre Group"
  },
  {
    id: 6,
    category: "Food",
    title: "Food Truck Festival",
    description: "A variety of food trucks offering delicious meals",
    location: "San Francisco",
    date: "2021-11-20",
    time: "12:00",
    petsAllowed: true,
    organizer: "Foodie Events"
  }
];

function getEventByCategory(category: string): Event[] {
  const filteredEvents = events.filter((event) => event.category === category);
  return filteredEvents;
}

function getAllEvents(): Event[] {
  return events;
}

function getEventById(id: number): Event | undefined {
  return events.find((event) => event.id === id);
}

function addEvent(newEvent: Event): Event {
  newEvent.id = events.length + 1;
  events.push(newEvent);
  return newEvent;
}

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

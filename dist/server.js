"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
const events = [
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
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/test", (req, res) => {
    const id = req.query.id;
    const output = `id: ${id}`;
    res.send(output);
});
app.get("/events", (req, res) => {
    if (req.query.category) {
        const category = req.query.category;
        const filteredEvents = events.filter((event) => event.category === category);
        res.json(filteredEvents);
    }
    else {
        res.json(events);
    }
});
app.get("/events/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const event = events.find((event) => event.id === id);
    if (event) {
        res.json(event);
    }
    else {
        res.status(404).send("Event not found");
    }
});
app.post("/events", (req, res) => {
    console.log(req.body);
    const newEvent = req.body;
    newEvent.id = events.length + 1;
    events.push(newEvent);
    res.json(newEvent);
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

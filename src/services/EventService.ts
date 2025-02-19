import type { Event } from "../models/Event";
// import { getAllEvents as allEvents, getEventById as eventById, addEvent as addNewEvent } from "../repository/EventRepository";
import * as repo from "../repository/EventRepository";

export function getEventByCategory(category: string): Promise<Event[]> {
    return repo.getEventByCategory(category);
}

export function getAllEvents(): Promise<Event[]> {
    return repo.getAllEvents();
}

export function getEventById(id: number): Promise<Event | undefined> {
    return repo.getEventById(id)
}

export function addEvent(newEvent: Event): Promise<Event> {
    return repo.addEvent(newEvent)
}
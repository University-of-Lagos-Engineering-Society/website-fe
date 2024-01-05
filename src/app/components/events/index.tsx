"use client";
import { useState } from "react";
import EventsContext from "./EventContext";
import EventsHeader from "./eventHeader";
import eventsObject from "./events.json";
import eventStyle from "./styles/events.module.css";
import EventTemplate from "./eventTemplate";
import EventSlideControl from "./controls";

export default function Events() {
    const [events] = useState(eventsObject);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(3);

    return (
        <EventsContext.Provider
            value={{
                events,
                currentSlideIndex,
                setCurrentSlideIndex,
            }}
        >
            <section className={eventStyle.events} id="events">
                <div className={eventStyle.eventsContainer}>
                    <EventsHeader />
                    {events.map((event) => {
                        return event.id === currentSlideIndex ? (
                            <EventTemplate key={event.id} {...event} />
                        ) : null;
                    })}
                    <EventSlideControl />
                </div>
            </section>
        </EventsContext.Provider>
    );
}

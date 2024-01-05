import { createContext } from "react";
import eventsObject from "./events.json";

const EventsContext = createContext({
    events: eventsObject,
    currentSlideIndex: 1,
    setCurrentSlideIndex: (value: number) => {},
});
export default EventsContext;

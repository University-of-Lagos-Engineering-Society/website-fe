import { useContext } from "react";
import EventsContext from "./EventContext";
import controlStyles from "./styles/controls.module.css";

export default function EventSlideControl() {
    let { events, currentSlideIndex, setCurrentSlideIndex } =
        useContext(EventsContext);
    return (
        <div className={controlStyles.slideControl}>
            <button
                className={`${controlStyles.moveButton} ${
                    currentSlideIndex == 1 ? controlStyles.disabled : null
                }`}
                disabled={currentSlideIndex == 1 ? true : false}
                onClick={() => {
                    currentSlideIndex > 1
                        ? setCurrentSlideIndex(currentSlideIndex - 1)
                        : null;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path
                        d="M8 11.2L2.4 6.00005L8 0.800049"
                        stroke="white"
                        strokeWidth="0.8"
                        strokeLinecap="square"
                    />
                </svg>
            </button>
            <div className={controlStyles.slideStats}>
                {events.map((event) => {
                    return (
                        <button
                            key={event.id}
                            className={`${
                                currentSlideIndex === event.id
                                    ? controlStyles.active
                                    : null
                            }`}
                            onClick={() => {
                                setCurrentSlideIndex(event.id);
                            }}
                        ></button>
                    );
                })}
            </div>
            <button
                className={`${controlStyles.moveButton} ${
                    currentSlideIndex == events.length
                        ? controlStyles.disabled
                        : null
                }`}
                disabled={currentSlideIndex == events.length ? true : false}
                onClick={() => {
                    currentSlideIndex < events.length
                        ? setCurrentSlideIndex(currentSlideIndex + 1)
                        : null;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path
                        d="M4 11.2L9.6 6.00005L4 0.800049"
                        stroke="white"
                        strokeWidth="0.8"
                        strokeLinecap="square"
                    />
                </svg>
            </button>
        </div>
    );
}

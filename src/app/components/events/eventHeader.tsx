import InstrumentSerif from "@/fonts/InstrumentSerif";
import eventsHeaderStyle from "./styles/eventsHeader.module.css";

export default function EventsHeader() {
    return (
        <div className={eventsHeaderStyle.eventsHeader}>
            <div className={eventsHeaderStyle.overlay}>
                <h2 className={eventsHeaderStyle.title}>
                    <span className={InstrumentSerif.className}>
                        Our Events
                        <div className={eventsHeaderStyle.dash}></div>
                    </span>
                </h2>
            </div>
        </div>
    );
}

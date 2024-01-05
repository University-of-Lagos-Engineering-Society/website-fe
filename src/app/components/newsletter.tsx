"use client";
import InstrumentSerif from "@/fonts/InstrumentSerif";
import newsletterStyles from "./styles/newsletter.module.css";

export default function Newsletter() {
    return (
        <div className={newsletterStyles.newsletter}>
            <div className={newsletterStyles.newsletterContainer}>
                <div className={newsletterStyles.header}>
                    <h3 className={InstrumentSerif.className}>
                        Join 2,000+ ULESites subscribed
                    </h3>
                    <h4>Stay in the loop with everything ULES.</h4>
                </div>
                <form
                    className={newsletterStyles.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className={newsletterStyles.input}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                        ></input>
                        <label>You can unsubscribe anytime</label>
                    </div>
                    <button className={newsletterStyles.submit} type="submit">
                        <span>SUBSCRIBE</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="34"
                            height="34"
                            viewBox="0 0 34 34"
                            fill="none"
                        >
                            <path
                                d="M22.1708 21.3753V11.8293H12.6248M21.5078 12.4922L11.8293 22.1708"
                                stroke="white"
                                stroke-width="2.25"
                                stroke-miterlimit="10"
                                stroke-linecap="square"
                            />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}

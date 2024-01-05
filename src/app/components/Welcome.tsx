import Image from "next/image";
import welcomeStyle from "./styles/welcome.module.css";
import Executives from "./Executives";
import InstrumentSerif from "@/fonts/InstrumentSerif";

export default function Welcome() {
    return (
        <section className={welcomeStyle.welcome} id="about">
            <div className={welcomeStyle.welcomeContent}>
                <div className={welcomeStyle.welcomeMsg}>
                    <h2 className={welcomeStyle.title}>
                        <span className={InstrumentSerif.className}>
                            Welcome message
                        </span>
                        <hr />
                    </h2>
                    <div className={welcomeStyle.execSm}>
                        <Executives />
                    </div>
                    <div className={welcomeStyle.message}>
                        <p>
                            On behalf of the University of Lagos Engineering
                            Society (ULES) Executive Committee, it is with great
                            pleasure and enthusiasm that we extend a warm
                            welcome to you on our official website.
                        </p>
                        <p>
                            As an organization dedicated to fostering
                            innovation, collaboration, and excellence within the
                            engineering community, ULES has always strived to be
                            a beacon of inspiration for aspiring engineers. Our
                            website serves as a digital gateway to the dynamic
                            world of ULES, providing you with insights into our
                            initiatives, events, and the incredible achievements
                            of our talented members.
                        </p>
                    </div>
                </div>
                <div className={welcomeStyle.execLg}>
                    <Executives />
                </div>
            </div>
        </section>
    );
}

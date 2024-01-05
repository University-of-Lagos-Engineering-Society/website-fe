import Image from "next/image";
import InstrumentSerif from "../../fonts/InstrumentSerif";
import executiveStyle from "./styles/executives.module.css";

export default function Executives() {
    return (
        <figure className={executiveStyle.executives}>
            <Image
                className={executiveStyle.execImg}
                src="/home/executives.png"
                alt="U.L.E.S current executives (2023/2024)."
                width={576}
                height={520}
                quality={100}
            />
            <figcaption className={executiveStyle.caption}>
                <div className={executiveStyle.captionContent}>
                    <h3 className={InstrumentSerif.className}>
                        ULES EXECUTIVES
                    </h3>
                    <h4>2022/2023 - Academic Session</h4>
                </div>
            </figcaption>
        </figure>
    );
}

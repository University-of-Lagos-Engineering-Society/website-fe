import Image from "next/image";
import Link from "next/link";
import InstrumentSerif from "../../fonts/InstrumentSerif";
import heroStyle from "./styles/hero.module.css";

export default function Hero() {
    return (
        <div className={heroStyle.hero}>
            <div className={heroStyle.heroCnt}>
                <div className={heroStyle.bgOverlay}></div>
                <h2 className={heroStyle.heroTitle}>
                    <span className={InstrumentSerif.className}>
                        Engineering
                    </span>
                    <span>THE FUTURE</span>
                    <span className={InstrumentSerif.className}>together</span>
                </h2>
                <Link href="#about" className={heroStyle.scrollDown}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="34"
                        viewBox="0 0 10 34"
                        fill="none"
                    >
                        <path
                            d="M4.96002 34.0001L9.11694 26.8001L0.803099 26.8001L4.96002 34.0001ZM5.68002 27.5201L5.68002 0.880104L4.24002 0.880104L4.24002 27.5201L5.68002 27.5201Z"
                            fill="white"
                        />
                    </svg>
                    <span>
                        <Image
                            src="/icons/scroll.svg"
                            alt=""
                            width={86.54}
                            height={83.6}
                        />
                    </span>
                </Link>
            </div>
        </div>
    );
}

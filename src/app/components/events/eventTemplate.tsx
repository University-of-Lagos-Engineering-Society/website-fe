import Image from "next/image";
import Link from "next/link";
import eventsTemplateStyle from "./styles/eventsTemplate.module.css";
import InstrumentSerif from "@/fonts/InstrumentSerif";

interface eventTemplateProps {
    image: { logo: string; banner: string; logoAlt: string; bannerAlt: string };
    detail: { header: string; description: string; link: string };
}
export default function EventTemplate({
    image: { logo, banner, logoAlt, bannerAlt },
    detail: { header, description, link },
}: eventTemplateProps) {
    return (
        <div className={eventsTemplateStyle.eventTemplate}>
            <div className={eventsTemplateStyle.eventDetails}>
                <Image
                    className={eventsTemplateStyle.image}
                    src={logo}
                    alt={logoAlt}
                    width={214}
                    height={50}
                />
                <div className={eventsTemplateStyle.details}>
                    <h3 className={InstrumentSerif.className}>
                        {header}
                        <hr />
                    </h3>
                    <p>{description}</p>
                </div>
                <Link className={eventsTemplateStyle.link} href={link}>
                    <span>LEARN MORE</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="34"
                        height="34"
                        viewBox="0 0 34 34"
                        fill="none"
                    >
                        <path
                            d="M22.1708 21.3753V11.8293H12.6248M21.5078 12.4922L11.8293 22.1708"
                            stroke="#4E9F41"
                            strokeWidth="2.25"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                    </svg>
                </Link>
            </div>
            <div className={eventsTemplateStyle.eventBanner}>
                <Image src={banner} alt={bannerAlt} width={576} height={520} />
            </div>
        </div>
    );
}

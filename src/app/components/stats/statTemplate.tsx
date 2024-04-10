import Image from "next/image";
import statTemplateStyle from "./styles/statTemplate.module.css";
import InstrumentSerif from "@/fonts/InstrumentSerif";
interface statTemplateProp {
    iconPath: string;
    stat: string;
    desc: string;
}
export default function StatTemplate({
    iconPath,
    stat,
    desc,
}: statTemplateProp) {
    return (
        <div className={statTemplateStyle.statTemplate}>
            <Image src={iconPath} alt="" width={112} height={100} />
            <div className={statTemplateStyle.statDetail}>
                <h3 className={InstrumentSerif.className}>{stat}</h3>
                <p>{desc}</p>
            </div>
        </div>
    );
}

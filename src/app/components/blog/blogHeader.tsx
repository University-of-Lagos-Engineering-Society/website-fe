import InstrumentSerif from "@/fonts/InstrumentSerif";
import blogHeaderStyle from "./styles/blogHeader.module.css";

export default function BlogHeader() {
    return (
        <div className={blogHeaderStyle.blogHeader}>
            <div className={blogHeaderStyle.overlay}>
                <h2 className={blogHeaderStyle.title}>
                    <span className={InstrumentSerif.className}>ULES Blog</span>
                    <hr />
                </h2>
            </div>
        </div>
    );
}

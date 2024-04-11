import Image from "next/image";
import Link from "next/link";
import blogTemplateStyles from "./styles/blogTemplate.module.css";
import InstrumentSerif from "@/fonts/InstrumentSerif";

interface blogTemplateProps {
    banner: string;
    bannerAlt: string;
    tags: string[];
    length: string;
    title: string;
    body: string;
    link: string;
}
export default function BlogTemplate({
    banner,
    bannerAlt,
    tags,
    length,
    title,
    body,
    link,
}: blogTemplateProps) {
    return (
        <div className={blogTemplateStyles.blogTemplate}>
            <div className={blogTemplateStyles.blogBanner}>
                <Image src={banner} alt={bannerAlt} width={543} height={200} />
            </div>
            <div className={blogTemplateStyles.blogDetails}>
                <h4 className={blogTemplateStyles.tags}>
                    <div>
                        {tags.map((tag) => {
                            return (
                                <span
                                    className={blogTemplateStyles.tagItem}
                                    key={tag}
                                >
                                    {tag}
                                </span>
                            );
                        })}
                    </div>
                    <span className={blogTemplateStyles.tagLength}>{length}</span>
                </h4>
                <h3 className={InstrumentSerif.className}>{title}</h3>
                <p>{body}</p>
                <Link className={blogTemplateStyles.blogLink} href={link}>
                    <span>READ ARTICLE</span>
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
                            stroke-width="2.25"
                            stroke-miterlimit="10"
                            stroke-linecap="square"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

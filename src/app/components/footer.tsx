import Image from "next/image";
import Link from "next/link";
import footerStyle from "./styles/footer.module.css";

export default function Footer() {
    return (
        <footer className={footerStyle.footer}>
            <div className={footerStyle.footerContainer}>
                <Image
                    src="/ules-logo--no-bg.png"
                    width={76.23}
                    height={76.02}
                    alt="University of Lagos Engineering Soceity"
                    className={footerStyle.logoImg}
                />
                <ul className={footerStyle.navLinks}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="#about">About</Link>
                    </li>
                    <li>
                        <Link href="#">Gallery</Link>
                    </li>
                    <li>
                        <Link href="#">ULES Blog</Link>
                    </li>
                    <li>
                        <Link href="#">Contact</Link>
                    </li>
                    <li>
                        <Link href="#events">Events</Link>
                    </li>
                </ul>
                <ul className={footerStyle.socials}>
                    <li>
                        <a href="#" rel="noreferrer noopener">
                            <Image
                                src="/icons/twitter.png"
                                alt=""
                                width={24}
                                height={24}
                            />
                        </a>
                    </li>
                    <li>
                        <a href="#" rel="noreferrer noopener">
                            <Image
                                src="/icons/linkedIn.png"
                                alt=""
                                width={24}
                                height={24}
                            />
                        </a>
                    </li>
                    <li>
                        <Image
                            src="/icons/instagram.png"
                            alt=""
                            width={24}
                            height={24}
                        />
                        <a href="#" rel="noreferrer noopener"></a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

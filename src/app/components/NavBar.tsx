import Image from "next/image";
import Link from "next/link";
import navBarStyle from "./styles/navbar.module.css";

export default function NavBar() {
    return (
        <nav className={navBarStyle.navbar}>
            <Link href="/" className={navBarStyle.logo}>
                <Image
                    src="/ules-logo--no-bg.png"
                    width={54.45}
                    height={54.3}
                    alt="University of Lagos Engineering Soceity"
                />
                <span>
                    UNIVERSITY OF LAGOS
                    <br /> ENGINEERING SOCIETY
                </span>
            </Link>
            <div className={navBarStyle.navItems}>
                <span></span>
                <ul className={navBarStyle.navList}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="#about">About</Link>
                    </li>
                    <li>
                        <Link href="/blog">ULES Blog</Link>
                    </li>
                    <li>
                        <Link href="#contact">Contact</Link>
                    </li>
                    <li>
                        <Link href="#events" rel="noopener noreferrer">
                            Events
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

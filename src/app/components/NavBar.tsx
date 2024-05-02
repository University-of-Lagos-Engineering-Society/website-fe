"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import navBarStyle from "./styles/navbar.module.css";

export default function NavBar() {
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (window.innerWidth > 768) {
            setShowMenu(true);
        }

        const handleResize = () => {
            if (window.innerWidth > 768) {
                setShowMenu(true);
            }
        };

        // Add event listener to listen for window resize events
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className={navBarStyle.navbar}>
            <Link href="/" className={navBarStyle.logo}>
                <Image
                    src="/ules-logo--no-bg.png"
                    width={54.45}
                    height={54.3}
                    className={navBarStyle.logoImg}
                    alt="University of Lagos Engineering Soceity"
                />
                <span>
                    UNIVERSITY OF LAGOS
                    <br /> ENGINEERING SOCIETY
                </span>
            </Link>
            <div className={navBarStyle.navItems}>
                <button
                    className={navBarStyle.menuBtn}
                    onClick={() => {
                        setShowMenu(!showMenu);
                    }}
                >
                    {showMenu ? (
                        <Image
                            src="/icons/close.svg"
                            width={24}
                            height={24}
                            className={navBarStyle.menu}
                            alt="close menu"
                        />
                    ) : (
                        <Image
                            src="/icons/menu.svg"
                            width={24}
                            height={24}
                            className={navBarStyle.menu}
                            alt="open menu"
                        />
                    )}
                </button>
                <ul
                    className={`${navBarStyle.navList} ${
                        showMenu ? navBarStyle.showList : navBarStyle.hideList
                    }`}
                >
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
                        <Link href="#">Gallery</Link>
                    </li>
                    <li>
                        <Link href="#events" rel="noopener noreferrer">
                            Event
                        </Link>
                    </li>
                    <li>
                        <Link href="#">Committee</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

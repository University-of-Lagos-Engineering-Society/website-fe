import NavBar from "./NavBar";
import headerStyle from "./styles/header.module.css";

export default function Header({ children }: { children: React.ReactNode }) {
    return (
        <header>
            <NavBar />
            <div className={headerStyle.heroContainer}>{children}</div>
        </header>
    );
}

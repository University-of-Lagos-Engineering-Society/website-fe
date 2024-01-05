import styles from "./page.module.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import Stats from "./components/stats";
import Events from "./components/events";
import Blog from "./components/blog";
import Newsletter from "./components/newsletter";
import Footer from "./components/footer";

export default function Home() {
    return (
        <>
            <Header>
                <Hero />
            </Header>
            <main>
                <Welcome />
                <Stats />
                <Events />
                <Blog />
            </main>
            <aside>
                <Newsletter />
            </aside>
            <Footer />
        </>
    );
}

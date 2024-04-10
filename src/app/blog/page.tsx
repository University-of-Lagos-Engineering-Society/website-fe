import Header from "../components/Header";
import BlogHeader from "../components/blog/blogHeader";
import Footer from "../components/footer";
import Newsletter from "../components/newsletter";
import blogStyle from "./page.module.css";

export default function Blog() {
    return (
        <>
            <Header>
                <div className={blogStyle.headerContainer}>
                    <BlogHeader />
                </div>
            </Header>
            <main className={blogStyle.blogMain}></main>
            <aside>
                <Newsletter />
            </aside>
            <Footer />
        </>
    );
}

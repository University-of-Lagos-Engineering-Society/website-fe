"use client";
import { useState } from "react";
import blogObject from "./blog.json";
import BlogHeader from "./blogHeader";
import BlogTemplate from "./blogTemplate";
import blogStyles from "./styles/blog.module.css";

export default function Blog() {
    const [blogs] = useState(blogObject);

    return (
        <section className={blogStyles.blog}>
            <div className={blogStyles.blogContainer}>
                <BlogHeader />
                <div className={blogStyles.blogList}>
                    <h3 className={blogStyles.blogHead}>RECENT ARTICLES</h3>
                    <div className={blogStyles.recentBlogs}>
                        {blogs.map((blog) => {
                            return <BlogTemplate key={blog.id} {...blog} />;
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

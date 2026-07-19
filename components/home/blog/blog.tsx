import Link from "next/link"
import { LucideArrowRight } from "lucide-react"
import BlogCard from "@/components/ui/blogCard"

const Blog = () => {
    const POSTS = [
        {
            details: {
                release: "Release #05",
                title: "5 Tips for Surviving Your First Year in Engineering",
                author: "Chiamaka Okonkwo",
                date: "Apr 15, 2026",
                description: "Starting your engineering journey can be overwhelming. Here are some practical tips to help you thrive academically and socially.",
                readMoreHref: "#",
            },
            imageUrl: "/home/blog1.png",
            imageAlt: "Blog 1"
        },
        {
            details: {
                release: "Release #05",
                title: "5 Tips for Surviving Your First Year in Engineering",
                author: "Chiamaka Okonkwo",
                date: "Apr 15, 2026",
                description: "Starting your engineering journey can be overwhelming. Here are some practical tips to help you thrive academically and socially.",
                readMoreHref: "#",
            },
            imageUrl: "/home/blog1.png",
            imageAlt: "Blog 2"
        },
        {
            details: {
                release: "Release #05",
                title: "5 Tips for Surviving Your First Year in Engineering",
                author: "Chiamaka Okonkwo",
                date: "Apr 15, 2026",
                description: "Starting your engineering journey can be overwhelming. Here are some practical tips to help you thrive academically and socially.",
                readMoreHref: "#",
            },
            imageUrl: "/home/blog1.png",
            imageAlt: "Blog 3"
        }
    ]
  return (
    <div className='px-4 xs:px-6 sm:px-10 md:px-16 lg:px-[111px] py-8 sm:py-10 lg:py-[64px] bg-[#F9FAFB]'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between font-sans'>
            <h1 className="font-medium text-2xl sm:text-[26px] lg:text-[30px] leading-tight lg:leading-[36px] text-[#1A2B56]">From The Blog</h1>
            <Link href={"#"} className="flex gap-1 items-center text-[#1A2B56] text-sm sm:text-[16px] leading-[24px] tracking-0">View All <span><LucideArrowRight/></span></Link>
        </div>
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
                <BlogCard
                    key={post.details.title + post.imageUrl + post.imageAlt}
                    details={post.details}
                    imageUrl={post.imageUrl}
                    imageAlt={post.imageAlt}
                />
            ))}
        </div>
    </div>
  )
}

export default Blog

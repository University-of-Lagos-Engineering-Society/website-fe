import Link from "next/link"
import { LucideArrowRight } from "lucide-react"
import NewsCard from "@/components/ui/newsCard"

const News = () => {
    const NEWS = [
        {
            details: {
                title: "ULESite Wins National Engineering Competition",
                description: "Our team of engineering students brought home the first prize in the Nigerian Universities Engineering Challenge 2026.",
                date: "April 10, 2026",
                readMoreHref: "#",
            },
            imageUrl: "/home/news1.png",
            imageAlt: "News 1"
        },
        {
            details: {
                title: "ULESite Wins National Engineering Competition",
                description: "Our team of engineering students brought home the first prize in the Nigerian Universities Engineering Challenge 2026.",
                date: "April 10, 2026",
                readMoreHref: "#",
            },
            imageUrl: "/home/news1.png",
            imageAlt: "News 2"
        },
        
    ]
  return (
    <div className='px-4 xs:px-6 sm:px-10 md:px-16 lg:px-[111px] py-8 sm:py-10 lg:py-[64px] bg-[#F9FAFB]'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between font-sans'>
            <h1 className="font-medium text-2xl sm:text-[26px] lg:text-[30px] leading-tight lg:leading-[36px] text-[#1A2B56]">Latest News</h1>
            <Link href={"#"} className="flex gap-1 items-center text-[#1A2B56] text-sm sm:text-[16px] leading-[24px] tracking-0">View More <span><LucideArrowRight/></span></Link>
        </div>
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {NEWS.map((item) => (
                <NewsCard
                    key={item.details.title + item.imageUrl + item.imageAlt}
                    details={item.details}
                    imageUrl={item.imageUrl}
                    imageAlt={item.imageAlt}
                />
            ))}
        </div>
    </div>
  )
}

export default News

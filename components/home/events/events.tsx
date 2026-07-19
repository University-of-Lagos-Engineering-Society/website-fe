import Link from "next/link"
import { LucideArrowRight } from "lucide-react"
import EventCard from "@/components/ui/eventCard"

const Events = () => {
    const EVENTS = [
        {
            details: {
                title: "ULES Faculty Week 2026",
                description: "Annual celebration of engineering excellence featuring competitions, exhibitions, and guest lectures from industry professionals.",
                date: "May 15, 2026",
                category: "Annual Event",
                learnMoreHref: "#",
            },
            imageUrl: "/home/event1.png",
            imageAlt: "Event 1"
        },
        {
            details: {
                title: "ULES Sport Festival 2026",
                description: "Join us for an insightful session on the application of Artificial Intelligence in modern engineering practices.",
                date: "May 1, 2026",
                category: "Annual Event",
                learnMoreHref: "#",
            },
            imageUrl: "/home/event2.png",
            imageAlt: "Event 2"
        },
        {
            details: {
                title: "ULES Dinner 2026",
                description: "Welcome ceremony for new engineering students joining the ULES family.",
                date: "April 28, 2026",
                category: "Annual Event",
                learnMoreHref: "#",
            },
            imageUrl: "/home/event3.png",
            imageAlt: "Event 3"
        }
    ]
  return (
    <div className='px-4 xs:px-6 sm:px-10 md:px-16 lg:px-[111px] py-8 sm:py-10 lg:py-[64px] bg-[#F9FAFB]'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between font-sans'>
            <h1 className="font-medium text-2xl sm:text-[26px] lg:text-[30px] leading-tight lg:leading-[36px] text-[#1A2B56]">Upcoming Events</h1>
            <Link href={"#"} className="flex gap-1 items-center text-[#1A2B56] text-sm sm:text-[16px] leading-[24px] tracking-0">View All <span><LucideArrowRight/></span></Link>
        </div>
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((event) => (
                <EventCard
                    key={event.details.title + event.imageUrl}
                    details={event.details}
                    imageUrl={event.imageUrl}
                    imageAlt={event.imageAlt}
                />
            ))}
        </div>
    </div>
  )
}

export default Events
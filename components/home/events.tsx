import Link from 'next/link';
import { LucideArrowRight } from 'lucide-react';
import EventCard from '@/components/ui/eventCard';
import { Button } from '@/components/ui/button';
import { HIGHLIGHTED_EVENT_ITEMS } from '../constants';

const Events = () => {
  return (
    <section className="bg-gray-50 px-4 py-8 md:py-10 lg:px-[4.5%] lg:py-16 xl:px-[7.778%]">
      <div className="flex items-center justify-between gap-3 font-sans">
        <h1 className="text-2xl leading-tight font-medium text-[#1A2B56] sm:text-[26px] lg:text-3xl/9">
          <span className="xs:inline hidden">Upcoming </span>
          Events
        </h1>
        <Link href="/activities/events">
          <Button
            variant={'ghost'}
            className="tracking-0 flex h-auto items-center gap-1 py-0 text-sm/6 text-[#1A2B56] sm:text-base"
          >
            View
            <span className="xs:inline hidden"> All </span>
            <span>
              <LucideArrowRight className="size-5" />
            </span>
          </Button>
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {HIGHLIGHTED_EVENT_ITEMS.slice(0, 3).map((event) => (
          <EventCard
            key={event.id}
            details={event.details}
            imageUrl={event.imageUrl}
            imageAlt={event.imageAlt}
          />
        ))}
      </div>
    </section>
  );
};

export default Events;

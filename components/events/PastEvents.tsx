import EventCard from '@/components/ui/eventCard';
import { isEventPast } from '@/lib/utils';
import { HIGHLIGHTED_EVENT_ITEMS } from '../constants';

const PastEvents = () => {
  return (
    <section className="bg-gray-50 px-4 py-8 md:py-10 lg:px-[4.5%] lg:py-16 xl:px-[7.778%]">
      <h1 className="text-center font-sans text-2xl leading-tight font-medium text-[#1A2B56] sm:text-[26px] lg:text-3xl/9">
        Past Events
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {HIGHLIGHTED_EVENT_ITEMS.filter((event) => isEventPast(event.timestamp)).map((event) => (
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

export default PastEvents;

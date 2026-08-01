import { PageBanner } from '@/components/section/PageBanner';
import PastEvents from '@/components/events/PastEvents';
import UpcomingEvents from '@/components/events/UpcomingEvents';

export default function Events() {
  return (
    <>
      <PageBanner title="Events" tagline="See all programs and activities of the University of Lagos Engineering Society" />
      <UpcomingEvents />
      <PastEvents />
    </>
  );
}

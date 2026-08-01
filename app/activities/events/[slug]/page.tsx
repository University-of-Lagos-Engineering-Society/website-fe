import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { HIGHLIGHTED_EVENT_ITEMS } from '@/components/constants';
import { Button } from '@/components/ui/button';

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = HIGHLIGHTED_EVENT_ITEMS.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  const { details, imageUrl, imageAlt, time, venue, status } = event;
  const { title, description, date, category } = details;
  const aboutParagraphs = description
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const gallery = Array.from({ length: 6 }, () => imageUrl);
  const galleryLayout = [
    { colSpan: 'md:col-span-1', height: 'md:h-[360px]' },
    { colSpan: 'md:col-span-2', height: 'md:h-[360px]' },
    { colSpan: 'md:col-span-1', height: 'md:h-[360px]' },
    { colSpan: 'md:col-span-1', height: 'md:h-[300px]' },
    { colSpan: 'md:col-span-1', height: 'md:h-[300px]' },
    { colSpan: 'md:col-span-2', height: 'md:h-[300px]' },
  ];

  return (
    <>
      <div className="border-b border-slate-200 bg-white px-4 py-4 lg:px-[4.5%] xl:px-[7.778%]">
        <Link
          href="/activities/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1A2B56] transition-colors hover:text-emerald-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back
        </Link>
      </div>

      <div className="bg-white px-4 py-8 md:py-10 lg:px-[4.5%] lg:py-12 xl:px-[7.778%]">
        <span className="inline-block rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white">
          {status === 'past' ? 'Past Event' : 'Upcoming Event'}
        </span>
        <p className="mt-3 text-sm font-medium text-emerald-600">{category}</p>
        <h1 className="mt-1 text-3xl font-semibold text-[#1A2B56] sm:text-4xl lg:text-5xl">{title}</h1>

        <div className="mt-8 grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Calendar className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-slate-500">Date</p>
              <p className="font-medium text-[#1A2B56]">{date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-slate-500">Time</p>
              <p className="font-medium text-[#1A2B56]">{time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-slate-500">Venue</p>
              <p className="font-medium text-[#1A2B56]">{venue}</p>
            </div>
          </div>
        </div>

        <div className="relative mt-8 aspect-16/5 w-full overflow-hidden rounded-2xl">
          <Image src={imageUrl} alt={imageAlt} fill sizes="100vw" className="object-cover max-h-[384px]" />
          <a href="/activities/gallery" className="absolute right-4 bottom-4">
            <Button variant="secondary">View Full Gallery</Button>
          </a>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-[#1A2B56] sm:text-3xl">About This Event</h2>
          <div className="mt-4 space-y-4 text-slate-600">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div id="gallery" className="mt-10 rounded-2xl bg-white pt-6">
          <h2 className="text-2xl font-semibold text-[#1A2B56] sm:text-3xl">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((src, index) => {
              const { colSpan, height } = galleryLayout[index] ?? galleryLayout[0];
              return (
                <div
                  key={index}
                  className={`aspect-square overflow-hidden md:aspect-auto ${colSpan} ${height}`}
                >
                  <img
                    src={src}
                    alt={`${title} gallery photo ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-center">
            <Link href="/activities/gallery">
              <Button variant="secondary" className="px-[65px]">View All</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

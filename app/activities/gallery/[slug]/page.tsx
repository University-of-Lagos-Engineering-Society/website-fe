import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { GALLERY_ALBUMS, HIGHLIGHTED_EVENT_ITEMS } from '@/components/constants';
import { PhotoGrid } from '@/components/gallery/PhotoGrid';
import { EmptyState } from '@/components/ui/empty-state';
import { isEventPast } from '@/lib/utils';

interface GalleryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const { slug } = await params;
  const album = GALLERY_ALBUMS.find((item) => item.slug === slug);

  if (!album) {
    notFound();
  }

  const { title, coverImage, coverAlt, photos, eventSlug } = album;

  // An album can exist before its event does. Word the empty state from the
  // event's timestamp so an upcoming event promises photos rather than
  // apologising for their absence.
  const event = eventSlug
    ? HIGHLIGHTED_EVENT_ITEMS.find((item) => item.slug === eventSlug)
    : undefined;
  const awaitingEvent = event ? !isEventPast(event.timestamp) : false;

  return (
    <>
      <div className="px-section py-6 md:py-8">
        <Link
          href="/activities/gallery"
          className="text-primary hover:text-accent inline-flex items-center gap-2 text-base/6 font-medium transition-colors"
        >
          <ArrowLeft className="size-5 shrink-0" aria-hidden="true" />
          Go back
        </Link>
      </div>

      <section className="px-section pb-8 md:pb-10 lg:pb-16">
        <h1 className="text-primary text-3xl/9 font-medium md:text-4xl/11 lg:text-5xl/12">
          {title}
        </h1>

        {/* 1216 × 384 in the frame. */}
        <div className="relative mt-8 aspect-19/6 w-full overflow-hidden rounded-lg">
          <Image
            src={coverImage}
            alt={coverAlt}
            fill
            sizes="(min-width: 1280px) 78vw, 100vw"
            priority
            className="object-cover"
          />
        </div>

        <h2 className="text-primary mt-12 mb-8 text-xl/7 font-medium md:text-2xl/8">All Photos</h2>

        {photos.length === 0 ? (
          <EmptyState
            title={awaitingEvent ? 'Photos coming after the event' : 'No photos uploaded yet'}
            description={
              awaitingEvent
                ? "This event hasn't happened yet. We'll upload the photos here once it wraps up."
                : "We haven't uploaded photos for this one yet. Check back shortly — they're on the way."
            }
          />
        ) : (
          <PhotoGrid photos={photos} />
        )}
      </section>
    </>
  );
}

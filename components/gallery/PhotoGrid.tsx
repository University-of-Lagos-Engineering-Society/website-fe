'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

/**
 * The "All Photos" grid on an album page.
 *
 * Four columns, with every third tile spanning two of them — the frame lays out
 * 1·2·1 then 1·1·2, which repeats every six photos. Applying the pattern
 * cyclically means an album of any length keeps the rhythm instead of only
 * looking right at exactly six.
 *
 * Client-side because "View All" expands the grid in place. It's a static array,
 * so there's nothing to fetch and no loading state — the button only appears
 * when there is actually something still hidden.
 */

type Photo = {
  src: string;
  alt: string;
};

type PhotoGridProps = {
  photos: Photo[];
};

/** Column spans for one six-tile cycle, read off the frame. */
const SPAN_CYCLE = [
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
];

const INITIAL_COUNT = 6;

export function PhotoGrid({ photos }: PhotoGridProps) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? photos : photos.slice(0, INITIAL_COUNT);
  const hiddenCount = photos.length - visible.length;

  return (
    <>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {visible.map((photo, index) => (
          <li
            key={index}
            className={`relative aspect-square overflow-hidden rounded-lg md:aspect-auto md:h-70 ${
              SPAN_CYCLE[index % SPAN_CYCLE.length]
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 50vw, 50vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setExpanded(true)}
            className="text-primary h-14 w-48.25 rounded-lg bg-gray-200 text-base/6 font-medium hover:bg-gray-300"
          >
            View All
            <span className="sr-only"> {hiddenCount} remaining photos</span>
          </Button>
        </div>
      )}
    </>
  );
}

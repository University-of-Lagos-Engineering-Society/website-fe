import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

import { Card } from '@/components/ui/card';

/**
 * A single row in the news index.
 *
 * Distinct from `components/ui/newsCard.tsx`, which is the vertical,
 * image-on-top card the home page uses. This is the horizontal list row from
 * the News frame: image left, copy right, 240px tall.
 *
 * The horizontal split only exists from `md` up. Below that it stacks, because
 * at 390px the designed 29.232% image column is barely 100px wide. That flip
 * mirrors the mission/vision cards and the hero's `md:` alignment change — the
 * same breakpoint the designed screens use for a two-up split.
 */

type NewsListCardProps = {
  slug: string;
  details: {
    title: string;
    description: string;
    date: string;
  };
  imageUrl: string;
  imageAlt: string;
};

export function NewsListCard({ slug, details, imageUrl, imageAlt }: NewsListCardProps) {
  const { title, description, date } = details;

  return (
    <Link href={`/stories/news/${slug}`} className="block">
      <Card className="hover:border-accent hover-lift flex flex-col gap-0 overflow-hidden rounded-lg border border-gray-200 bg-white p-0 shadow-none ring-0 md:h-60 md:flex-row">
        {/* 355.458 / 1216 of the designed row width. */}
        <div className="relative aspect-3/2 w-full shrink-0 md:aspect-auto md:h-full md:w-[29.232%]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 30vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1 p-6 md:p-8">
          <p className="text-accent flex items-center gap-x-2 text-sm/5">
            <Calendar className="size-4 shrink-0" aria-hidden="true" />
            <span>{date}</span>
          </p>

          <h3 className="text-primary mt-3 line-clamp-2 text-2xl/9 font-medium md:text-3xl/9">
            {title}
          </h3>

          <p className="mt-4 line-clamp-3 text-base/7 text-gray-700 md:line-clamp-2 lg:text-lg/7">
            {description}
          </p>
        </div>
      </Card>
    </Link>
  );
}

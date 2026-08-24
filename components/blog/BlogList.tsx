'use client';

import { useState } from 'react';

import { BlogCard } from '@/components/blog/BlogCard';
import { EmptyState } from '@/components/ui/empty-state';
import { BLOG_CATEGORIES, BLOG_ITEMS, type BlogCategory } from '@/components/constants';
import { cn } from '@/lib/utils';

/**
 * Blog index: category pills over a three-up grid.
 *
 * Client-side because the pills own selection state. Filtering happens in
 * memory over a static array — there's no request behind it, so there's no
 * loading state to show and no reason to put the choice in the URL yet. If
 * these ever need to be shareable or crawlable, promote `active` to a
 * searchParam and this goes back to being a server component.
 */

const ALL = 'All' as const;

type Filter = typeof ALL | BlogCategory;

const FILTERS: Filter[] = [ALL, ...BLOG_CATEGORIES];

export function BlogList() {
  const [active, setActive] = useState<Filter>(ALL);

  const posts = active === ALL ? BLOG_ITEMS : BLOG_ITEMS.filter((p) => p.category === active);

  return (
    <section className="px-section py-8 md:py-10 lg:py-16">
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {FILTERS.map((filter) => {
          const selected = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter)}
              className={cn(
                'focus-visible:ring-ring/50 h-10 cursor-pointer rounded-full px-6 text-base/6 font-medium transition-colors outline-none focus-visible:ring-3',
                selected
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {posts.length === 0 ? (
        <EmptyState
          title={active === ALL ? 'No posts yet' : `Nothing in ${active} yet`}
          description={
            active === ALL
              ? "There's nothing published right now. Check back soon, or follow us on our social channels for updates in the meantime."
              : 'No posts have been filed under this category yet. Try another one, or pick All to see everything.'
          }
        />
      ) : (
        // Explicit column counts rather than the usual auto-fit grid: auto-fit
        // collapses unused tracks, so a category with one or two posts would
        // stretch those cards across the full row instead of leaving the
        // remaining columns empty. Matches the frame's fixed three-up.
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <BlogCard
                slug={post.slug}
                details={post.details}
                imageUrl={post.imageUrl}
                imageAlt={post.imageAlt}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

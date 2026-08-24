import { NewsListCard } from '@/components/news/NewsListCard';
import { EmptyState } from '@/components/ui/empty-state';
import { NEWS_ITEMS } from '@/components/constants';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';

export function NewsList() {
  return (
    <section className="px-section py-8 md:py-10 lg:py-16">
      {NEWS_ITEMS.length === 0 ? (
        <EmptyState
          title="No news yet"
          description="There's nothing published right now. Check back soon, or follow us on our social channels for updates in the meantime."
        />
      ) : (
        // Rows are full-width and stack vertically, so there's no column count
        // to manage — a flex column is the whole layout. 32px gap from the frame.
        <Stagger className="flex flex-col gap-8">
          {NEWS_ITEMS.map((item) => (
            <StaggerItem key={item.id}>
              <NewsListCard
                slug={item.slug}
                details={item.details}
                imageUrl={item.imageUrl}
                imageAlt={item.imageAlt}
              />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </section>
  );
}

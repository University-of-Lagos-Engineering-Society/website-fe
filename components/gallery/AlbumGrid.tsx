import { AlbumCard } from '@/components/gallery/AlbumCard';
import { EmptyState } from '@/components/ui/empty-state';
import { GALLERY_ALBUMS } from '@/components/constants';

export function AlbumGrid() {
  return (
    <section className="px-section py-8 md:py-10 lg:py-16">
      {GALLERY_ALBUMS.length === 0 ? (
        <EmptyState
          title="No albums yet"
          description="We haven't published any photo sets yet. Check back after the next event, or follow us on our social channels in the meantime."
        />
      ) : (
        // Explicit columns rather than the usual auto-fit grid: auto-fit
        // collapses unused tracks, which would stretch a single album across
        // the full row. Matches the frame's fixed three-up.
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ALBUMS.map((album) => (
            <li key={album.id}>
              <AlbumCard
                slug={album.slug}
                title={album.title}
                coverImage={album.coverImage}
                coverAlt={album.coverAlt}
                photoCount={album.photos.length}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

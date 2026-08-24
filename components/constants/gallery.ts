/**
 * Photo albums, rendered by `/activities/gallery` and its detail route.
 *
 * Same shape as the other content constants: numeric `id`, `slug` for the
 * detail route, and images at the top level.
 *
 * PLACEHOLDER CONTENT. There is no `public/gallery/` directory and no real
 * photo sets exist yet, so each album reuses its own event artwork for every
 * entry in `photos`. That mirrors what the Figma frame does (eight identical
 * "Engineering Week 2026" tiles) and keeps the layout reviewable — but it is
 * obviously not shippable. Real albums need a photo directory and per-photo
 * `src`/`alt`.
 */

type GalleryPhoto = {
  src: string;
  alt: string;
};

type GalleryAlbum = {
  id: number;
  slug: string;
  /**
   * The event this album documents, if any, matched against
   * `HIGHLIGHTED_EVENT_ITEMS[].slug`. Stated explicitly rather than inferred
   * from `slug` matching: the two happen to line up today, but an album that
   * isn't tied to an event (a general faculty set, say) has to be expressible,
   * and a renamed slug shouldn't silently sever the link.
   *
   * The event detail page uses this to decide whether its gallery button is
   * live, and the album page uses the event's timestamp to word its empty
   * state.
   */
  eventSlug: string | null;
  title: string;
  coverImage: string;
  coverAlt: string;
  /** Empty is a valid state — the event may not have happened yet. */
  photos: GalleryPhoto[];
};

/** Eight copies of one image, standing in for a real album. */
function placeholderPhotos(src: string, title: string): GalleryPhoto[] {
  return Array.from({ length: 8 }, (_, index) => ({
    src,
    alt: `${title} — photo ${index + 1}`,
  }));
}

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 1,
    slug: 'dinner-awards-2026',
    eventSlug: 'dinner-awards-2026',
    title: 'ULES Dinner & Awards 2026',
    coverImage: '/events/dinner-awards-2026.png',
    coverAlt: 'ULES Dinner & Awards 2026',
    // Deliberately empty: the event hasn't happened yet, so the album exists as
    // a placeholder and the page says photos are coming.
    photos: [],
  },
  {
    id: 2,
    slug: 'usf-2026',
    eventSlug: 'usf-2026',
    title: 'ULES Sports Festival 2026',
    coverImage: '/events/usf-2026.png',
    coverAlt: 'ULES Sports Festival 2026',
    photos: placeholderPhotos('/events/usf-2026.png', 'ULES Sports Festival 2026'),
  },
  {
    id: 3,
    slug: 'quadtopia-2025',
    eventSlug: 'quadtopia-2025',
    title: 'QUADTOPIA 2025',
    coverImage: '/events/quadtopia-2025.png',
    coverAlt: 'QUADTOPIA 2025',
    photos: placeholderPhotos('/events/quadtopia-2025.png', 'QUADTOPIA 2025'),
  },
  {
    id: 4,
    slug: 'fresher-orientation-2025',
    eventSlug: 'fresher-orientation-2025',
    title: "ULES Fresher's Orientation 2025",
    coverImage: '/events/fresher-orientation-2025.png',
    coverAlt: "ULES Fresher's Orientation 2025",
    photos: placeholderPhotos(
      '/events/fresher-orientation-2025.png',
      "ULES Fresher's Orientation 2025",
    ),
  },
];

/**
 * The album documenting a given event, or null when none has been created.
 * A returned album may still have no photos — callers that need "there is
 * something to look at" should check `photos.length`, not just this.
 */
export function findAlbumForEvent(eventSlug: string): GalleryAlbum | null {
  return GALLERY_ALBUMS.find((album) => album.eventSlug === eventSlug) ?? null;
}

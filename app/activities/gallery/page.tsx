import { PageBanner } from '@/components/section/PageBanner';
import { AlbumGrid } from '@/components/gallery/AlbumGrid';

export default function Gallery() {
  return (
    <>
      <PageBanner
        title="Gallery"
        tagline="See all programs and activities of the University of Lagos Engineering Society"
      />
      <AlbumGrid />
    </>
  );
}

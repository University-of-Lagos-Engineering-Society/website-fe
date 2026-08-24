import { PageBanner } from '@/components/section/PageBanner';
import { AlbumGrid } from '@/components/gallery/AlbumGrid';
import { pageMetadata } from '@/lib/seo';
import { Reveal } from '@/components/motion/Reveal';

export const metadata = pageMetadata({
  title: 'Gallery',
  description:
    "Photos from ULES programmes and activities across the Faculty of Engineering, University of Lagos.",
  path: '/activities/gallery',
  keywords: ['ULES gallery', 'ULES photos', 'UNILAG engineering photos'],
});

export default function Gallery() {
  return (
    <>
      <PageBanner
        title="Gallery"
        tagline="See all programs and activities of the University of Lagos Engineering Society"
      />
      <Reveal>
        <AlbumGrid />
      </Reveal>
    </>
  );
}

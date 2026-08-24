import { PageBanner } from '@/components/section/PageBanner';
import { NewsList } from '@/components/news/NewsList';

export default function News() {
  return (
    <>
      <PageBanner
        title="News & Announcements"
        tagline="Stay informed about the latest ULES updates and achievements"
      />
      <NewsList />
    </>
  );
}

import { PageBanner } from '@/components/section/PageBanner';
import { BlogList } from '@/components/blog/BlogList';

export default function Blog() {
  return (
    <>
      <PageBanner title="ULES Blog" tagline="Insights, tips, and stories from the ULES community" />
      <BlogList />
    </>
  );
}

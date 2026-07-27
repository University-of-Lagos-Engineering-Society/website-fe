import { PageBanner } from '@/components/section/PageBanner';
import { WhoWeAre } from '@/components/about-us/WhoWeAre';

export default function AboutULES() {
  return (
    <>
      <PageBanner title="About ULES" tagline="Learn more about ULES, our mission and values." />
      <WhoWeAre />
    </>
  );
}

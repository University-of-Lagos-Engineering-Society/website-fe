import { PageBanner } from '@/components/section/PageBanner';
import { WhoWeAre } from '@/components/about-us/WhoWeAre';
import { OurMissionAndVision } from '@/components/about-us/MissionAndVision';
import { OurCoreValues } from '@/components/about-us/CoreValues';
import { FAQs } from '@/components/about-us/faqs';
import { Questions } from '@/components/about-us/Questions';

export default function AboutULES() {
  return (
    <>
      <PageBanner title="About ULES" tagline="Learn more about ULES, our mission and values." />
      <WhoWeAre />
      <OurMissionAndVision />
      <OurCoreValues />
      <FAQs />
      <Questions />
    </>
  );
}

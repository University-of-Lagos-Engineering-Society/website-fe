import { PageBanner } from '@/components/section/PageBanner';
import { WhoWeAre } from '@/components/about-us/WhoWeAre';
import { OurMissionAndVision } from '@/components/about-us/MissionAndVision';
import { OurCoreValues } from '@/components/about-us/CoreValues';

export default function AboutULES() {
  return (
    <>
      <PageBanner title="About ULES" tagline="Learn more about ULES, our mission and values." />
      <WhoWeAre />
      <OurMissionAndVision />
      <OurCoreValues />
    </>
  );
}

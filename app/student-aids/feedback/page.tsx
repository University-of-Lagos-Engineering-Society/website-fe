import { PageBanner } from '@/components/section/PageBanner';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';

export default function Feedback() {
  return (
    <>
      <PageBanner
        title="Share Feedback"
        tagline="Tell us how we can serve the faculty better"
      />
      <FeedbackForm />
    </>
  );
}

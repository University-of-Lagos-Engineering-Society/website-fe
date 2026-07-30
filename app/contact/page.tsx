import { PageBanner } from '@/components/section/PageBanner';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';

export default function ContactUs() {
  return (
    <>
      <PageBanner title="Contact Us" tagline="Get in touch with the ULES team" />
      <ContactForm />
      <ContactInfo />
    </>
  );
}

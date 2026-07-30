import Link from 'next/link';
import { MessageIcon, LocationIcon } from '../icons';
import { SOCIALS } from '../constants';

export function ContactInfo() {
  return (
    <section className="xs:px-[4.1%] [&_h3]:text-primary px-4 pt-0 pb-27.5 lg:px-[5.7855%] xl:px-[10%] [&_h3]:text-lg/7 [&_h3]:font-medium">
      <h2 className="text-primary mb-6 text-left text-3xl/9 font-medium">Contact Information</h2>
      <div className="[&>div]:not-last:[&>span]:bg-accent [&>div]:not-last:[&>span>svg>path]:stroke-primary grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6 pb-5.5 [&>div]:not-last:flex [&>div]:not-last:[&>div]:max-w-9/12 [&>div]:not-last:gap-x-[4.3478%] [&>div]:not-last:[&>span]:flex [&>div]:not-last:[&>span]:size-11 [&>div]:not-last:[&>span]:items-center [&>div]:not-last:[&>span]:justify-center [&>div]:not-last:[&>span]:rounded-full lg:[&>div]:not-last:[&>span]:size-12 [&>div]:not-last:[&>span>svg]:size-5 lg:[&>div]:not-last:[&>span>svg]:size-6">
        <div>
          <span>
            <MessageIcon />
          </span>
          <div>
            <h3>Email</h3>
            <p className="text-primary text-sm/5">unilagengr@gmail.com</p>
          </div>
        </div>
        <div>
          <span className="size-12">
            <LocationIcon />
          </span>
          <div>
            <h3>Address</h3>
            <p className="xs:w-[80%] w-full text-base/6 text-gray-700 sm:w-full sm:max-w-45 2xl:w-[65%] 2xl:max-w-full">
              Faculty of Engineering University of Lagos Akoka, Yaba Lagos, Nigeria
            </p>
          </div>
        </div>
        <div>
          <h3>Follow Us</h3>
          <nav aria-label="Social media" className="my-4">
            <ul
              className="social-list xs:gap-x-3 flex gap-x-[2%] overflow-hidden 2xl:gap-x-[3.0769%]"
              role="list"
            >
              {SOCIALS.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${name} page (opens in a new tab)`}
                    title={name}
                    className="bg-primary hover:bg-primary/80 flex size-11 items-center justify-center rounded-full transition-all duration-300 ease-in-out lg:size-12"
                  >
                    <Icon className="size-5 lg:size-6" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="mt-7.5">
        <h3 className="mt-5.75 mb-2.75">Sponsorship & Partnerships</h3>
        <p className="text-base/6 font-normal text-gray-700">
          Interested in taking part in ULES initiatives as a Sponsor or Partner? We'd love to hear
          from you.
          <br />
          <br />
          Reach out to us via:
          <br />
          <Link href="mailto:unilagengr@gmail.com" className="text-primary underline">
            unilagengr@gmail.com
          </Link>
        </p>
      </div>
    </section>
  );
}

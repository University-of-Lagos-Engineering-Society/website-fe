import Link from 'next/link';
import Image from 'next/image';
import { SOCIALS, QUICK_LINKS, RESOURCES, ACTIVITIES } from '../constants';
import { LocationIcon, MessageIcon } from '../icons';
import { NewsletterForm } from '../section/newsletter';

export function Footer() {
  return (
    <footer className="bg-primary">
      <div className="xs:px-[4.1%] flex w-full max-w-360 flex-col gap-y-8 px-4 pt-16 pb-27.25 lg:px-[4.5%] lg:pb-29.5 xl:px-[7.778%] 2xl:mx-auto 2xl:max-w-[84.44%] 2xl:px-0">
        <div className="">
          <h2 className="mb-8 space-y-6 text-[24px]/[32px] font-medium text-gray-50 sm:mb-6.5 sm:text-[30px]/[38px]">
            Stay Connected With Us
          </h2>
          <div className="flex flex-col gap-y-8 lg:flex-row lg:justify-between lg:gap-x-[5.26%] [&_h3]:text-lg/[28px] [&_h3]:font-medium [&_h3]:text-white">
            <div className="shrink lg:basis-[541.6px] 2xl:basis-[44.5385%]">
              <h3>Subscribe to our Newsletter</h3>
              <p className="text-normal my-4 text-sm/5 text-[hsl(218,14%,84%)]">
                Get the latest updates, events, and opportunities delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>
            <div className="shrink-2 lg:basis-103.25 2xl:basis-[33.964%]">
              <h3>Contact Us</h3>
              <nav aria-label="Social media" className="my-4">
                <ul
                  className="social-list xs:gap-x-3 flex gap-x-[3.0769%] overflow-hidden"
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
                        className="inline-block size-10"
                      >
                        <Icon className="w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="mb-3 flex gap-x-2">
                <span className="mt-1">
                  <LocationIcon />
                </span>
                <span className="text-sm/5 text-[hsl(218,14%,84%)] lg:w-10/12">
                  ULES Secretariat, Faculty of Engineering, University of Lagos, Akoka, Lagos
                </span>
              </p>
              <p className="flex gap-x-2">
                <span className="mt-1">
                  <MessageIcon />
                </span>
                <span className="text-sm/5 text-[hsl(218,14%,84%)]">unilagengr@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
        <div className="[&>div>h3]:text-accent flex flex-wrap justify-between gap-x-[5.26%] gap-y-7 border-t border-white/10 pt-8 text-sm/5 text-[hsl(218,14%,84%)] md:flex-nowrap [&>div]:flex [&>div]:min-w-0 [&>div]:shrink [&>div]:basis-[41.06%] [&>div]:flex-col [&>div]:gap-y-4 md:[&>div]:basis-[254.8px] 2xl:[&>div]:basis-[20.955%] [&>div_ul]:flex [&>div_ul]:flex-col [&>div_ul]:gap-y-2 [&>div:first-child]:shrink-0 [&>div>h3]:text-lg/[27px] [&>div>h3]:font-medium">
          <div className="">
            <Link href="/" className="my-[2.5px] flex items-center gap-2">
              <Image
                src="/ules-footer-logo.png"
                alt="ULES Logo"
                width={276}
                height={60}
                priority
                className="mr-[-8.32%] hidden h-auto w-[108.32%] max-w-none sm:block"
              />
              <Image
                src="/ules-footer-logo-mb.png"
                alt="ULES Logo"
                width={168}
                height={40}
                priority
                className="mr-[-14.29%] block h-auto w-[114.29%] max-w-none sm:hidden"
              />
            </Link>
            <p className="mr-[-14.29%] w-[114.29%] max-w-none sm:mr-0 sm:w-full">
              Engineering Society - Representing engineering students across all departments since
              1964.
            </p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <nav>
              <ul>
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href ?? '#'}>{link.trigger}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div>
            <h3>Resources</h3>
            <nav>
              <ul>
                {RESOURCES.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href ?? '#'}>{link.trigger}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div>
            <h3>Activities</h3>
            <nav>
              <ul>
                {ACTIVITIES.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href ?? '#'}>{link.trigger}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="w-full text-center text-sm font-normal">
          <p className="text-copyright text-left md:text-center">
            &copy; {new Date().getFullYear()} University of Lagos Engineering Society. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

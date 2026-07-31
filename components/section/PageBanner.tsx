import Image from 'next/image';
import type { PageBannerProps } from '../types';

export function PageBanner({ id, title, tagline }: PageBannerProps) {
  return (
    <section id={id} className="relative px-[9.8264%] py-16 text-center">
      <Image
        src="/page-banner.png"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        className="-z-10 hidden object-cover object-center md:block"
      />
      <Image
        src="/page-banner-mb.png"
        alt=""
        fill
        priority
        className="-z-10 object-cover object-center md:hidden"
      />
      <h1 className="mb-6 space-y-9 text-4xl/11 font-medium tracking-[-0.02em] text-gray-50 lg:space-y-12 lg:text-5xl/15">
        {title}
      </h1>
      <p className="text-xl/7 font-normal text-gray-200">{tagline}</p>
    </section>
  );
}

import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="xs:px-6 relative top-0 left-0 m-0 flex min-h-[calc(100vh-66px)] w-full flex-col justify-end px-4 pb-8 sm:px-10 sm:pb-10 md:px-16 lg:px-[100px] lg:pb-[63px] xl:px-[139px]">
      <Image
        src="/hero.png"
        fill
        sizes="100vw"
        alt="Image of all executives"
        priority
        className="object-cover"
      />
      <div className="relative w-full max-w-[1162px] font-sans text-[#F9FAFB]">
        <h1 className="xs:text-4xl max-w-full text-center text-[30px] leading-tight font-medium tracking-[-0.02em] sm:max-w-[500px] sm:text-5xl sm:leading-snug md:max-w-[620px] md:text-start md:text-[52px] lg:max-w-[755px] lg:text-[60px] lg:leading-[72px]">
          The University of Lagos Engineering Society
        </h1>
        <p className="mt-3 max-w-full text-center text-[14px] leading-relaxed font-normal tracking-normal text-[#E5E7EB] sm:mt-4 sm:max-w-[500px] sm:text-base md:max-w-[620px] md:text-start lg:mt-0 lg:max-w-[768px] lg:text-[18px] lg:leading-[28px]">
          The University of Lagos Engineering Society (ULES) is the premier student-led organization
          representing the diverse and vibrant community of the Faculty of Engineering. More than
          just a faculty body, ULES serves as the bridge between rigorous academic theory and the
          fast-paced world of professional excellence.
        </p>
        <div className="mt-6 mb-6 flex flex-col items-center gap-2 sm:mt-8 sm:mb-8 sm:gap-3 md:flex-row md:items-start lg:mt-[43px] lg:mb-[23.8px]">
          <Button className={'max-w-[195px] px-6 py-3 sm:px-10 lg:px-[60px] lg:py-4'}>
            Join ULES
          </Button>
          <Button
            variant={'outline'}
            className={'max-w-[195px] bg-transparent px-6 py-3 sm:px-10 lg:px-[60px] lg:py-4'}
          >
            Discover
          </Button>
        </div>
        <div className="align-center relative z-10 grid w-full grid-cols-2 justify-center gap-3 rounded-lg border border-white/25 bg-transparent px-3 py-4 shadow-lg backdrop-blur-[2px] sm:grid-cols-4 sm:gap-4 sm:px-5 sm:py-[22px] lg:gap-5">
          <div className="align-center flex flex-col justify-center text-center text-[#F9FAFB]">
            <span className="font-sans text-3xl leading-tight font-normal tracking-normal sm:text-4xl md:text-5xl lg:text-[60px] lg:leading-[60px]">
              10
            </span>
            <span className="font-sans text-[11px] leading-[20px] font-medium tracking-[0.7px] sm:text-xs lg:text-[14px]">
              DEPARTMENTS
            </span>
          </div>
          <div className="align-center flex flex-col justify-center text-center text-[#F9FAFB]">
            <span className="font-sans text-3xl leading-tight font-normal tracking-normal sm:text-4xl md:text-5xl lg:text-[60px] lg:leading-[60px]">
              6,000+
            </span>
            <span className="font-sans text-[11px] leading-[20px] font-medium tracking-[0.7px] sm:text-xs lg:text-[14px]">
              MEMBERS
            </span>
          </div>
          <div className="align-center flex flex-col justify-center text-center text-[#F9FAFB]">
            <span className="font-sans text-3xl leading-tight font-normal tracking-normal sm:text-4xl md:text-5xl lg:text-[60px] lg:leading-[60px]">
              62
            </span>
            <span className="font-sans text-[11px] leading-[20px] font-medium tracking-[0.7px] sm:text-xs lg:text-[14px]">
              YEARS OF EXCELLENCE
            </span>
          </div>
          <div className="align-center flex flex-col justify-center text-center text-[#F9FAFB]">
            <span className="font-sans text-3xl leading-tight font-normal tracking-normal sm:text-4xl md:text-5xl lg:text-[60px] lg:leading-[60px]">
              5
            </span>
            <span className="font-sans text-[11px] leading-[20px] font-medium tracking-[0.7px] sm:text-xs lg:text-[14px]">
              SUB BODIES
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='relative top-0 left-0 m-0 w-full flex flex-col justify-end min-h-[calc(100vh-66px)] px-4 xs:px-6 sm:px-10 md:px-16 lg:px-[100px] xl:px-[139px] pb-8 sm:pb-10 lg:pb-[63px]'>
        <Image
            src={'/hero/hero.png'}
            fill
            sizes='100vw'
            alt='Image of all executives'
            loading='eager'
            className='object-cover'
        />
        <div className='relative text-[#F9FAFB] font-sans max-w-[1162px] w-full'>
            <h1 className='text-[30px] xs:text-4xl sm:text-5xl md:text-[52px] lg:text-[60px] max-w-full sm:max-w-[500px] md:max-w-[620px] lg:max-w-[755px] leading-tight sm:leading-snug lg:leading-[72px] tracking-[-0.02em] font-medium text-center md:text-start'>The University of Lagos Engineering Society</h1>
            <p className='mt-3 sm:mt-4 lg:mt-0 max-w-full sm:max-w-[500px] md:max-w-[620px] lg:max-w-[768px] text-[14px] sm:text-base lg:text-[18px] text-[#E5E7EB] font-normal tracking-normal leading-relaxed lg:leading-[28px] text-center md:text-start'>The University of Lagos Engineering Society (ULES) is the premier student-led organization representing the diverse and vibrant community of the Faculty of Engineering. More than just a faculty body, ULES serves as the bridge between rigorous academic theory and the fast-paced world of professional excellence.</p>
            <div className='mt-6 mb-6 sm:mt-8 sm:mb-8 lg:mt-[43px] lg:mb-[23.8px] flex flex-col md:flex-row gap-2 sm:gap-3 items-center md:items-start'>
                <Button className={'max-w-[195px] px-6 py-3 sm:px-10 lg:px-[60px] lg:py-4'}>Join ULES</Button>
                <Button variant={'outline'} className={'max-w-[195px] px-6 py-3 sm:px-10 lg:px-[60px] lg:py-4 bg-transparent'}>Discover</Button>
            </div>
            <div className='relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 justify-center align-center w-full rounded-lg border border-white/25 bg-transparent px-3 py-4 sm:px-5 sm:py-[22px] shadow-lg backdrop-blur-[2px]'>
                <div className='flex flex-col justify-center align-center text-center text-[#F9FAFB]'>
                    <span className='text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-sans font-normal leading-tight lg:leading-[60px] tracking-normal'>10</span>
                    <span className='font-sans font-medium text-[11px] sm:text-xs lg:text-[14px] tracking-[0.7px] leading-[20px]'>DEPARTMENTS</span>
                </div>
                <div className='flex flex-col justify-center align-center text-center text-[#F9FAFB]'>
                    <span className='text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-sans font-normal leading-tight lg:leading-[60px] tracking-normal'>6,000+</span>
                    <span className='font-sans font-medium text-[11px] sm:text-xs lg:text-[14px] tracking-[0.7px] leading-[20px]'>MEMBERS</span>
                </div>
                <div className='flex flex-col justify-center align-center text-center text-[#F9FAFB]'>
                    <span className='text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-sans font-normal leading-tight lg:leading-[60px] tracking-normal'>62</span>
                    <span className='font-sans font-medium text-[11px] sm:text-xs lg:text-[14px] tracking-[0.7px] leading-[20px]'>YEARS OF EXCELLENCE</span>
                </div>
                <div className='flex flex-col justify-center align-center text-center text-[#F9FAFB]'>
                    <span className='text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-sans font-normal leading-tight lg:leading-[60px] tracking-normal'>5</span>
                    <span className='font-sans font-medium text-[11px] sm:text-xs lg:text-[14px] tracking-[0.7px] leading-[20px]'>SUB BODIES</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero
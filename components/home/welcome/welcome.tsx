import Image from 'next/image'

const Welcome = () => {
  return (
    <section
      className='w-full py-[96px] px-[16px] md:px-[85px]'
      style={{
        background:
          'radial-gradient(50% 50% at 50% 50%, #1A2B56 0%, #1E293B 100%)',
      }}
    >
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
        <div className='text-white font-sans'>
          <h2 className='inline-block w-fit text-[18px] md:text-[36px] leading-[44px] tracking-[-2%] font-medium text-center'>
            Welcome Message
          </h2>
          <div className='mt-6 text-sm leading-5 tracking-[0%] font-medium lg:text-[18px] lg:leading-[29.25px] lg:font-semibold'>
            Welcome to the official digital home of the University of Lagos
            Engineering Society (ULES).
            <span className='block font-medium lg:font-normal'>
              On behalf of the Executive Council, it is my distinct honor to
              welcome you to the official platform of the University of Lagos
              Engineering Society (ULES). As students of this prestigious
              Faculty, we are bound by a Constitution that envisions a
              community rooted in unity, integrity, and leadership. Our
              mission is to ensure that your time here is defined by more than
              just academic rigor. We are here to provide the educational and
              cultural resources necessary to help you transition from a
              student into a world-class professional.
            </span>
            <span className='block font-medium lg:font-normal mt-4'>
              The 2025/2026 session is dedicated to upholding our fundamental
              objectives: advocating for your academic rights, fostering
              cordial relationships with university administration, and
              creating high-impact opportunities for mentorship and hands-on
              development.
            </span>
            <span className='block font-medium lg:font-normal mt-4'>
              We are a society that believes in innovation and brotherhood.
              Whether you are a fresh student navigating your first year
              student or a finalist preparing for the industry, ULES is your
              primary representative body, committed to your welfare and your
              progress.
            </span>
            <span className='block font-medium lg:font-normal mt-4'>
              Let us work together to contribute our quota to the development
              of our fatherland and humanity at large. Explore our resources,
              engage with our programs, and let us continue to build a
              healthy and progressive faculty.
            </span>
            <span className='block font-medium lg:font-normal mt-4'>Greatest ULESsites!</span>
            <span className='block font-medium lg:font-normal'>Warm regards,</span>
          </div>
          <p className='mt-6 text-sm leading-5 tracking-[0%] font-medium italic lg:text-[18px] lg:leading-[29.25px] lg:font-normal'>
            Olawale Ayoola,
            <br />
            President, University of Lagos Engineering Society (ULES),
            2025/2026 Academic Session
          </p>
        </div>

        <div className='flex justify-center lg:justify-end'>
          <div className='relative w-full max-w-[358px] lg:max-w-[533.71px] aspect-[533.71/667.09] -rotate-[0.99deg] border-[15px] border-white shadow-xl'>
            <Image
              src='/home/president.jpg'
              alt='Olawale Ayoola, President of ULES'
              fill
              sizes='(min-width: 1024px) 534px, 80vw'
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Welcome

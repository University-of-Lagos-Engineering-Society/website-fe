import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='p-0 m-0'>
        <Image
            src={'/hero/hero.png'}
            width={1440}
            height={880}
            alt='Image of all executives'
        />
    </div>
  )
}

export default Hero
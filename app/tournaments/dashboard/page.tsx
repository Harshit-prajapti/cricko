'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const images = [
  { name: 'cricket', image: '/cricket-ground.jpg' },
  { name: 'football', image: '/football.jpg' },
  { name: 'basketball', image: '/basketball.jpg' },
  { name: 'kabbdi', image: '/kabbdi.jpg' },
]

const Carousel = () => {
  const [index, setIndex] = useState(0)

  return (
    <div className="w-full flex flex-col items-center mt-20 md:mt-0 md:py-2 px-4">
      <h1 className="text-green-800 text-3xl md:text-5xl font-bold mb-12 text-center">
        CREATE TOURNAMENT
      </h1>

      {/* Carousel wrapper */}
      <div className="relative w-full max-w-4xl h-[300px] md:h-[400px] overflow-hidden">
        {/* Image container */}
        <div className="relative w-full h-full">
          {images.map((img, i) => {
            const offset = i - index
            const translateX = offset * 50 // adjust for spacing
            const isCenter = offset === 0
            const isVisible = Math.abs(offset) <= 1

            return (
              <div
                key={i}
                className="absolute top-0 left-1/2 transition-all duration-500 ease-in-out cursor-pointer"
                onClick={() => setIndex(i)}
                style={{
                  transform: `translateX(${translateX}%) translateX(-50%) scale(${isCenter ? 1 : 0.9})`,
                  zIndex: isCenter ? 20 : 10,
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: isVisible ? 'auto' : 'none',
                  width: '70%',
                  height: '100%',
                }}
              >
                <div className="relative w-full h-full border-2 border-gray-700 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={img.image}
                    alt={img.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 70vw, (max-width: 1200px) 70vw, 40vw"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Link href={`/tournaments/dashboard/create?sport=${images[index].name}`}>
      <Button className='mt-5 cursor-pointer hover:bg-amber-700'>{images[index].name.toUpperCase()}</Button>
      </Link>
      
    </div>  
  )
}

export default Carousel

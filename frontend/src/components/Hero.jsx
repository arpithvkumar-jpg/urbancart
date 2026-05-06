import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { assets, products } from '../assets/assets'

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const sliderImages = [
    assets.hero_img,
    products[0].image[0],
    products[1].image[0],
    products[2].image[0]
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [sliderImages.length])

  return (
    <section className='mb-10 overflow-hidden rounded-[2rem] bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-600 px-6 py-10 text-white shadow-2xl sm:px-10 sm:py-14'>
      <div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
        <div className='max-w-2xl space-y-6'>
          <span className='inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-100'>Mega sale</span>
          <h1 className='text-4xl font-semibold leading-tight sm:text-5xl'>Discover top fashion, electronics and home essentials in one place.</h1>
          <p className='max-w-xl text-sm text-slate-100/90 sm:text-base'>Find great deals every day with fast delivery, trusted brands, and curated collections made for all your needs.</p>
          <div className='flex flex-wrap gap-3'>
            <Link to='/collection' className='rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-slate-900/10 transition hover:bg-slate-100'>Shop now</Link>
            <Link to='/collection' className='rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm text-slate-100 transition hover:bg-white/20'>Explore collection</Link>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-xl'>
          <div className='rounded-[2rem] bg-white/10 p-5 backdrop-blur-sm'>
            <p className='text-sm uppercase tracking-[0.2em] text-slate-100/80'>Featured product</p>
            <p className='mt-4 text-lg font-semibold'>New arrivals every week</p>
            <p className='mt-3 text-sm leading-6 text-slate-100/90'>Handpicked styles from trusted brands with fast delivery across India.</p>
          </div>
          <div className='overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 shadow-2xl relative'>
            <div 
              className='flex h-full w-full transition-transform duration-700 ease-in-out'
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {sliderImages.map((img, index) => (
                <img 
                  key={index}
                  className='h-full w-full object-cover flex-shrink-0' 
                  src={img} 
                  alt={`Hero Slider ${index}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

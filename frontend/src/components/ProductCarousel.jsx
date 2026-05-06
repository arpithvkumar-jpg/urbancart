import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const ProductCarousel = () => {
  const { products, currency } = useContext(ShopContext)
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoSliding, setIsAutoSliding] = useState(true)

  // Get featured products (first 6 or all if less)
  const featuredProducts = products.slice(0, 6)

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoSliding || featuredProducts.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoSliding, featuredProducts.length])

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    )
    setIsAutoSliding(false)
    setTimeout(() => setIsAutoSliding(true), 8000)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
    setIsAutoSliding(false)
    setTimeout(() => setIsAutoSliding(true), 8000)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoSliding(false)
    setTimeout(() => setIsAutoSliding(true), 8000)
  }

  if (featuredProducts.length === 0) {
    return null
  }

  const currentProduct = featuredProducts[currentIndex]

  return (
    <section className='mb-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 shadow-2xl'>
      <div className='relative h-96 w-full md:h-[500px]'>
        {/* Carousel Container */}
        <div className='relative h-full w-full overflow-hidden bg-slate-950'>
          {featuredProducts.map((product, index) => (
            <div
              key={product._id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div className='absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent'>
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className='h-full w-full object-cover'
                />
              </div>

              {/* Content Overlay */}
              <div className='relative flex h-full flex-col items-start justify-center px-6 py-8 sm:px-10 sm:py-12'>
                <span className='inline-flex items-center gap-2 rounded-full bg-blue-600/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm'>
                  Featured
                </span>

                <h2 className='mt-6 max-w-lg text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl'>
                  {product.name}
                </h2>

                <p className='mt-4 max-w-md text-sm leading-relaxed text-slate-200 sm:text-base'>
                  Exclusive collection of premium quality fashion items with latest trends and styles.
                </p>

                <div className='mt-6 flex items-center gap-4'>
                  <p className='text-3xl font-bold text-white sm:text-4xl'>
                    {currency}{product.price}
                  </p>
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className='rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 hover:shadow-lg'
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className='absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-white/30 sm:p-3'
          aria-label='Previous slide'
        >
          <svg className='h-5 w-5 sm:h-6 sm:w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className='absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-white/30 sm:p-3'
          aria-label='Next slide'
        >
          <svg className='h-5 w-5 sm:h-6 sm:w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </button>

        {/* Indicators/Dots */}
        <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:gap-3'>
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all ${
                index === currentIndex
                  ? 'h-3 w-8 bg-blue-600 shadow-lg shadow-blue-600/50'
                  : 'h-3 w-3 bg-white/40 hover:bg-white/60'
              } sm:h-3 sm:w-3 ${index === currentIndex ? 'sm:w-8' : 'sm:w-3'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className='absolute right-4 top-4 z-20 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm'>
          {currentIndex + 1} / {featuredProducts.length}
        </div>
      </div>
    </section>
  )
}

export default ProductCarousel

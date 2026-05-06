import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      
      {/* Header Section */}
      <div className='relative overflow-hidden bg-white pt-16 pb-12 border-b border-slate-100'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 z-0'></div>
        <div className='relative z-10 text-center max-w-2xl mx-auto px-4'>
            <Title text1={'ABOUT'} text2={'US'} />
            <p className='text-slate-500 mt-4 text-sm md:text-base'>
              Discover the story behind UrbanCart, our core values, and what drives us to deliver the best shopping experience.
            </p>
        </div>
      </div>

      {/* Main Content: About Story */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24'>
        <div className='flex flex-col lg:flex-row gap-16 items-center'>
            <div className='w-full lg:w-1/2'>
              <div className='relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 group'>
                <img className='w-full object-cover aspect-square sm:aspect-auto sm:h-[500px] group-hover:scale-105 transition-transform duration-700' src={assets.about_img} alt="About Us" />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
              </div>
            </div>
            <div className='w-full lg:w-1/2 flex flex-col justify-center gap-8'>
                <div>
                  <h2 className='text-3xl font-bold text-slate-800 mb-4'>Our Journey</h2>
                  <p className='text-slate-600 leading-relaxed'>
                    UrbanCart was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
                  </p>
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-slate-800 mb-4'>Our Promise</h2>
                  <p className='text-slate-600 leading-relaxed mb-4'>
                    Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
                  </p>
                </div>
                <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <b className='text-lg text-slate-800'>Our Mission</b>
                  </div>
                  <p className='text-slate-600 leading-relaxed text-sm'>
                    Our mission at UrbanCart is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
                  </p>
                </div>
            </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='bg-white py-20 border-y border-slate-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <Title text1={'WHY'} text2={'CHOOSE US'} />
            <p className='text-slate-500 mt-4 max-w-2xl mx-auto text-sm md:text-base'>
              We stand by our commitment to deliver excellence in every aspect of your shopping journey.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {/* Card 1 */}
              <div className='bg-slate-50 rounded-2xl p-8 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group'>
                <div className='w-14 h-14 bg-white shadow-sm text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-slate-800 mb-3'>Quality Assurance</h3>
                <p className='text-slate-600 leading-relaxed text-sm'>
                  We meticulously select and vet each product to ensure it meets our stringent quality standards.
                </p>
              </div>

              {/* Card 2 */}
              <div className='bg-slate-50 rounded-2xl p-8 hover:bg-green-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group'>
                <div className='w-14 h-14 bg-white shadow-sm text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-slate-800 mb-3'>Convenience</h3>
                <p className='text-slate-600 leading-relaxed text-sm'>
                  With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
                </p>
              </div>

              {/* Card 3 */}
              <div className='bg-slate-50 rounded-2xl p-8 hover:bg-purple-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group'>
                <div className='w-14 h-14 bg-white shadow-sm text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-slate-800 mb-3'>Exceptional Service</h3>
                <p className='text-slate-600 leading-relaxed text-sm'>
                  Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
                </p>
              </div>
          </div>
        </div>
      </div>

      <div className='bg-slate-50 pt-16'>
        <NewsletterBox/>
      </div>
      
    </div>
  )
}

export default About

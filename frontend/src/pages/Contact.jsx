import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      
      {/* Header Section */}
      <div className='relative overflow-hidden bg-white pt-16 pb-12 border-b border-slate-100'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 z-0'></div>
        <div className='relative z-10 text-center max-w-2xl mx-auto px-4'>
            <Title text1={'CONTACT'} text2={'US'} />
            <p className='text-slate-500 mt-4 text-sm md:text-base'>
              We're here to help! Whether you have a question about an order, our products, or just want to say hello, we'd love to hear from you.
            </p>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          
          {/* Left Column: Image & Store Info */}
          <div className='flex flex-col gap-8'>
            <div className='relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10'>
              <img className='w-full object-cover h-[400px] hover:scale-105 transition-transform duration-700' src={assets.contact_img} alt="Contact Us" />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
              <div className='absolute bottom-6 left-6 right-6 text-white'>
                <h3 className='text-2xl font-bold'>Headquarters</h3>
                <p className='opacity-90 text-sm mt-1'>Visit our primary retail location.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Details Cards */}
          <div className='flex flex-col gap-6'>
            
            {/* Address Card */}
            <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group'>
              <div className='w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-slate-800 mb-2'>Our Location</h3>
              <p className='text-slate-500 leading-relaxed'>
                Hoskote<br/>
                Bangalore Rural<br/>
                Karnataka State
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {/* Phone Card */}
              <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group'>
                <div className='w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.864-1.041l-3.286-.481c-.498-.073-.99.21-1.12.696l-.37 1.383c-1.65-1.034-3.15-2.534-4.184-4.185l1.383-.37c.485-.13.769-.622.696-1.12l-.481-3.286c-.075-.513-.525-.864-1.041-.864H4.5a2.25 2.25 0 00-2.25 2.25v.37z" />
                  </svg>
                </div>
                <h3 className='font-semibold text-slate-800 mb-1'>Call Us</h3>
                <p className='text-slate-500 text-sm'>+91 9663946028</p>
              </div>

              {/* Email Card */}
              <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group'>
                <div className='w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className='font-semibold text-slate-800 mb-1'>Email Us</h3>
                <p className='text-slate-500 text-sm'>arpithvkumar@gmail.com</p>
              </div>
            </div>

            {/* Careers Banner */}
            <div className='bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl text-white mt-2 relative overflow-hidden'>
              <div className='absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2'></div>
              <h3 className='text-xl font-semibold mb-2'>Careers at UrbanCart</h3>
              <p className='text-slate-300 text-sm mb-6'>Join our team and help us build the future of e-commerce.</p>
              <button className='bg-white text-slate-900 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors shadow-lg shadow-white/10'>
                Explore Open Roles
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className='bg-white border-t border-slate-100 pt-16'>
        <NewsletterBox/>
      </div>
    </div>
  )
}

export default Contact

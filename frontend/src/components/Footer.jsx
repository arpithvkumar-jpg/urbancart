import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-slate-950 text-slate-200'>
      <div className='mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8'>
        <div className='grid gap-10 lg:grid-cols-[2fr_1fr_1fr]'>
          <div>
            <div className='mb-5 flex items-center gap-1'>
              <span className='text-2xl font-black tracking-tight text-white'>Urban</span>
              <span className='text-2xl font-black tracking-tight text-blue-500'>Cart</span>
            </div>
            <p className='max-w-xl text-sm leading-7 text-slate-400'>
              Discover a modern shopping experience with curated products, fast delivery and secure checkout across fashion, electronics and home categories.
            </p>
          </div>

          <div>
            <p className='mb-5 text-lg font-semibold text-white'>Company</p>
            <ul className='space-y-3 text-sm text-slate-400'>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>

          <div>
            <p className='mb-5 text-lg font-semibold text-white'>Get in touch</p>
            <ul className='space-y-3 text-sm text-slate-400'>
              <li>+91 9876543210</li>
              <li>arpithvkumar@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className='mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500'>
          Copyright 2026 @ urbancart.com - All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

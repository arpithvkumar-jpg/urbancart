import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { search, setSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems, likedItems } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <header className='sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm'>
      <div className='mx-auto flex max-w-[1440px] flex-col px-4 py-3 sm:px-6 lg:px-8'>

        {/* Top Row: Logo & Desktop Links & Mobile Actions */}
        <div className='flex items-center justify-between'>

          <div className='flex items-center gap-8'>
            <Link to='/' className='flex items-center gap-1'>
              <span className='text-2xl font-black tracking-tight text-slate-900'>Urban</span>
              <span className='text-2xl font-black tracking-tight text-blue-600'>Cart</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className='hidden items-center gap-1 text-sm font-medium text-slate-600 sm:flex'>
              <NavLink to='/' className={({ isActive }) => `rounded-full px-4 py-2 transition hover:bg-slate-100 ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}>
                HOME
              </NavLink>
              <NavLink to='/collection' className={({ isActive }) => `rounded-full px-4 py-2 transition hover:bg-slate-100 ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}>
                COLLECTION
              </NavLink>
              <NavLink to='/about' className={({ isActive }) => `rounded-full px-4 py-2 transition hover:bg-slate-100 ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}>
                ABOUT
              </NavLink>
              <NavLink to='/contact' className={({ isActive }) => `rounded-full px-4 py-2 transition hover:bg-slate-100 ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}>
                CONTACT
              </NavLink>
            </div>
          </div>

          <div className='flex flex-1 items-center justify-end gap-3'>

            {/* Desktop Search Bar */}
            <div className='hidden max-w-sm flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 shadow-sm md:flex'>
              <img src={assets.search_icon} className='w-4 text-slate-400' alt='Search' />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => {
                  setShowSearch(true)
                  navigate('/collection')
                }}
                className='ml-3 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400'
                type='text'
                placeholder='Search products...'
              />
            </div>

            <div className='flex items-center gap-2 sm:gap-3'>
              {/* Desktop Profile Button */}
              <button onClick={() => token ? navigate('/profile') : navigate('/login')} className='hidden rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:inline-flex'>
                {token ? 'Profile' : 'Login'}
              </button>

              {/* Likes - Visible everywhere */}
              <Link to='/likes' className='relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-red-500'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className={`absolute -right-1 -bottom-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white ${likedItems?.length > 0 ? 'bg-red-500' : 'bg-slate-400'}`}>
                  {likedItems?.length > 0 ? likedItems.length : 0}
                </span>
              </Link>

              {/* Cart - Visible everywhere */}
              <Link to='/cart' className='relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-700 shadow-sm transition hover:bg-slate-100'>
                <img src={assets.cart_icon} className='w-5' alt='Cart' />
                <span className={`absolute -right-1 -bottom-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white ${getCartCount() > 0 ? 'bg-blue-600' : 'bg-slate-400'}`}>
                  {getCartCount() === 0 ? 0 : getCartCount()}
                </span>
              </Link>

            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Flipkart Style Full Width */}
        <div className='mt-3 flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm md:hidden'>
          <img src={assets.search_icon} className='w-4 text-slate-400' alt='Search' />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => {
              setShowSearch(true)
              navigate('/collection')
            }}
            className='ml-3 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500'
            type='text'
            placeholder='Search products, brands and more'
          />
        </div>

        {/* Desktop Trust Badges */}
        <div className='hidden items-center justify-between gap-3 rounded-full bg-slate-100 px-5 py-2.5 text-xs font-medium text-slate-600 sm:flex mt-4'>
          <span className='text-slate-800 font-semibold'>Shop with confidence</span>
          <span>Free delivery above ₹499</span>
          <span>Secure payment</span>
          <span>24/7 support</span>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 transform overflow-hidden bg-white shadow-2xl transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4 bg-slate-50'>
          <p className='font-bold text-slate-900'>Menu</p>
          <button onClick={() => setVisible(false)} className='text-slate-500 hover:text-slate-900'>
            Close
          </button>
        </div>
        <div className='flex flex-col gap-2 p-5 text-base font-medium text-slate-700'>
          <NavLink onClick={() => setVisible(false)} to='/' className='rounded-xl px-4 py-3 hover:bg-slate-100'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/collection' className='rounded-xl px-4 py-3 hover:bg-slate-100'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/about' className='rounded-xl px-4 py-3 hover:bg-slate-100'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/contact' className='rounded-xl px-4 py-3 hover:bg-slate-100'>Contact</NavLink>
          <button onClick={() => { setVisible(false); token ? navigate('/profile') : navigate('/login') }} className='mt-6 rounded-xl bg-slate-900 px-4 py-3.5 text-white hover:bg-slate-800 font-semibold'>
            {token ? 'Go to Profile' : 'Login to Account'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

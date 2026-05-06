import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const MobileBottomNav = () => {
  const { getCartCount, token } = useContext(ShopContext)
  const location = useLocation()

  // Hide the bottom nav on specific pages if needed, like login or checkout
  if (location.pathname === '/login' || location.pathname === '/place-order') {
    return null;
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white/95 pb-safe pt-2 backdrop-blur-xl md:hidden shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]'>
      
      {/* Home */}
      <NavLink 
        to='/' 
        className={({ isActive }) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className='text-[10px] font-medium'>Home</span>
      </NavLink>

      {/* Collection */}
      <NavLink 
        to='/collection' 
        className={({ isActive }) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className='text-[10px] font-medium'>Categories</span>
      </NavLink>

      {/* Cart */}
      <NavLink 
        to='/cart' 
        className={({ isActive }) => `relative flex flex-col items-center gap-1 p-2 ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
      >
        <div className='relative'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className={`absolute -right-2 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white ${getCartCount() > 0 ? 'bg-red-500' : 'bg-slate-400'}`}>
            {getCartCount() === 0 ? 0 : getCartCount()}
          </span>
        </div>
        <span className='text-[10px] font-medium'>Cart</span>
      </NavLink>

      {/* Profile */}
      <NavLink 
        to={token ? '/profile' : '/login'} 
        className={({ isActive }) => `flex flex-col items-center gap-1 p-2 ${(isActive && token) ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className='text-[10px] font-medium'>Account</span>
      </NavLink>

    </div>
  )
}

export default MobileBottomNav

import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-16 md:w-64 min-h-full border-r border-slate-200 bg-white shadow-sm flex flex-col'>
        <div className='flex flex-col py-6'>
            <p className='hidden md:block text-xs font-semibold uppercase tracking-wider text-slate-400 px-6 mb-4'>Menu</p>
            
            <NavLink 
                className={({isActive}) => `relative flex items-center gap-4 px-6 py-3.5 transition-colors duration-200 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`} 
                to="/add"
            >
                {({isActive}) => (
                    <>
                        {isActive && <div className='absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full'></div>}
                        <img className={`w-5 h-5 transition-all ${isActive ? 'opacity-100 brightness-0 invert-[30%] sepia-[90%] saturate-[2000%] hue-rotate-[200deg]' : 'opacity-60 grayscale'}`} src={assets.add_icon} alt="Add Items" />
                        <span className='hidden md:block font-medium'>Add Items</span>
                    </>
                )}
            </NavLink>

            <NavLink 
                className={({isActive}) => `relative flex items-center gap-4 px-6 py-3.5 transition-colors duration-200 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`} 
                to="/list"
            >
                {({isActive}) => (
                    <>
                        {isActive && <div className='absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full'></div>}
                        <img className={`w-5 h-5 transition-all ${isActive ? 'opacity-100 brightness-0 invert-[30%] sepia-[90%] saturate-[2000%] hue-rotate-[200deg]' : 'opacity-60 grayscale'}`} src={assets.order_icon} alt="List Items" />
                        <span className='hidden md:block font-medium'>List Items</span>
                    </>
                )}
            </NavLink>

            <NavLink 
                className={({isActive}) => `relative flex items-center gap-4 px-6 py-3.5 transition-colors duration-200 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`} 
                to="/orders"
            >
                {({isActive}) => (
                    <>
                        {isActive && <div className='absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full'></div>}
                        <img className={`w-5 h-5 transition-all ${isActive ? 'opacity-100 brightness-0 invert-[30%] sepia-[90%] saturate-[2000%] hue-rotate-[200deg]' : 'opacity-60 grayscale'}`} src={assets.order_icon} alt="Orders" />
                        <span className='hidden md:block font-medium'>Orders</span>
                        <span className='hidden md:inline-flex ml-auto items-center justify-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600'>Active</span>
                    </>
                )}
            </NavLink>

        </div>
    </div>
  )
}

export default Sidebar
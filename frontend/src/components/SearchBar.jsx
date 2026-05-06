import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location])

  return showSearch && visible ? (
    <div className='border-t border-b border-slate-200 bg-slate-50 py-4'>
      <div className='mx-auto flex max-w-2xl items-center rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm'>
        <img className='w-4 text-slate-400' src={assets.search_icon} alt='search' />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='ml-3 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400'
          type='text'
          placeholder='Search products, brands or categories'
        />
        <button onClick={() => setShowSearch(false)} className='ml-3 text-slate-500 transition hover:text-slate-900'>
          <img className='w-4' src={assets.cross_icon} alt='close' />
        </button>
      </div>
    </div>
  ) : null
}

export default SearchBar

import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency, likedItems, toggleLike } = useContext(ShopContext)

  const isLiked = likedItems.includes(id);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(id);
  }

  // Mock data for modern feel
  const mrp = Math.round(price * 1.4);
  const discount = Math.round(((mrp - price) / mrp) * 100);
  const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

  return (
    <Link onClick={() => scrollTo(0, 0)} className='group block relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100/50 hover:border-transparent' to={`/product/${id}`}>
      
      {/* Wishlist Icon */}
      <button onClick={handleLike} className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-colors hover:bg-white hover:text-red-500 ${isLiked ? 'text-red-500' : 'text-slate-400'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Image Container */}
      <div className='relative aspect-[4/5] w-full overflow-hidden bg-slate-50'>
        <img className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105' src={image[0]} alt={name} />
        {/* Discount Badge */}
        <div className='absolute bottom-3 left-3 rounded-md bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold tracking-wide text-slate-900 shadow-sm'>
          {discount}% OFF
        </div>
      </div>

      <div className='p-4'>
        {/* Brand & Rating row */}
        <div className='mb-1.5 flex items-center justify-between'>
          <p className='text-[11px] font-semibold uppercase tracking-widest text-slate-400'>URBANCART</p>
          <div className='flex items-center gap-1 text-[11px] font-medium text-slate-500'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating}
          </div>
        </div>
        
        {/* Title */}
        <h3 className='mb-2 text-sm font-medium leading-snug text-slate-800 line-clamp-1 transition-colors group-hover:text-sky-600'>{name}</h3>
        
        {/* Pricing */}
        <div className='flex items-baseline gap-2'>
          <span className='text-base font-bold text-slate-900'>{currency}{price}</span>
          <span className='text-xs text-slate-400 line-through'>{currency}{mrp}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Likes = () => {
  const { products, likedItems } = useContext(ShopContext)
  const [likedProducts, setLikedProducts] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(item => likedItems.includes(item._id));
      setLikedProducts(filtered);
    }
  }, [products, likedItems])

  return (
    <div className='border-t pt-14'>
      <div className='mb-10 text-2xl'>
        <Title text1={'MY'} text2={'LIKES'} />
      </div>

      {likedProducts.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-slate-500'>
          <svg xmlns="http://www.w3.org/2000/svg" className="mb-4 h-16 w-16 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className='text-lg font-medium text-slate-800'>You haven't liked any products yet.</p>
          <p className='mt-1 text-sm'>Explore our collection and add your favorites here!</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {likedProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Likes

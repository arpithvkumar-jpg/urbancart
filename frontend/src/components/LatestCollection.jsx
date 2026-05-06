import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  return (
    <section className='my-10'>
      <div className='rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='mb-8 flex flex-col gap-3 text-center sm:text-left'>
          <Title text1={'LATEST'} text2={'COLLECTIONS'} />
          <p className='mx-auto max-w-2xl text-sm text-slate-600 sm:mx-0 sm:text-base'>Fresh seasonal picks from top brands, curated for style and comfort.</p>
        </div>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestCollection

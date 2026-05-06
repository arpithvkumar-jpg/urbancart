import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller)
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <section className='my-10'>
      <div className='rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='mb-8 flex flex-col gap-3 text-center sm:text-left'>
          <Title text1={'BEST'} text2={'SELLERS'} />
          <p className='mx-auto max-w-2xl text-sm text-slate-600 sm:mx-0 sm:text-base'>Discover top-rated products with the most orders and the highest customer ratings.</p>
        </div>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {bestSeller.map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSeller

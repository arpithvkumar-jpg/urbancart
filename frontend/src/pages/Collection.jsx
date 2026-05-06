import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setCategory((prev) => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setSubCategory((prev) => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice()

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price))
        break
      default:
        applyFilter()
        break
    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <div className='flex flex-col gap-10 pt-10 border-t border-slate-200 pb-20 lg:flex-row'>
      <aside className='w-full shrink-0 lg:w-80'>
        <div className='rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <p className='text-lg font-semibold text-slate-900'>Filters</p>
              <p className='text-sm text-slate-500'>Refine the collection</p>
            </div>
            <button onClick={() => setShowFilter(!showFilter)} className='inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 sm:hidden'>
              {showFilter ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className={`${showFilter ? 'block' : 'hidden'} mt-6 sm:block`}>
            <div className='space-y-5'>
              <div>
                <p className='mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600'>Categories</p>
                <div className='space-y-3 text-sm text-slate-700'>
                  {['Men', 'Women', 'Kids'].map((item) => (
                    <label key={item} className='flex items-center gap-2'>
                      <input className='h-4 w-4 rounded border-slate-300 text-blue-600' type='checkbox' value={item} onChange={toggleCategory} />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className='mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600'>Type</p>
                <div className='space-y-3 text-sm text-slate-700'>
                  {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
                    <label key={item} className='flex items-center gap-2'>
                      <input className='h-4 w-4 rounded border-slate-300 text-blue-600' type='checkbox' value={item} onChange={toggleSubCategory} />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className='flex-1'>
        <div className='mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between'>
          <div>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            <p className='text-sm text-slate-500'>Browse the most popular products and latest arrivals.</p>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <select onChange={(e) => setSortType(e.target.value)} className='rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:outline-none'>
              <option value='relavent'>Sort by: Relevant</option>
              <option value='low-high'>Price: Low to High</option>
              <option value='high-low'>Price: High to Low</option>
            </select>
            <button onClick={() => { setCategory([]); setSubCategory([]) }} className='rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100'>Clear filters</button>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection

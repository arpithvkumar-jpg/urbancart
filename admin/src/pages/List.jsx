import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const filteredList = list.filter(item => {
    const searchString = searchTerm.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(searchString);
    
    const matchesSearch = searchString === '' || nameMatch;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-800'>Product Inventory</h1>
          <p className='text-sm text-slate-500 mt-1'>Manage all your products, pricing, and availability.</p>
        </div>

        {/* Search and Filters */}
        <div className='flex flex-col sm:flex-row gap-3'>
          <div className='relative'>
            <input 
              type="text" 
              placeholder='Search by Product Name...' 
              className='w-full sm:w-64 rounded-lg border border-slate-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors'
          >
            <option value="All">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm text-slate-600'>
            <thead className='bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200'>
              <tr>
                <th scope='col' className='px-6 py-4 font-semibold'>Image</th>
                <th scope='col' className='px-6 py-4 font-semibold'>Product Name</th>
                <th scope='col' className='px-6 py-4 font-semibold'>Category</th>
                <th scope='col' className='px-6 py-4 font-semibold'>Price</th>
                <th scope='col' className='px-6 py-4 font-semibold text-right'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {filteredList.map((item, index) => (
                <tr key={index} className='hover:bg-slate-50/50 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='h-12 w-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200'>
                      <img className='h-full w-full object-cover' src={item.image[0]} alt={item.name} />
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='font-medium text-slate-900'>{item.name}</p>
                    {item.bestseller && <span className='inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 mt-1 text-[10px] font-medium text-amber-600 ring-1 ring-inset ring-amber-500/20'>Bestseller</span>}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700'>{item.category}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap font-medium text-slate-900'>
                    {currency}{item.price}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right'>
                    <button 
                      onClick={()=>removeProduct(item._id)} 
                      className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100'
                      title='Delete Product'
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="5" className='px-6 py-12 text-center text-slate-500'>
                    {list.length === 0 ? (
                      <>
                        <p className='text-lg font-medium text-slate-900'>No products found</p>
                        <p className='text-sm text-slate-500 mt-1'>Add a product to see it here.</p>
                      </>
                    ) : (
                      <>
                        <p className='text-lg font-medium text-slate-900'>No results match your search</p>
                        <p className='text-sm text-slate-500 mt-1'>Try adjusting your filters or search term.</p>
                        <button 
                          onClick={() => {setSearchTerm(''); setCategoryFilter('All');}} 
                          className='mt-4 text-sm font-medium text-blue-600 hover:text-blue-700'
                        >
                          Clear all filters
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default List
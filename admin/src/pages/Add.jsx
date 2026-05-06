import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [discount, setDiscount] = useState("");
   const [category, setCategory] = useState("Men");
   const [subCategory, setSubCategory] = useState("Topwear");
   const [bestseller, setBestseller] = useState(false);
   const [sizes, setSizes] = useState([]);

   const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("discount",discount)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setDiscount('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-6'>
        <h1 className='text-2xl font-semibold text-slate-800'>Add New Product</h1>
        <p className='text-sm text-slate-500 mt-1'>Fill in the details below to create a new product catalog entry.</p>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8'>
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6'>
            <div className='w-full'>
              <p className='text-sm font-medium text-slate-700 mb-3'>Upload Product Images <span className='text-slate-400 font-normal'>(Max 4)</span></p>

              <div className='flex gap-3'>
                <label htmlFor="image1" className='cursor-pointer group'>
                  <div className='w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-colors group-hover:border-blue-500 bg-slate-50'>
                    <img className={`w-full h-full object-cover ${!image1 && 'w-8 h-8 opacity-50'}`} src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                  </div>
                  <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
                </label>
                <label htmlFor="image2" className='cursor-pointer group'>
                  <div className='w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-colors group-hover:border-blue-500 bg-slate-50'>
                    <img className={`w-full h-full object-cover ${!image2 && 'w-8 h-8 opacity-50'}`} src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                  </div>
                  <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
                </label>
                <label htmlFor="image3" className='cursor-pointer group'>
                  <div className='w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-colors group-hover:border-blue-500 bg-slate-50'>
                    <img className={`w-full h-full object-cover ${!image3 && 'w-8 h-8 opacity-50'}`} src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                  </div>
                  <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
                </label>
                <label htmlFor="image4" className='cursor-pointer group'>
                  <div className='w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-colors group-hover:border-blue-500 bg-slate-50'>
                    <img className={`w-full h-full object-cover ${!image4 && 'w-8 h-8 opacity-50'}`} src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                  </div>
                  <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
                </label>
              </div>
            </div>

            <div className='w-full'>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Product Title</label>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-2xl rounded-lg border border-slate-300 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500' type="text" placeholder='e.g. Men Solid Casual Shirt' required/>
            </div>

            <div className='w-full'>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Product Description</label>
              <textarea onChange={(e)=>setDescription(e.target.value)} value={description} rows={4} className='w-full max-w-2xl rounded-lg border border-slate-300 px-4 py-3 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500' type="text" placeholder='Provide a detailed description of the product...' required/>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-2xl'>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Category</label>
                  <select onChange={(e) => setCategory(e.target.value)} className='w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white'>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Sub Category</label>
                  <select onChange={(e) => setSubCategory(e.target.value)} className='w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white'>
                      <option value="Topwear">Topwear</option>
                      <option value="Bottomwear">Bottomwear</option>
                      <option value="Winterwear">Winterwear</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Price (₹)</label>
                  <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500' type="Number" placeholder='999' required />
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Discount (%)</label>
                  <input onChange={(e) => setDiscount(e.target.value)} value={discount} className='w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500' type="number" min={0} placeholder='0' />
                </div>

            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-3'>Available Sizes</label>
              <div className='flex flex-wrap gap-3'>
                {["S", "M", "L", "XL", "XXL"].map(size => (
                  <div key={size} onClick={()=>setSizes(prev => prev.includes(size) ? prev.filter( item => item !== size) : [...prev, size])}>
                    <p className={`flex h-10 min-w-[40px] cursor-pointer items-center justify-center rounded-md border text-sm font-medium transition-all ${sizes.includes(size) ? "bg-blue-50 border-blue-600 text-blue-700 ring-1 ring-blue-600" : "bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50" } px-3`}>{size}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex items-center gap-3 mt-2 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 w-full max-w-2xl'>
              <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className='w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500' />
              <label className='cursor-pointer text-sm font-medium text-slate-700 select-none' htmlFor="bestseller">Mark as Bestseller</label>
            </div>

            <div className='w-full max-w-2xl mt-4 pt-6 border-t border-slate-100'>
              <button type="submit" className='w-full sm:w-auto rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                Add Product to Catalog
              </button>
            </div>

        </form>
      </div>
    </div>
  )
}

export default Add
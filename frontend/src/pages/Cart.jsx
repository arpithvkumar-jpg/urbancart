import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='py-12'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='mb-8'>
          <Title text1={'YOUR'} text2={'CART'} />
        </div>

        {cartData.length > 0 ? (
          <div className='grid gap-8 lg:grid-cols-[1fr_380px]'>
            {/* Cart Items */}
            <div className='rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm overflow-hidden'>
              <div className='space-y-1'>
                {cartData.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id)

                  if (!productData) {
                    return null
                  }

                  return (
                    <div key={index} className='flex flex-col gap-4 border-b border-slate-100 py-4 sm:flex-row sm:items-center sm:justify-between last:border-0'>
                      <div className='flex items-start gap-4'>
                        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-[1rem] bg-slate-50'>
                          <img className='h-full w-full object-cover' src={productData.image[0]} alt={productData.name} />
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-semibold text-slate-900 sm:text-base'>{productData.name}</p>
                          <p className='mt-1 text-xs text-slate-500 sm:text-sm'>Size: <span className='font-medium text-slate-700'>{item.size}</span></p>
                          <p className='mt-2 text-base font-semibold text-slate-900'>{currency}{productData.price}</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-3 sm:flex-col sm:gap-4'>
                        <input
                          onChange={(e) =>
                            e.target.value === '' || e.target.value === '0'
                              ? null
                              : updateQuantity(item._id, item.size, Number(e.target.value))
                          }
                          className='w-16 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-medium text-slate-700 transition focus:border-blue-500 focus:bg-white focus:outline-none'
                          type='number'
                          min={1}
                          defaultValue={item.quantity}
                        />
                        <button
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-100 hover:text-red-600'
                        >
                          <img className='w-4' src={assets.bin_icon} alt='Remove' />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Cart Summary */}
            <div className='h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sticky top-24'>
              <CartTotal />
              <button
                onClick={() => navigate('/place-order')}
                className='mt-6 w-full rounded-full bg-gradient-to-r from-blue-600 to-slate-900 py-3 text-sm font-semibold text-white transition hover:shadow-lg'
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        ) : (
          <div className='rounded-[2rem] border border-slate-200 bg-slate-50 py-20 text-center'>
            <p className='text-lg font-semibold text-slate-900'>Your cart is empty</p>
            <p className='mt-2 text-sm text-slate-600'>Start shopping to add items to your cart</p>
            <button
              onClick={() => navigate('/collection')}
              className='mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700'
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart

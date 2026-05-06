import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {

  const { backendUrl, token , currency} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [orderToCancel, setOrderToCancel] = useState(null)
  const [cancelReason, setCancelReason] = useState('')

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancelOrder = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/order/cancel', {
        orderId: orderToCancel,
        cancelReason: cancelReason
      }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setCancelModalOpen(false)
        setOrderToCancel(null)
        setCancelReason('')
        loadOrderData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-16'>

        <div className='text-2xl'>
            <Title text1={'MY'} text2={'ORDERS'}/>
        </div>

        <div>
            {
              orderData.map((item,index) => (
                <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start gap-6 text-sm'>
                        <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                        <div>
                          <p className='sm:text-base font-medium'>{item.name}</p>
                          <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                            <p>{currency}{item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Size: {item.size}</p>
                          </div>
                          <p className='mt-1'>Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                          <p className='mt-1'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                        </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <p className={`min-w-2 h-2 rounded-full ${item.status === 'Cancelled' ? 'bg-red-500' : item.status === 'Cancellation Requested' ? 'bg-orange-500' : 'bg-green-500'}`}></p>
                            <p className='text-sm md:text-base'>{item.status}</p>
                        </div>
                        <div className='flex flex-col sm:flex-row gap-2'>
                          <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                          <button 
                            onClick={() => { setOrderToCancel(item.orderId); setCancelModalOpen(true); }} 
                            disabled={['Delivered', 'Cancelled', 'Cancellation Requested'].includes(item.status)}
                            className={`border px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                              ['Delivered', 'Cancelled', 'Cancellation Requested'].includes(item.status)
                                ? 'opacity-50 cursor-not-allowed border-slate-200 text-slate-400'
                                : 'border-red-200 text-red-600 hover:bg-red-50'
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                    </div>
                </div>
              ))
            }
        </div>

        {/* Cancellation Modal */}
        {cancelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4 shadow-xl">
              <h3 className="text-xl font-medium mb-2 text-slate-800">Cancel Order</h3>
              <p className="text-sm text-slate-500 mb-4">Please provide a reason for cancelling this order. This will be reviewed by our team.</p>
              <textarea 
                className="w-full border border-slate-300 rounded-md p-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm" 
                rows="3" 
                placeholder="Reason for cancellation..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              ></textarea>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => { setCancelModalOpen(false); setOrderToCancel(null); setCancelReason(''); }} 
                  className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={handleCancelOrder} 
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors shadow-sm"
                  disabled={!cancelReason.trim()}
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Orders

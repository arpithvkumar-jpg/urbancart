import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const statusHandler = async ( event, orderId ) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {token}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const printReceipt = (order) => {
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <html>
        <head>
          <title>Receipt - Order #${order._id.slice(-8).toUpperCase()}</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { margin: 0; color: #1e40af; }
            .header p { margin: 5px 0 0; color: #666; }
            .flex-container { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .section h3 { border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px; color: #444; }
            .section p { margin: 4px 0; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
            th { background: #f8fafc; }
            .total { text-align: right; font-size: 1.2em; font-weight: bold; border-top: 2px solid #eee; padding-top: 20px; }
            .footer { text-align: center; margin-top: 50px; font-size: 0.9em; color: #888; border-top: 1px dashed #eee; padding-top: 20px;}
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Seller Hub Receipt</h1>
            <p>Order ID: #${order._id}</p>
            <p>Date: ${new Date(order.date).toLocaleString()}</p>
          </div>
          
          <div class="flex-container">
            <div class="section" style="width: 48%;">
              <h3>Billed To:</h3>
              <p><strong>${order.address.firstName} ${order.address.lastName}</strong></p>
              <p>${order.address.street}</p>
              <p>${order.address.city}, ${order.address.state}</p>
              <p>${order.address.country} - ${order.address.zipcode}</p>
              <p>Phone: ${order.address.phone}</p>
            </div>
            
            <div class="section" style="width: 48%;">
              <h3>Payment Info:</h3>
              <p>Method: ${order.paymentMethod}</p>
              <p>Status: ${order.payment ? 'Paid' : 'Pending'}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Size</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.size}</td>
                  <td>${item.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total">
            Total Amount: ${currency}${order.amount}
          </div>

          <div class="footer">
            <p>Thank you for shopping with us!</p>
          </div>
          
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  const filteredOrders = orders.filter(order => {
    const searchString = searchTerm.toLowerCase();
    const orderIdMatch = order._id?.toLowerCase().includes(searchString);
    const nameMatch = `${order.address.firstName} ${order.address.lastName}`.toLowerCase().includes(searchString);
    const phoneMatch = order.address.phone?.includes(searchString);
    
    const matchesSearch = searchString === '' || orderIdMatch || nameMatch || phoneMatch;
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-800'>Order Management</h1>
          <p className='text-sm text-slate-500 mt-1'>Track, manage, and update customer order statuses.</p>
        </div>
        
        {/* Search and Filters */}
        <div className='flex flex-col sm:flex-row gap-3'>
          <div className='relative'>
            <input 
              type="text" 
              placeholder='Search by ID, Name or Phone...' 
              className='w-full sm:w-64 rounded-lg border border-slate-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors'
          >
            <option value="All">All Statuses</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancellation Requested">Cancellation Requested</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className='grid gap-6'>
        {
          filteredOrders.map((order, index) => (
            <div key={index} className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
              {/* Card Header */}
              <div className='bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div className='flex items-center gap-4'>
                  <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
                    <img className='w-5 h-5 opacity-70' src={assets.parcel_icon} alt="Parcel" />
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-slate-900'>Order #{order._id?.slice(-8).toUpperCase()}</p>
                    <p className='text-xs text-slate-500'>Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='text-right hidden sm:block'>
                    <p className='text-xs text-slate-500 uppercase tracking-wider'>Order Total</p>
                    <p className='text-sm font-bold text-slate-900'>{currency}{order.amount}</p>
                  </div>
                  
                  <button onClick={() => printReceipt(order)} className='p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors' title='Print Receipt'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0v2.793c0 .17.135.309.305.309h9.89a.309.309 0 00.305-.309V6.028z" />
                    </svg>
                  </button>

                  <select 
                    onChange={(event)=>statusHandler(event,order._id)} 
                    value={order.status} 
                    className={`rounded-full px-4 py-2 text-sm font-semibold border-2 outline-none transition-colors cursor-pointer ${
                      order.status === 'Delivered' ? 'border-green-200 bg-green-50 text-green-700 focus:border-green-500' :
                      order.status === 'Shipped' ? 'border-blue-200 bg-blue-50 text-blue-700 focus:border-blue-500' :
                      order.status === 'Out for delivery' ? 'border-amber-200 bg-amber-50 text-amber-700 focus:border-amber-500' :
                      order.status === 'Cancellation Requested' ? 'border-orange-200 bg-orange-50 text-orange-700 focus:border-orange-500' :
                      order.status === 'Cancelled' ? 'border-red-200 bg-red-50 text-red-700 focus:border-red-500' :
                      'border-slate-200 bg-white text-slate-700 focus:border-slate-500'
                    }`}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancellation Requested">Cancellation Requested</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Card Body */}
              <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10'>
                
                {/* Cancellation Request Banner */}
                {order.cancelRequested && order.status !== 'Cancelled' && (
                  <div className='md:col-span-3 mb-2 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3'>
                    <div className='text-orange-600 mt-0.5'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className='text-sm font-bold text-orange-800'>Cancellation Requested</h4>
                      <p className='text-sm text-orange-700 mt-1'><span className='font-semibold'>Reason:</span> {order.cancelReason}</p>
                    </div>
                  </div>
                )}

                {/* Items List */}
                <div className='md:col-span-2'>
                  <h4 className='text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3'>Items ({order.items.length})</h4>
                  <div className='space-y-3'>
                    {order.items.map((item, index) => (
                      <div key={index} className='flex items-start gap-3'>
                        <div className='w-2 h-2 rounded-full bg-slate-300 mt-1.5 flex-shrink-0'></div>
                        <div>
                          <p className='text-sm font-medium text-slate-800'>{item.name}</p>
                          <p className='text-xs text-slate-500'>Qty: {item.quantity} | Size: {item.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='sm:hidden mt-4 pt-4 border-t border-slate-100'>
                    <p className='text-xs text-slate-500 uppercase tracking-wider'>Order Total</p>
                    <p className='text-lg font-bold text-slate-900'>{currency}{order.amount}</p>
                  </div>
                </div>

                {/* Customer Details & Payment */}
                <div className='flex flex-col gap-5'>
                  <div>
                    <h4 className='text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2'>Delivery Address</h4>
                    <p className='text-sm font-medium text-slate-900'>{order.address.firstName + " " + order.address.lastName}</p>
                    <p className='text-sm text-slate-600 mt-1 leading-relaxed'>
                      {order.address.street},<br/>
                      {order.address.city}, {order.address.state},<br/>
                      {order.address.country} - {order.address.zipcode}
                    </p>
                    <p className='text-sm text-slate-600 mt-1'>Phone: {order.address.phone}</p>
                  </div>
                  
                  <div>
                    <h4 className='text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2'>Payment Info</h4>
                    <div className='flex flex-col gap-1.5'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-slate-500'>Method:</span>
                        <span className='font-medium text-slate-900'>{order.paymentMethod}</span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span className='text-slate-500'>Status:</span>
                        <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-amber-600'}`}>{ order.payment ? 'Paid' : 'Pending' }</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))
        }
        {filteredOrders.length === 0 && (
          <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center'>
            {orders.length === 0 ? (
              <>
                <p className='text-lg font-medium text-slate-900'>No orders found</p>
                <p className='text-sm text-slate-500 mt-1'>When customers place orders, they will appear here.</p>
              </>
            ) : (
              <>
                <p className='text-lg font-medium text-slate-900'>No results match your search</p>
                <p className='text-sm text-slate-500 mt-1'>Try adjusting your filters or search term.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setStatusFilter('All');}} 
                  className='mt-4 text-sm font-medium text-blue-600 hover:text-blue-700'
                >
                  Clear all filters
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
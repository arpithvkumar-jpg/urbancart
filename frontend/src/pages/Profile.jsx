import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Profile = () => {
  const { backendUrl, token, navigate, setToken, setCartItems, currency } = useContext(ShopContext)
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(true)
  const [editingAddress, setEditingAddress] = useState(false)
  const [addressForm, setAddressForm] = useState({})
  
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [orderToCancel, setOrderToCancel] = useState(null)
  const [cancelReason, setCancelReason] = useState('')

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchData()
  }, [backendUrl, navigate, token])

  const fetchData = async () => {
    try {
      const profileResp = await axios.get(backendUrl + '/api/user/profile', { headers: { token } })
      if (profileResp.data.success) {
        setProfile(profileResp.data.user)
        setAddressForm(profileResp.data.user.address || {})
      }

      const ordersResp = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (ordersResp.data.success) {
        setOrders(ordersResp.data.orders || [])
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
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
        fetchData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddressForm((prev) => ({ ...prev, [name]: value }))
  }

  const saveAddress = async () => {
    try {
      const response = await axios.post(
        backendUrl + '/api/user/update-address',
        { address: addressForm },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Address updated successfully')
        setEditingAddress(false)
        fetchData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  if (loading) {
    return <div className='py-24 text-center text-lg text-slate-600'>Loading profile...</div>
  }

  if (!profile) {
    return <div className='py-24 text-center text-lg text-slate-600'>Profile not found.</div>
  }

  return (
    <div className='py-8 pb-20'>
      <div className='mx-auto max-w-5xl'>
        {/* Header */}
        <div className='mb-8 flex flex-col gap-4 rounded-[2rem] bg-gradient-to-r from-blue-600 to-slate-900 p-8 text-white sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm uppercase tracking-[0.3em] text-blue-100'>Account Management</p>
            <h1 className='mt-2 text-3xl font-semibold'>My Profile</h1>
          </div>
          <button
            onClick={logout}
            className='rounded-full bg-white/20 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/30'
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className='mb-8 flex gap-2 border-b border-slate-200 rounded-t-[2rem] bg-white p-4'>
          {['profile', 'orders', 'address'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab === 'profile' && 'Profile'}
              {tab === 'orders' && 'Orders'}
              {tab === 'address' && 'Address'}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className='rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm'>
            <h2 className='mb-6 text-2xl font-semibold text-slate-900'>Personal Details</h2>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6'>
                <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>Full Name</p>
                <p className='mt-3 text-lg font-semibold text-slate-900'>{profile.name}</p>
              </div>
              <div className='rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6'>
                <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>Email Address</p>
                <p className='mt-3 text-lg font-semibold text-slate-900'>{profile.email}</p>
              </div>
              <div className='rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6'>
                <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>Member Since</p>
                <p className='mt-3 text-lg font-semibold text-slate-900'>{new Date(profile.createdAt).toLocaleDateString()}</p>
              </div>
              <div className='rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6'>
                <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>Account Status</p>
                <p className='mt-3 flex items-center gap-2 text-lg font-semibold text-slate-900'>
                  <span className='inline-block h-3 w-3 rounded-full bg-green-500'></span>
                  Active
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className='rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm'>
            <h2 className='mb-6 text-2xl font-semibold text-slate-900'>Order History</h2>
            {orders.length > 0 ? (
              <div className='space-y-4'>
                {orders.map((order, idx) => (
                  <div key={idx} className='rounded-[1.5rem] border border-slate-200 p-6 hover:border-slate-300 transition'>
                    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                      <div>
                        <p className='text-sm text-slate-500'>Order #{order._id?.slice(-6) || idx}</p>
                        <p className='mt-1 text-sm text-slate-600'>Date: {new Date(order.date).toLocaleDateString()}</p>
                        <p className='mt-1 text-sm text-slate-600'>Total: {currency}{order.amount}</p>
                      </div>
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2'>
                          <span className={`inline-block h-3 w-3 rounded-full ${order.status === 'Cancelled' ? 'bg-red-500' : order.status === 'Cancellation Requested' ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                          <span className='text-sm font-semibold text-slate-700'>{order.status}</span>
                        </div>
                        <button 
                          onClick={() => { setOrderToCancel(order._id); setCancelModalOpen(true); }} 
                          disabled={['Delivered', 'Cancelled', 'Cancellation Requested'].includes(order.status)}
                          className={`border px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            ['Delivered', 'Cancelled', 'Cancellation Requested'].includes(order.status)
                              ? 'opacity-50 cursor-not-allowed border-slate-200 text-slate-400'
                              : 'border-red-200 text-red-600 hover:bg-red-50'
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div className='mt-4 space-y-3 border-t border-slate-100 pt-4'>
                      {order.items?.map((item, i) => (
                        <div key={i} className='flex items-center gap-4 group'>
                          <img 
                            src={item.image[0]} 
                            className='w-12 h-12 object-cover rounded-md border border-slate-200 cursor-pointer' 
                            alt={item.name} 
                            onClick={() => navigate(`/product/${item._id}`)}
                          />
                          <div className='flex-1'>
                            <p 
                              onClick={() => navigate(`/product/${item._id}`)} 
                              className='text-sm font-medium text-slate-800 group-hover:text-blue-600 cursor-pointer transition-colors line-clamp-1'
                            >
                              {item.name}
                            </p>
                            <p className='text-xs text-slate-500 mt-0.5'>Qty: {item.quantity} | Size: {item.size}</p>
                          </div>
                          <div className='text-sm font-semibold text-slate-700'>
                            {currency}{item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='rounded-[1.5rem] border border-slate-200 bg-slate-50 p-12 text-center'>
                <p className='text-lg text-slate-600'>No orders yet</p>
                <p className='mt-2 text-sm text-slate-500'>Start shopping to see your orders here</p>
              </div>
            )}
          </div>
        )}

        {/* Address Tab */}
        {activeTab === 'address' && (
          <div className='rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm'>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-2xl font-semibold text-slate-900'>Shipping Address</h2>
              <button
                onClick={() => setEditingAddress(!editingAddress)}
                className='rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'
              >
                {editingAddress ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {editingAddress ? (
              <form className='space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <input
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    value={addressForm.firstName || ''}
                    onChange={handleAddressChange}
                    className='rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none'
                  />
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    value={addressForm.lastName || ''}
                    onChange={handleAddressChange}
                    className='rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none'
                  />
                </div>
                <input
                  type='text'
                  name='street'
                  placeholder='Street Address'
                  value={addressForm.street || ''}
                  onChange={handleAddressChange}
                  className='w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none'
                />
                <div className='grid gap-4 sm:grid-cols-2'>
                  <input
                    type='text'
                    name='city'
                    placeholder='City'
                    value={addressForm.city || ''}
                    onChange={handleAddressChange}
                    className='rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none'
                  />
                  <input
                    type='text'
                    name='state'
                    placeholder='State'
                    value={addressForm.state || ''}
                    onChange={handleAddressChange}
                    className='rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none'
                  />
                </div>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <input
                    type='text'
                    name='zipcode'
                    placeholder='Zipcode'
                    value={addressForm.zipcode || ''}
                    onChange={handleAddressChange}
                    className='rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none'
                  />
                  <input
                    type='text'
                    name='country'
                    placeholder='Country'
                    value={addressForm.country || ''}
                    onChange={handleAddressChange}
                    className='rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none'
                  />
                </div>
                <input
                  type='tel'
                  name='phone'
                  placeholder='Phone Number'
                  value={addressForm.phone || ''}
                  onChange={handleAddressChange}
                  className='w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none'
                />
                <button
                  type='button'
                  onClick={saveAddress}
                  className='w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700'
                >
                  Save Address
                </button>
              </form>
            ) : (
              <div className='rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6'>
                {addressForm.street ? (
                  <div className='space-y-2 text-sm text-slate-700'>
                    <p className='font-semibold text-slate-900'>{addressForm.firstName} {addressForm.lastName}</p>
                    <p>{addressForm.street}</p>
                    <p>{addressForm.city}, {addressForm.state} {addressForm.zipcode}</p>
                    <p>{addressForm.country}</p>
                    <p className='text-slate-600'>{addressForm.phone}</p>
                  </div>
                ) : (
                  <p className='text-slate-600'>No address saved yet</p>
                )}
              </div>
            )}
          </div>
        )}
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

export default Profile

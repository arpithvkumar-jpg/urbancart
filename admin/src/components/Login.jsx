import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
             
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-slate-50 p-6'>
        <div className='bg-white shadow-xl shadow-blue-900/5 rounded-2xl p-8 sm:p-10 max-w-md w-full border border-slate-100'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-slate-900'>Seller Hub</h1>
              <p className='text-slate-500 mt-2 text-sm'>Sign in to your admin dashboard</p>
            </div>
            <form onSubmit={onSubmitHandler} className='space-y-6'>
                <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Email Address</label>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full rounded-lg border border-slate-300 px-4 py-3 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500' type="email" placeholder='admin@example.com' required />
                </div>
                <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full rounded-lg border border-slate-300 px-4 py-3 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500' type="password" placeholder='••••••••' required />
                </div>
                <button className='w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' type="submit"> Secure Login </button>
            </form>
        </div>
    </div>
  )
}

export default Login
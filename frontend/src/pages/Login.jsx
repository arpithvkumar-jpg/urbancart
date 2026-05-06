import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Account created successfully!')
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Logged in successfully!')
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleResponse = async (credentialResponse) => {
    setLoading(true)
    try {
      const response = await axios.post(backendUrl + '/api/user/google-login', { tokenId: credentialResponse.credential })
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        toast.success('Logged in with Google!')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!googleClientId) return
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.google && window.google.accounts && googleClientId) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleResponse,
        })
        window.google.accounts.id.renderButton(document.getElementById('google-signin-button'), {
          theme: 'outline',
          size: 'large',
          width: '100%',
        })
      }
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [googleClientId])

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12'>
      <div className='w-full max-w-md px-4'>
        <div className='rounded-[2rem] bg-white shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100'>
          <div className='bg-gradient-to-r from-blue-600 to-slate-900 px-8 py-10 text-white'>
            <p className='text-3xl font-semibold'>{currentState === 'Login' ? 'Welcome Back' : 'Join Us'}</p>
            <p className='mt-2 text-sm text-slate-100'>
              {currentState === 'Login' ? 'Sign in to continue shopping' : 'Create an account to get started'}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className='px-8 py-8 space-y-5'>
            {currentState === 'Sign Up' && (
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>Full Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type='text'
                  className='w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500'
                  placeholder='Enter your full name'
                  required
                />
              </div>
            )}

            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                className='w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500'
                placeholder='Enter your email'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                className='w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500'
                placeholder='Enter your password'
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full rounded-full bg-gradient-to-r from-blue-600 to-slate-900 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:shadow-xl hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Loading...' : currentState === 'Login' ? 'Sign In' : 'Create Account'}
            </button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-slate-200'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='bg-white px-2 text-slate-500'>Or continue with</span>
              </div>
            </div>

            <div id='google-signin-button' className='w-full'></div>

            <div className='flex items-center justify-between gap-3 text-sm text-slate-600'>
              {currentState === 'Login' ? (
                <>
                  <button
                    type='button'
                    onClick={() => setCurrentState('Sign Up')}
                    className='text-blue-600 font-semibold hover:text-blue-700'
                  >
                    Create account
                  </button>
                  <span>•</span>
                  <button type='button' className='text-slate-600 hover:text-slate-900'>
                    Forgot password?
                  </button>
                </>
              ) : (
                <button
                  type='button'
                  onClick={() => setCurrentState('Login')}
                  className='text-blue-600 font-semibold hover:text-blue-700'
                >
                  Already have an account? Sign In
                </button>
              )}
            </div>
          </form>

          <div className='border-t border-slate-100 bg-slate-50 px-8 py-4 text-center text-xs text-slate-500'>
            <p>
              By continuing, you agree to our{' '}
              <button className='text-blue-600 hover:underline'>Terms of Service</button> and{' '}
              <button className='text-blue-600 hover:underline'>Privacy Policy</button>
            </p>
          </div>
        </div>

        <div className='mt-8 text-center text-sm text-slate-600'>
          <p>Need help? <button className='text-blue-600 font-semibold hover:text-blue-700'>Contact Support</button></p>
        </div>
      </div>
    </div>
  )
}

export default Login

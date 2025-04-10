'use client'
 
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const LoginPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing again
    if (error) setError('')
  }
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    console.log('Login attempt with:', formData)
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Login failed')
      }
      
      
      setTimeout(() => {
        // ifsuccessful login, redirect to home
        router.push('/home')
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
 
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden md:block md:w-1/2 bg-gray" id='login'>
        <Image
          src="/Images/cars.jpg"
          alt="Luxury Cars"
          width={1000}
          height={1000}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          className="opacity-50"
        />
        <div className="absolute bottom-12 left-10 text-white max-w-md">
          <p className="text-xl font-medium bottom-12">
            Login now and Monitor Your Parking in Real-Times
          </p>
        </div>
      </div>
 
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-8 text-center">LOGIN</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
           
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                required
                disabled={isLoading}
              />
            </div>
             
            <div className="mb-8">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <div className="relative text-black">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 bg-orange"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
             
            <button
              type="submit"
              className={`w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>
           
          <div className="mt-6 text-center">
            <span>Don't have an account?</span>
            <Link href="/Signup" className="text-orange-600 font-medium ml-1">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default LoginPage
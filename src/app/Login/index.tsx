'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt with:', formData)
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden md:block md:w-1/2 bg-gray">
        <Image
          src="/Images/cars.jpg"
          alt="Luxury Cars"
          width={1000}
          height={1000}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          className="opacity-50"
        />
        <div className="absolute bottom-12 left-10 text-white max-w-md">
          <p className="text-xl font-medium">
            Login now and gain immediate access to our system
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-8 text-center">LOGIN</h1>
          
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
              className="w-full bg-orange hover:bg-dark-orange text-white py-3 rounded font-medium"
            >
              LOGIN
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <span>Don't have an account?</span>
            <Link href="/signup" className="text-dark-orange font-medium ml-1">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
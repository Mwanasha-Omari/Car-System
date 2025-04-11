'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiEye, FiEyeOff, FiChevronDown } from 'react-icons/fi'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    property: 'flat',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }
    console.log('Signup attempt with:', formData)
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
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-8 text-center">SIGNUP</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6 text-black">
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                required
              />
            </div>
            
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
            
            <div className="mb-6">
              <label htmlFor="property" className="block mb-2 font-medium">
                Select Property Type
              </label>
              <div className="relative">
                <select
                  id="property"
                  name="property"
                  value={formData.property}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded focus:outline-none appearance-none pr-10 cursor-pointer"
                  required
                >
                  <option value="flat">Flat</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                  <FiChevronDown size={18} />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <div className="relative">
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="mb-8">
              <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
            
            <Link href="/Sidebar">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-medium"
            >
              SIGN UP
            </button>
            </Link>
            
            <p className="mt-6 text-center text-black">
              Already have an account?{' '}
              <Link href="/Login" className="text-orange-500 hover:bold font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;
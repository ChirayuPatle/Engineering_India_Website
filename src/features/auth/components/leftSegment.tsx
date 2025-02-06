import React from 'react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import Checkbox from '@/components/ui/checkbox'

function LeftPage() {
  return (
    <div className="flex items-center justify-center min-h-screen pl-8">
      <main className="border-2 p-6 m-5 bg-white rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-bold text-center mb-4">Sign Up</h1>
        <span className="block text-center text-gray-600 mb-3">Sign up with</span>
        <div className="flex justify-center gap-4 mb-4">
          <Button className="px-4 py-2">Google</Button>
          <Button className="px-4 py-2">Facebook</Button>
        </div>
        <hr />
        <span className="block text-center text-green-500 mb-3">OR</span>
        <div className="mb-4">
          <div className="mb-3">
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <Input className="w-full border rounded px-2 py-1" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <Input className="w-full border rounded px-2 py-1" id="email" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <Input className="w-full border rounded px-2 py-1" id="password" type="password" />
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-sm">I’ve read and agree with the Terms of Service and Privacy Policy.</label>
        </div>
        <Button rightIcon="arrow" className="py-2" />
      </main>
    </div>
  )
}

export default LeftPage;

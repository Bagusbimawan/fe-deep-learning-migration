import Navbar from '@/components/Navbar/Navbar'
import React from 'react'
import useProtectedRoute from '../middleware'

const EditProfile = () => {
  useProtectedRoute()
  return (
    <div>
        <Navbar/>
      <h1>Edit Profile</h1>
    </div>
  )
}

export default EditProfile

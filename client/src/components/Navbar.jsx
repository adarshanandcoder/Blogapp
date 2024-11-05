import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex justify-center items-center gap-10 font-bold text-lg py-3 m-3 shadow-lg'>
        <Link to="/">Home</Link>
        <Link to='/createblog'>Create your Blog</Link>
    </div>
  )
}

export default Navbar
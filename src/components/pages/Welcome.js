import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to='/map' className='btn btn-dark'> Let's Get Started</Link>
    </div>
  )
}

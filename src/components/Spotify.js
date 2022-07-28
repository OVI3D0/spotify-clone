import React from 'react'
import Main from './Main'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import './spotify.css'

export default function Spotify() {

  return (
    <div className="row">
      <div className='col sidecol'>
        <Sidebar />
      </div>
      <div className='col'>
        <div className='row'><Navbar /></div>
        <div className='row'><Main /></div>
      </div>
    </div>
  )
}

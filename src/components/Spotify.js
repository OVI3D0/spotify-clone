import React, { useRef, useEffect } from 'react'
import Sidebar from './Sidebar'

import './spotify.css'

export default function Spotify() {

  return (
    <div className="row">
      <div className='col-2 me-5'>
        <Sidebar />
      </div>
    </div>
  )
}

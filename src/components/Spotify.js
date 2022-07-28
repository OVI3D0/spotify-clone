import React from 'react'
import Main from './Main'
import Navbar from './Navbar'
import Player from './Player'
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
      <Player />
    </div>
  )
}

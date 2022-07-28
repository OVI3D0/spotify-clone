import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../utils/StateProvider'

// styles
import './main.css'

export default function Main() {
  const [{token, selectedPlaylist}, dispatch] = useStateProvider()
  const [playList, setPlaylist] = useState({
    title: "",
    tracks: null
  })

  useEffect(() => {
    if(selectedPlaylist) {
      const getInitialPlaylist = async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylist}`, 
          {
          headers: {
              Authorization:"Bearer " +token,
              "Content-Type": "application/json"
          }
      })
      setPlaylist({
        title: response.data.name,
        tracks: response.data.tracks.items
      })
    }
      getInitialPlaylist() 
    }
  }, [token, dispatch, selectedPlaylist])

    return (
    <div className='main-body text-white'>
      <h1 className='fs-1 pb-3'>{playList.title}</h1>
      {playList.tracks && playList.tracks.map((item) => {
        return (
          <span key={item.track.id}>
            <h2 className='fs-5 mt-2'>{item.track.name}</h2>
            <li>{item.track.artists.map((artist) => {
              return artist.name
            })}</li>
          </span>
        )
      })}
    </div>
  )
}

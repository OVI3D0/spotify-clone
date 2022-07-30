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
      console.log(playList)
    }
  }, [token, dispatch, selectedPlaylist])

  function openArtist(link) {
    window.open(link)
  }

  return (
    <div className='main-body text-white'>
      <h1 className='fs-1 mb-3'>{playList.title}</h1>
      {playList.tracks && playList.tracks.map((item) => {
        return (
          <div key={item.track.id} className="song-body pb-2 ps-2">
            <i className="fa-solid fa-play d-inline pe-2"></i>
            <img src={item.track.album.images[0].url} className='track-img px-1' /> 
            <h2 className='fs-5 ms-2 song-title d-inline'>{item.track.name}</h2>
            {item.track.artists.map((artist) => {
              return <li className='artist my-1 fs-6' key={artist.id} onClick={()=> openArtist(artist.external_urls.spotify)}>{artist.name}</li>
            })}
          </div> 
        )
      })}
    </div>
  )
}

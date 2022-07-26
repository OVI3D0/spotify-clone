import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../utils/StateProvider'

// styles
import './main.css'

export default function Main() {
  const [{ token, selectedPlaylist, selectedSong }, dispatch] = useStateProvider()
  const [playList, setPlaylist] = useState({
    title: "",
    tracks: null
  })

  useEffect(() => {
    if (selectedPlaylist) {
      const getInitialPlaylist = async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylist}`,
          {
            headers: {
              Authorization: "Bearer " + token,
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

  function openArtist(link) {
    window.open(link)
  }

  return (
    <div className='main-body text-white'>
      <h1 className='fs-1 fw-bold mb-3'>{playList.title}</h1>
      {playList.tracks && playList.tracks.map((item) => {
        return (
          <div key={item.track.id} className="song-body pb-2 ps-2">
            {item.track.id === selectedSong.songId ? <i className="fa-solid fa-pause d-inline pe-2 isPlaying"></i> : <i className="fa-solid fa-play d-inline pe-2"></i>}
            <img src={item.track.album.images[0].url} className='track-img px-1' alt={`Album cover for the song: ${item.track.name}`} />
            <h2 className={item.track.id === selectedSong.songId ? 'fs-5 ms-2 d-inline-block song-title isPlaying' : 'fs-5 ms-2 d-inline-block song-title'} onClick={() => openArtist(item.track.external_urls.spotify)}>{item.track.name}</h2><br />
            <span className={item.track.id === selectedSong.songId ? 'fs-6 isPlaying artist mt-1' : 'fs-6 artist mt-1'}>
              {item.track.artists.map(artist => {
                return <span className='artistName' key={artist.id} onClick={() => openArtist(artist.external_urls.spotify)}>{artist.name}</span>
              }).reduce((prev, curr) => [prev, ', ', curr])}
            </span>
          </div>
        )
      })}
    </div>
  )
}

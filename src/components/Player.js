import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'

// styles
import './player.css'

export default function Player() {
  const [{token, selectedSong}, dispatch] = useStateProvider()

  useEffect(() => {
      const getCurrentTrack = async() => {
          const response = await axios.get(
              'https://api.spotify.com/v1/me/player', 
              {
              headers: {
                  Authorization:"Bearer " +token,
                  "Content-Type": "application/json"
              }
          })
          const { data } = response
          if(data) {
            dispatch({type: reducerCases.CURRENTLY_PLAYING, data })
          }
      setTimeout(getCurrentTrack, 10000)
      }
      getCurrentTrack()
  }, [token, dispatch])


  return (
    <div className='player-body text-white'>
        {Object.keys(selectedSong).length === 0 ? <p className='text-center pt-4'>Nothing is playing! Select a song to start jamming.</p>
        :
        <>
          <img src={selectedSong.photo} className="player-img ms-5 mt-3 d-inline-block" alt="" />
          <p className='d-inline-block fs-5 ps-3'>
            {selectedSong.songTitle}
          <br />
          <p className='fs-6'>
            {selectedSong.songArtists.map((artist) => {
                return <span key={artist.id}>{artist.name}, </span>
              })}
          </p>
          </p>
        </>}
    </div>
  )
}

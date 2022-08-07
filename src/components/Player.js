import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'

// styles
import './player.css'

export default function Player() {
  const [{token, selectedSong}, dispatch] = useStateProvider()
  const [time, setTime] = useState({})

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
          setTime({
            currTime: data.progress_ms,
            totalTime: data.item.duration_ms
          })
          console.log(data)
          if(data) {
            dispatch({type: reducerCases.CURRENTLY_PLAYING, data })
          }
      setTimeout(getCurrentTrack, 10000)
      }
      getCurrentTrack()
  }, [token, dispatch])

  function msToTime(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div className='player-body text-white'>
        {Object.keys(selectedSong).length === 0 ? <p className='text-center pt-4'>Nothing is playing! Select a song to start jamming.</p>
        :
        <>
          <img src={selectedSong.photo} className="player-img ms-5 mt-3 d-inline-block" alt="" />
          <p className='d-inline-block fs-5 ps-3'>
            {selectedSong.songTitle}
          <br />
          <span className='fs-6'>
            {selectedSong.songArtists.map((artist) => {
                return <span key={artist.id}>{artist.name}, </span>
              })}
          </span>
          </p>
          <span className='playerBarContainer'>
            <span className='playerBar'></span>
          </span>
        </>
        }
    </div>
  )
}

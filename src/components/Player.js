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
          console.log(data)
          if(data) {
            dispatch({type: reducerCases.CURRENTLY_PLAYING, data })
            setTime({
              currTime: data.progress_ms,
              totalTime: data.item.duration_ms
            })
          }
      // setTimeout(getCurrentTrack, 10000)
      }
      getCurrentTrack()
  }, [token, dispatch])

  function msToTime(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div className='player-body text-white row'>
        {Object.keys(selectedSong).length === 0 ? <p className='text-center pt-4'>Nothing is playing! Select a song to start jamming.</p>
        :
        <>
        <div className='col-3'>
          <img src={selectedSong.photo} className="player-img ms-5 mt-3 d-inline-block" alt="" />
            <p className='d-inline-block fs-5 ps-3'>
              {selectedSong.songTitle}
            <br />
            <span className='fs-6'>
              {selectedSong.songArtists.map((artist) => {
                  return <span className='fs-7' key={artist.id}>{artist.name}, </span>
                })}
            </span>
            </p>
        </div>
        <div className='col ps-5'>
          <span className='playerBarContainer'>
                <span>
                  <i className={selectedSong.shuffleState ? "fa-solid fa-shuffle px-3 fa-lg activeColor" : "fa-solid fa-shuffle px-3 fa-lg"}></i>
                  <i className="fa-solid fa-angle-left px-3 fa-lg"></i>
                  <i className={selectedSong.isPlaying ? "fa-solid fa-circle-pause px-3 fa-2xl" : "fa-solid fa-circle-play px-3 fa-2xl"}></i>
                  <i className="fa-solid fa-angle-right fa-lg px-3"></i>
                  <i className={selectedSong.repeatState === "off" ? "fa-solid fa-repeat px-3 fa-lg" : "fa-solid fa-repeat px-3 fa-lg activeColor"}></i>
                </span>
                <span className='playerBar'></span>
          </span>
        </div>
        </>
        }
    </div>
  )
}

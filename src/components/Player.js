import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'

// styles
import './player.css'

export default function Player() {
  const [{token}, dispatch] = useStateProvider()

  useEffect(() => {
      const getCurrentTrack = async() => {
          const response = await axios.get(
              'https://api.spotify.com/v1/me/player/currently-playing', 
              {
              headers: {
                  Authorization:"Bearer " +token,
                  "Content-Type": "application/json"
              }
          })
          console.log(response)
          // dispatch({type: reducerCases.SELECTED_SONG, song})
      }
      getCurrentTrack()
  }, [token, dispatch])

  return (
    <div className='player-body text-white'>
        player
    </div>
  )
}

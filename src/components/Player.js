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
        //   console.log(response.data)
        //   setTimeout(getCurrentTrack, 5000)
      }
      getCurrentTrack()
  }, [token, dispatch])

  return (
    <div className='player-body text-white'>
        {Object.keys(selectedSong).length === 0 ? <p>nothing</p>:<p>something</p>}
    </div>
  )
}

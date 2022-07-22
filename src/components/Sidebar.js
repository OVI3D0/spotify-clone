import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'

// styles
import './sidebar.css'

export default function Sidebar() {
    const [{token, items}, dispatch] =useStateProvider()

    useEffect(() => {
        const getPlaylistData = async() => {
            const response = await axios.get(
                'https://api.spotify.com/v1/me/playlists', 
                {
                headers: {
                    Authorization:"Bearer " +token,
                    "Content-Type": "application/json"
                }
            })
            const {items} = response.data
            console.log(items)
            dispatch({type: reducerCases.SET_PLAYLISTS, items})
        }
        getPlaylistData()
    }, [token, dispatch])

  return (
    <div className='sidebar-body vh-100'>
        Sidebar Filler
    </div>
  )
}

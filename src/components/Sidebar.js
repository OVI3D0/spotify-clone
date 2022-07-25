import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'

// styles
import './sidebar.css'

export default function Sidebar() {
    const [{token, playlists}, dispatch] = useStateProvider()

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
            console.log(response)
            const playlists = items.map(({ name, id }) => {
                return { name, id }
            })
            dispatch({type: reducerCases.SET_PLAYLISTS, playlists})
        }
        getPlaylistData()
    }, [token, dispatch])
    

  return (
    <div className='sidebar-body vh-100 d-inline-flex flex-column ps-4'>
        <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png' className='sideLogo pt-4 pb-3' alt='spotify logo' />
        <div className='d-flex flex-column pb-4'>
            <button className='btn btn-dark my-1 text-start'><i className="fa-solid fa-house pe-2"></i>Home</button>
            <button className='btn btn-dark my-1 text-start'><i className="fa-solid fa-magnifying-glass pe-2"></i>Search</button>
            <button className='btn btn-dark my-1 text-start'><i className="fa-solid fa-swatchbook pe-2"></i>Your Library</button>
        </div>
        <div className='d-flex flex-column'>
            <button className='btn btn-dark my-1 text-start'><i className="fa-solid fa-square-plus pe-2"></i>Create Playlist</button>
            <button className='btn btn-dark my-1 text-start'><i className="fa-solid fa-heart-circle-plus pe-2"></i>Liked Songs</button>
            <button className='btn btn-dark my-1 text-start'><i className="fa-solid fa-bookmark pe-2"></i>Your Episodes</button>
            <hr />
        </div>
        <ul>
            {playlists.map(({ name, id }) => {
                return <li className='my-3 playlists' key={id}>{name}</li>
            })}
        </ul>
    </div>
  )
}

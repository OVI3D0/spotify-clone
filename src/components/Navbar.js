import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
// styles
import './navbar.css'

export default function Navbar() {

    const [{token}, dispatch] = useStateProvider()
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const getUserData = async() => {
            const { data } = await axios.get(
                'https://api.spotify.com/v1/me', 
                {
                headers: {
                    Authorization:"Bearer " +token,
                    "Content-Type": "application/json"
                }
            })
            setUserData({
                name: data.display_name,
                link: data.external_urls.spotify
            })
        }
        getUserData()
    }, [token, dispatch])

    function handleClick() {
        window.open(userData.link)
    }

  return (
    <div className='navbar-body text-white d-inline float-end pe-4 pt-2 pb-5 w-100'>
        <input type="text" placeholder='Search Songs, Artists, or Podcasts' className="rounded d-inline form-control float-start w-50" />
        <div className='user float-end d-inline' onClick={handleClick}>
            <i className="fa-solid fa-circle-user pe-2 fa-xl"></i>{userData && userData.name}
        </div>
    </div>
  )
}

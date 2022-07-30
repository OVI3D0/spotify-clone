import React from 'react'

// styles
import './login.css'

export default function Login() {

    const handleClick = () => {
        // building the authorization URL

        // clientID is from our spotify app dashboard
        const clientId = "77f5f423fb5c48acb35f98c20c01d42e";
        // redirect url brings us back to our app after user logs in
        const redirectUrl = "http://localhost:3000";
        // actual auth url
        const apiUrl = "https://accounts.spotify.com/authorize";
        // scopes for our permissions (read spotify api docs for this)
        const scope = [
            "user-read-email",
            "user-read-private",            
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-position",
            "user-top-read",
        ]
        // brings us to the new url with our variables
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
            " "
        )}&response_type=token&show_dialog=true`
    }

  return (
    <div className='vh-100 w-100 login-bg'>
        <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png' alt='spotify logo' />
        <button onClick={handleClick} className="btn btn-dark">Connect with Spotify</button>
    </div>
  )
}

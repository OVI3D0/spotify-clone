import React from 'react'

// styles
import './login.css'

export default function Login() {

    const handleClick = () => {
        // building the authorization URL

        // clientID is from our spotify app dashboard
        const clientId = "f9280238c4df48e984de407d6ea01506";
        // redirect url brings us back to our app after user logs in
        const redirectUrl = "http://localhost:3000";
        // actual auth url
        const apiUrl = "https://accounts.spotify.com/authorize";
        // scopes for our permissions (read spotify api docs for this)
        const scope = [
            'user-read-email',
            'user-read-private',
            'user-modify-playback-state',
            'user-read-playback-state',
            'user-read-currently-playing',
            'user-read-recently-played',
            'user-read-playback-position',
            'user-top-read',
            'playlist-read-collaborative',
            'playlist-modify-public',
            'playlist-read-private',
            'playlist-modify-private',
            'user-library-modify',
            'user-library-read',
            'ugc-image-upload',
        ]
        // brings us to the new url with our variables
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=&${scope.join(
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

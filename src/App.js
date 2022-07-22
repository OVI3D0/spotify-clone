import "./app.css";
import Login from "./components/Login";
import { useEffect } from "react";
import { reducerCases } from "./utils/Constants";
import Spotify from "./components/Spotify";
import { useStateProvider } from "./utils/StateProvider";

function App() {
  const [{token}, dispatch] = useStateProvider()
  useEffect(() => {
    const hash = window.location.hash;
    if(hash) {
      // breaking apart the returned string to grab our access token
      const token = hash.substring(1).split("&")[0].split('=')[1]
      dispatch({type: reducerCases.SET_TOKEN, token})
    }
  }, [token, dispatch])

  return (
    <div className="app-body app-dark vh-100">
      {token ? <Spotify /> : <Login />}
    </div>
  );
}

export default App;

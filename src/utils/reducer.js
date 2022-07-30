import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    playlists: [],
    userData: {},
    selectedPlaylist: "",
    selectedSong: {}
}

const reducer = (state, action) => {
    switch(action.type) {
        case reducerCases.SET_TOKEN:
            return {
                ...state, 
                token:action.token
            }
        case reducerCases.SET_PLAYLISTS:
            return {
                ...state,
                playlists: action.playlists,
                selectedPlaylist: action.playlists[0].id
            }
        case reducerCases.SET_USER:
            return {
                ...state,
                userData: {
                    username: action.name,
                    userLink: action.link,
                    userID: action.id
                }
            }
        case reducerCases.SELECTED_PLAYLIST:
            return {
                ...state,
                selectedPlaylist: action.id
            }
        case reducerCases.CURRENTLY_PLAYING:
            return {
                ...state,
                selectedSong: {
                    songId: action.data.item.id,
                    songTitle: action.data.item.name,
                    photo: action.data.item.album.images[0].url,
                    songArtists: action.data.item.artists.map(({name, id}) => {
                        return {
                            name: name,
                            id: id,
                        }
                    })
                    // maybe add more here
                }
            }
        default: 
            return state;
    }
}

export default reducer;
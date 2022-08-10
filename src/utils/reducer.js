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
                    }),
                    shuffleState: action.data.shuffle_state,
                    repeatState: action.data.repeat_state, 
                    isPlaying: action.data.is_playing,
                    currTime: action.data.progress_ms,
                    totalTime: action.data.item.duration_ms,
                    // maybe add more here
                }
            }
        case reducerCases.CURRENTLY_PLAYING_MAIN:
            return {
                ...state,
                selectedSong: {
                    songId: action.data.id,
                    songTitle: action.data.name,
                    photo: action.data.album.images[0].url,
                    songArtists: action.data.artists.map(({name, id}) => {
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
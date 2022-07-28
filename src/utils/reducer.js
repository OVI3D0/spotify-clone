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
        case reducerCases.SELECTED_SONG:
            return {
                id: action.id,
                title: action.title,
                // maybe add more here
            }
        default: 
            return state;
    }
}

export default reducer;
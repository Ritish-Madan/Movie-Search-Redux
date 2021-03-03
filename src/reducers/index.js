import {
    REMOVE_FAVOURITE, 
    SHOW_FAVOURITE, 
    ADD_FAVOURITE,
    ADD_MOVIES,
    ADD_MOVIE_TO_LIST,
    ADD_SEARCH_RESULT
    } from '../actions'
import {combineReducers} from 'redux';
const initMovieState = {
    list: [],
    showFavourites: false,
    favourites: []
}

export function movies(state = initMovieState, action){
    switch(action.type){
        case ADD_MOVIES:
            return{
                ...state,
                list: action.movies
            };
        case ADD_FAVOURITE:
            return{
                ...state,
                favourites: [action.movie, ...state.favourites]
            }
        case REMOVE_FAVOURITE:
            let index = state.favourites.indexOf(action.movie);
            state.favourites.splice(index, 1);
            return{
                ...state,
                favourites: state.favourites
            }
        case SHOW_FAVOURITE:
            return{
                ...state,
                showFavourites: action.val
            }
        case ADD_MOVIE_TO_LIST:
            return{
                ...state,
                list: [action.movie, ...state.list]
            }
        default:
            return state;
    }
}

const initialSearchState = {
    results:{},
    showSearchResults: false
}

export function search(state = initialSearchState, action){
    switch(action.type){
        case ADD_SEARCH_RESULT:
            if(action.movie.Response !== 'False'){
                state.showSearchResults = true;
            }
            return{
                ...state,
                results: action.movie,
            };
        case ADD_MOVIE_TO_LIST:
            return{
                ...state,
                showSearchResults: false
            }
        default:
            return state;
    }
}


// const initialRootState = {
//     movies: initMovieState,
//     search: initialSearchState
// }

// export default function rootReducer(state = initialRootState, action){
//     return{
//         movies: movies(state.movies, action),
//         search: search(state.search, action)
//     }
// }

export default combineReducers({
    movies,
    search
})
import {ADD_MOVIES} from '../actions';
import {ADD_FAVOURITE} from '../actions';
import {REMOVE_FAVOURITE, SHOW_FAVOURITE} from '../actions'
const initMovieState = {
    list: [],
    showFavourites: false,
    favourites: []
}

export function movies(state, action){
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
        default:
            return state;
    }
}

const initialSearchState = {
    results:{}
}

export function search(state = initialSearchState, action){
    return state;
}


const initialRootState = {
    movies: initMovieState,
    search: initialSearchState
}

export default function rootReducer(state = initialRootState, action){
    return{
        movies: movies(state.movies, action),
        search: search(state.search, action)
    }
}
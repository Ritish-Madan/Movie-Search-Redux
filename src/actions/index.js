export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';
export const SHOW_FAVOURITE = 'SHOW_FAVOURITE'

export function addMovies(movies){
   return{
        type: 'ADD_MOVIES',
        movies
    }
}

export function addFavourite(movie){
    return{
        type: 'ADD_FAVOURITE',
        movie
    }
}

export function removeFavourite(movie){
    return{
        type: 'REMOVE_FAVOURITE',
        movie
    }
}

export function showFavourites(val){
    return{
        type: 'SHOW_FAVOURITE',
        val
    }
}


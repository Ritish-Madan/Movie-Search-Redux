import React from 'react';
import {addFavourite, removeFavourite} from '../actions'

class MovieCard extends React.Component{
    handleFavouriteClicks = () =>{
        const movie = this.props.movies;
        this.props.dispatch(addFavourite(movie));
    }
    handleUnFavouriteClicks = () =>{
        const movie = this.props.movies;
        this.props.dispatch(removeFavourite(movie));
    }
    render(){
        const movie = this.props.movies;
        const {isFavourite} = this.props;
        return (
            <div className='movie-card'>
                <div className = 'left'>
                    <img alt = 'movie-poster' src={movie.Poster} />
                </div>
                <div className="right">
                    <div className="title">{movie.Title}</div>
                    <div className="plot">{movie.Plot}</div>
                    <div className="footer">
                        <div className = "rating">{movie.imdbRating}</div>
                        {
                            isFavourite
                            ?<button className="favourite-btn" onClick = {this.handleUnFavouriteClicks}>Un-Favourite</button>
                            :<button className="favourite-btn" onClick = {this.handleFavouriteClicks}>Favourite</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieCard;

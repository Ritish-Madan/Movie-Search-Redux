import React from 'react';
import {data} from '../data';
import Navbar from './navbar';
import MovieCards from './movieCards';
import '../styles/index.css'
import {addMovies, showFavourites} from '../actions'

class App extends React.Component {
  componentDidMount(){
    const {store} = this.props;
    store.subscribe(() =>{
      console.log(store.getState());
      this.forceUpdate();
    })
    store.dispatch(addMovies(data));
  }

  isFavourite = (movie) =>{
    const {movies} = this.props.store.getState();
    let index = movies.favourites.indexOf(movie);
    if(index !== -1){
      return true;
    }else{
      return false;
    }
  }

  showFavourites = (val) =>{
    const {store} = this.props;
    store.dispatch(showFavourites(val));
  }
  render(){
    const { movies, search } = this.props.store.getState();
    const { list, favourites, showFavourites } = movies;
    const displayData = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar 
        dispatch = {this.props.store.dispatch}
        search = {search}
        />
        <div className = 'main'>
          <div className = 'tabs'>
            <div className='tab' onClick = {() =>{this.showFavourites(false)}}>Movie</div>
            <div className='tab' onClick = {() =>{this.showFavourites(true)}}>Favourites</div>
          </div>
          <div className='list'>
            {displayData.map((movie, index) =>{return(
              <MovieCards 
                movies={movie}
                key = {`movies-${index}`}
                dispatch = {this.props.store.dispatch}
                isFavourite = {this.isFavourite(movie)}
              />
            )})}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

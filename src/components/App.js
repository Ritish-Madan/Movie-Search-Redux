import React from 'react';
import {data} from '../data';
import Navbar from './navbar';
import MovieCards from './movieCards';
import '../styles/index.css';
import {addMovies, showFavourites} from '../actions';
import {connect} from 'react-redux';

class App extends React.Component {
  componentDidMount(){
    this.props.dispatch(addMovies(data));
  }

  isFavourite = (movie) =>{
    const {movies} = this.props;
    let index = movies.favourites.indexOf(movie);
    if(index !== -1){
      return true;
    }else{
      return false;
    }
  }

  showFavourites = (val) =>{
    this.props.dispatch(showFavourites(val));
  }
  render(){
    const { movies, search } = this.props;
    const { list, favourites, showFavourites } = movies;
    const displayData = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar 
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
                dispatch = {this.props.dispatch}
                isFavourite = {this.isFavourite(movie)}
              />
            )})}
          </div>
        </div>
      </div>
    );
  }
}

function callback(state){
  return {
    movies: state.movies,
    search: state.search
  }
}

// class AppConsumer extends React.Component{
//   render(){
//     return(
//       <storeContext.Consumer>
//       {(store) =>{
//         return(
//           <App store = {store}/>
//         )
//       }}
//     </storeContext.Consumer>
//     )
//   }
// }

const connectedAppComponent = connect(callback)(App);
export default connectedAppComponent;

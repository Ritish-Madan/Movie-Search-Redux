import React from 'react';
import {handleMovieSearch, addMovieToList} from '../actions'
import {connect} from 'react-redux';


class Navbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            searchText: ""
        };
    };

    handleAddToMovies(movie){
        this.props.dispatch(addMovieToList(movie))
    }

    handleChange = (e)=>{
        this.setState({
            searchText: e.target.value
        });
    };
    handleSearch = ()=>{
        const {searchText} = this.state;
        if(searchText.length === 0){
            return alert('Enter Movie');
        }
        this.props.dispatch(handleMovieSearch(searchText));
    };
    
    render(){
        const {results, showSearchResults} = this.props.search;
        // const {showSearchResults} = this.state;
        return (
            <div className='nav'>
                <div className='search-container'>
                    <input onChange = {this.handleChange} placeholder='Search...' />
                    <button id='search-btn' onClick={this.handleSearch}>Search</button>

                    {showSearchResults && 
                        <div className="search-results">
                            <div className="search-result">
                                <img src={results.Poster} alt="search-pic"/>

                                <div className="movie-info">
                                    <span>{results.Title}</span>
                                    <button onClick={() => this.handleAddToMovies(results)}>
                                        Add to Movies
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    };
};

function callback(state){
    return{
        search: state.search
    }
}

// class navbarConsumer extends React.Component{
//     render(){
//         return(
//             <storeContext.Consumer>
//             {(store) =>{
//                 return(
//                     <Navbar 
//                     dispatch = {store.dispatch}
//                     search = {this.props.search}
//                     />
//                 )
//             }}
//             </storeContext.Consumer>
//         )
//     }
// }

const connectedNavbarComponent = connect(callback)(Navbar);

export default connectedNavbarComponent;

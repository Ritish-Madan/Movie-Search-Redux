import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
import combineReducers from './reducers';
import thunk from "redux-thunk";

// We have used thunk inbuilt library instead of below thunk
// const thunk = ({dispatch, getState}) => (next) => (action) =>{
//   if(typeof(action) == 'function'){
//     action(dispatch);
//     return;
//   };
//   next(action);
// };

const store = createStore(combineReducers, applyMiddleware(thunk));
export const storeContext = createContext();

class Provider extends React.Component{
  render(){
    const {store} = this.props;
    return(
      <storeContext.Provider value = {store}>
        {this.props.children}
      </storeContext.Provider>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider value={store}>
      <App store = {store}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

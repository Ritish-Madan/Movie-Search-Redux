import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
import combineReducers from './reducers';
import thunk from "redux-thunk";

// const thunk = ({dispatch, getState}) => (next) => (action) =>{
//   if(typeof(action) == 'function'){
//     action(dispatch);
//     return;
//   };
//   next(action);
// };

const store = createStore(combineReducers, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <App 
      store = {store}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

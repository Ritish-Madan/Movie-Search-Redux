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

export function connect(callback){
  return function(Component){
    class ConnectedComponent extends React.Component{
      constructor(props){
        super(props);
        const {store} = this.props;
        this.unsubscribe = store.subscribe(() => {this.forceUpdate()})
      }
      componentWillUnmount(){
        this.unsubscribe();
      }
      render(){
        const state = this.props.store.getState();
        const sendDataAsProps = callback(state);
        return(
          <Component 
            {...sendDataAsProps}
            dispatch = {store.dispatch}
          />
        )
      }
    }
    class ConnectedComponentWrapper extends React.Component{
      render(){
        return(
          <storeContext.Consumer>
            {(store) =>{
              return(<ConnectedComponent 
                store = {store}
              />) 
            }}
          </storeContext.Consumer>
        )
      }
    };
    return ConnectedComponentWrapper
  }
};

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
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

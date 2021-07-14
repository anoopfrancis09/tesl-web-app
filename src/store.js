// import React from 'react';
import { createStore, applyMiddleware } from 'redux'
// import { Provider,connect } from "react-redux";
import thunkMiddleware from 'redux-thunk'
// import logger from 'redux-logger'

// importing rootReducer
import rootReducer from './reducers/index'

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      // logger,
      thunkMiddleware
    )
  )
}

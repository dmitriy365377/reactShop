import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import beersReducer from './beers-reducer'

let reducers = combineReducers({
    beersReducer: beersReducer
})

let store = createStore(reducers, applyMiddleware(logger))

export default store

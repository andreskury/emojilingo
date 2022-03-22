import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];
let enhancers = [applyMiddleware(...middleware)]

if (process.env.NODE_ENV === 'development') {
  enhancers.push((window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose);
}

const store = createStore(
  rootReducer,
  initialState,
  compose(...enhancers)
);
export default store;
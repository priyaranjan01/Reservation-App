import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import dataReducer from './Reducer';

const rootReducer = combineReducers({dataReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

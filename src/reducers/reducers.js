import { combineReducers } from 'redux';
import changeCriptoReducer from './criptoReducers';

const rootReducer = combineReducers({
  cripto: changeCriptoReducer,
});

export default rootReducer;

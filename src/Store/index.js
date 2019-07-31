import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createStore, compose,applyMiddleware,combineReducers} from 'redux';
import SignUp from '../Store/SignUp/SignUp.reducer';
import Login from '../Store/Login/Login.reducer';
import Post from '../Store/Post/Post.reducer';

let middleware = applyMiddleware(thunk,logger);
let rootReducer = combineReducers({SignUp,Login,Post})
const store = createStore(rootReducer,compose(middleware))
export default store;
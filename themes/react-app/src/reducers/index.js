import { combineReducers } from "redux";

import token from './tokenReducer';
import muppetModal from './modalReducer';


export default combineReducers({
  token,
  muppetModal
})
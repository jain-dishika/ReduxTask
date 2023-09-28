import AddingTheUser from "./Operation";
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    list : AddingTheUser
})
export default rootReducer
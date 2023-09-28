import { createStore } from "redux"
import rootReducer from "./Reducer/Main";

const  store  = createStore(rootReducer);
export default store;
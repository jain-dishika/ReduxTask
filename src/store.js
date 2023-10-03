import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducer/Main";

const  store  = configureStore(rootReducer);
export default store;
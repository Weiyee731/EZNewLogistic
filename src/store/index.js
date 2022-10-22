import { combineReducers, applyMiddleware } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import { counterReducer } from "./reducer/gitReducer";
import { gitEpic } from "./epic/gitEpic";

const rootEpic = combineEpics(
  gitEpic.User_Login,
  gitEpic.User_Register,
  gitEpic.User_ViewAreaCode,
  gitEpic.Notification_ViewNotification,
  gitEpic.Inventory_ViewStockByFilter,
);

const epicMiddleware = createEpicMiddleware();
const rootReducer = combineReducers({ counterReducer });
const middleware = [
  thunk,
  epicMiddleware
]
const initialState = {};
const store = configureStore({ 
  reducer: rootReducer,
  middleware: [...middleware],
  preloadedState: initialState,
    
})
epicMiddleware.run(rootEpic);
export default store

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
  // gitEpic.User_ViewProfileByID,
  gitEpic.User_ForgetPassword,
  gitEpic.User_UpdateUserPassword,
  gitEpic.Inventory_ViewStockByFilter2,
  gitEpic.User_ViewGeneralSetting,
  gitEpic.User_UpdateUserProfile,
  gitEpic.User_ProfileByID,
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

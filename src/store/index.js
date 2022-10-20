import { combineReducers, createStore, applyMiddleware } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import thunk from 'redux-thunk'
import { counterReducer } from "./reducer/gitReducer";
import { gitEpic } from "./epic/gitEpic";

const rootEpic = combineEpics(
  gitEpic.User_Login,
  gitEpic.User_Logout,
  gitEpic.User_Profile,
  gitEpic.User_ProfileByID,
  gitEpic.User_ViewAreaCode,
  gitEpic.User_ViewPage,
  gitEpic.Inventory_ViewStockList,
  gitEpic.Inventory_InsertStock,
  gitEpic.Inventory_UpdateStockDetailByGet,
  gitEpic.Inventory_UpdateStockDetailByPost,
  gitEpic.Container_ViewContainer,
  gitEpic.Transaction_InsertTransaction,
  gitEpic.Transaction_UpdateTransactionStatus,
  gitEpic.Transaction_UpdateTransactionDetailHandling,
  gitEpic.Transaction_UpdateTransactionPayment,
  gitEpic.Transaction_ViewTransaction,
  gitEpic.Transaction_ViewTransactionByID,
  gitEpic.Transaction_DeleteTransaction,
  gitEpic.Inventory_InsertStockByPost,
  gitEpic.Inventory_GetFilteredStockList,
  gitEpic.Dashboard_View,
  gitEpic.Inventory_ViewStockListByDate,
  gitEpic.Inventory_ViewArchiveStockListByDate,
  gitEpic.Transaction_ViewArchiveTransaction,
  gitEpic.User_RegisterUsersByPost,
  gitEpic.User_UpdateUserProfile,
  gitEpic.User_DeleteUserProfile,
);

const epicMiddleware = createEpicMiddleware();
const rootReducer = combineReducers({ counterReducer });
const middleware = [
  thunk,
  epicMiddleware
]
const initialState = {};
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))
epicMiddleware.run(rootEpic);
export default store

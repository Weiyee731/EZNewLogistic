import 'rxjs'

import { GitAction } from "../action/gitAction";
import { toast } from "react-toastify";
import axios from "axios";
import { ServerConfiguration } from "../serverConf";
const { filter, map } = require('rxjs/operators');

const url = ServerConfiguration.LiveServerUrl;

export class GitEpic {
  User_Login = action$ =>
    action$.pipe(filter(action => action.type === GitAction.Login), map(action => {
      return dispatch => {
        try {
          console.log(url + "User_Login?" +
            "USERNAME=" + action.payload.USERNAME +
            "&PASSWORD=" + action.payload.PASSWORD
          )

          return fetch(url + "User_Login?" +
            "USERNAME=" + action.payload.USERNAME +
            "&PASSWORD=" + action.payload.PASSWORD
          )
            .then(response => response.json())
            .then(json => {
              return dispatch({ type: GitAction.LoginSuccess, payload: JSON.parse(json) });
            });
        } catch (error) {
          toast.error("Error Code: User_Login")
          return dispatch({ type: GitAction.LoginSuccess, payload: [] });
        }
      }
    }));

  User_Register = action$ =>
    action$.pipe(filter(action => action.type === GitAction.RegisterUser), map(action => {
      return dispatch => {
        try {
          console.log(url + "User_Register?" +
            "USERAREAID=" + action.payload.USERAREAID +
            "&USERNAME=" + action.payload.USERNAME +
            "&FULLNAME=" + action.payload.FULLNAME +
            "&PASSWORD=" + action.payload.PASSWORD +
            "&CONTACTNO=" + action.payload.CONTACTNO +
            "&USEREMAIL=" + action.payload.USEREMAIL +
            "&USERNICKNAME=" + action.payload.USERNICKNAME +
            "&USERWECHATID=" + action.payload.USERWECHATID
          )
          return fetch(url + "User_Register?" +
            "USERAREAID=" + action.payload.USERAREAID +
            "&USERNAME=" + action.payload.USERNAME +
            "&FULLNAME=" + action.payload.FULLNAME +
            "&PASSWORD=" + action.payload.PASSWORD +
            "&CONTACTNO=" + action.payload.CONTACTNO +
            "&USEREMAIL=" + action.payload.USEREMAIL +
            "&USERNICKNAME=" + action.payload.USERNICKNAME +
            "&USERWECHATID=" + action.payload.USERWECHATID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.UserRegistered, payload: json });

            });
        } catch (error) {
          toast.error("Error Code: User_Register")
          return dispatch({ type: GitAction.UserRegistered, payload: [] });
        }
      }
    }));

  User_ViewAreaCode = action$ =>
    action$.pipe(filter(action => action.type === GitAction.FetchUserAreaCode), map(action => {
      return dispatch => {
        try {
          return fetch(
            url + "User_ViewAreaCode"
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.UserAreaCodeFetched, payload: json });
            });
        } catch (error) {
          toast.error("Error Code: Member_GetMemberPreviousBranches")
          return dispatch({ type: GitAction.UserAreaCodeFetched, payload: [] });
        }
      }
    }));

  Notification_ViewNotification = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GetNotification), map(action => {
      return dispatch => {
        try {
          return fetch(
            url + "Notification_ViewNotification?NOTIFICATIONSTATUSID=" + action.payload.status
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.GotNotification, payload: json });
            });
        } catch (error) {
          toast.error("Unable to get notification")
          return dispatch({ type: GitAction.GotNotification, payload: [] });
        }
      }
    }));

  Inventory_ViewStockByFilter = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GetParcelStatus), map(action => {
      return dispatch => {
        try {
          console.log(
            url + "Inventory_ViewStockByFilter?FILTERCOLUMN=" + action.payload.trackingNumber
          )
          return fetch(
            url + "Inventory_ViewStockByFilter?FILTERCOLUMN=" + action.payload.trackingNumber
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              console.log(json[0].ReturnVal)
              if (json[0].ReturnVal === 0) {
                toast.error("Invalid tracking number")
              }
              // return dispatch({ type: GitAction.GotParcelStatus, payload: json[0].ReturnVal === 1 ? json : [] });
              return dispatch({ type: GitAction.GotParcelStatus, payload: json});
            });
        } catch (error) {
          toast.error("Unable to get the status of your parcel")
          return dispatch({ type: GitAction.GotParcelStatus, payload: [] });
        }
      }
    }));
}


export let gitEpic = new GitEpic();
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

    User_ForgetPassword = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ForgetPassword), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_ForgetPassword?" +
            "USEREMAIL=" + action.payload.UserEmail 
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.ForgotPassword, payload: json });
            });
        } catch (error) {
          toast.error("Error Code: User_ForgetPassword")
          return dispatch({ type: GitAction.ForgotPassword, payload: [] });
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
              return dispatch({ type: GitAction.GotNotification, payload: json[0].ReturnVal === 1 ? JSON.parse(json[0].ReturnData) : [] });
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
          return fetch(
            url + "Inventory_ViewStockByFilter?FILTERCOLUMN=" + action.payload.trackingNumber
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              // if (json[0].ReturnVal === 0) {
              //   toast.error("Invalid tracking number")
              // }
              return dispatch({ type: GitAction.GotParcelStatus, payload: json[0].ReturnVal === 1 ? [] : json });
            });
        } catch (error) {
          toast.error("Unable to get the status of your parcel")
          return dispatch({ type: GitAction.GotParcelStatus, payload: [] });
        }
      }
    }));

  Inventory_ViewStockByFilter2 = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GetParcelStatus2), map(action => {
      return dispatch => {
        try {
          return fetch(
            url + "Inventory_ViewStockByFilter2?FILTERCOLUMN=" + action.payload.trackingNumber
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 0) {
                toast.error("Invalid tracking number")
              }
              return dispatch({ type: GitAction.GotParcelStatus2, payload: json[0].ReturnVal === 1 ? JSON.parse(json[0].ReturnData) : [] });
            });
        } catch (error) {
          toast.error("Unable to get the status of your parcel")
          return dispatch({ type: GitAction.GotParcelStatus2, payload: [] });
        }
      }
    }));

  // User_ViewProfileByID = action$ =>
  //   action$.pipe(filter(action => action.type === GitAction.GetParcelStatus), map(action => {
  //     return dispatch => {
  //       try {
  //         return fetch(
  //           url + "User_ViewProfileByID?USERID=" + action.payload.USERID
  //         )
  //           .then(response => response.json())
  //           .then(json => {
  //             json = JSON.parse(json)
  //             return dispatch({ type: GitAction.GotParcelStatus, payload: json });
  //           });
  //       } catch (error) {
  //         toast.error("Unable to get the status of your parcel")
  //         return dispatch({ type: GitAction.GotParcelStatus, payload: [] });
  //       }
  //     }
  //   }));

  User_ViewGeneralSetting = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GetGeneralSetting), map(action => {
      return dispatch => {
        try {
          return fetch(
            url + "User_ViewGeneralSetting?USERID=" + action.payload.UserID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.GotGeneralSetting, payload: json });
            });
        } catch (error) {
          return dispatch({ type: GitAction.GotGeneralSetting, payload: [] });
        }
      }
    }));

  User_UpdateUserPassword = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UpdatePassword), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_UpdateUserPassword"
            + "?USERID=" + action.payload.USERID
            + '&USERPASSWORD=' + action.payload.USERPASSWORD
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.PasswordUpdated, payload: json });
            });
        } catch (error) {
          return dispatch({ type: GitAction.PasswordUpdated, payload: [] });
        }
      }
    }));

  User_ProfileByID = action$ =>
    action$.pipe(filter(action => action.type === GitAction.FetchUserProfileByID), map(action => {
      return dispatch => {
        try {
          return fetch(url +
            "User_ViewProfileByID?" +
            "USERID=" + action.payload.UserID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.UserProfileByIDFetched, payload: json });
            });
        } catch (error) {
          toast.error("Error Code: User_ProfileByID")
          return dispatch({ type: GitAction.UserProfileByIDFetched, payload: [] });
        }
      }
    }));

  User_UpdateUserProfile = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UpdateUserProfile), map(action => {
      return dispatch => {
        try {
          return fetch(url +
            "User_UpdateUserProfile?" +
            "USERID=" + action.payload.USERID +
            "&USERCODE=" + action.payload.USERCODE +
            "&USERAREAID=" + action.payload.USERAREAID +
            "&FULLNAME=" + action.payload.FULLNAME +
            "&CONTACTNO=" + action.payload.CONTACTNO +
            "&USEREMAIL=" + action.payload.USEREMAIL +
            "&USERADDRESS=" + action.payload.USERADDRESS +
            "&MINSELFPICKUPPRICE=" + action.payload.MINSELFPICKUPPRICE +
            "&CUBICSELFPICKUPPRICE=" + action.payload.CUBICSELFPICKUPPRICE +
            "&CONSOLIDATEPRICE=" + action.payload.CONSOLIDATEPRICE +
            "&DELIVERYCARGO=" + action.payload.DELIVERYCARGO +
            "&DELIVERYFIRSTPRICE=" + action.payload.DELIVERYFIRSTPRICE +
            "&DELIVERYSUBPRICE=" + action.payload.DELIVERYSUBPRICE
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.UserProfileUpdated, payload: json });
            });
        } catch (error) {
          toast.error("Error Code: User_ProfileByID")
          return dispatch({ type: GitAction.UserProfileUpdated, payload: [] });
        }
      }
    }));

}

export let gitEpic = new GitEpic();

// 
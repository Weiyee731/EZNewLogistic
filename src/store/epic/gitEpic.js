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
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.LoginSuccess, payload: JSON.parse(json[0].ReturnData) });
              } else {
                // toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.LoginSuccess, payload: [] });
              }
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
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.UserRegistered, payload: JSON.parse(json[0].ReturnData) });
              } else {
                // toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UserRegistered, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_Register")
          return dispatch({ type: GitAction.UserRegistered, payload: [] });
        }
      }
    }));




  Notification_ViewNotification = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GetNotification), map(action => {
      return dispatch => {
        try {
          return fetch(
            url + "Notification_ViewNotification"
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              console.log(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.GotNotification, payload: JSON.parse(json[0].ReturnData) });
              } else {
                return dispatch({ type: GitAction.GotNotification, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_GetMemberPreviousBranches")
          return dispatch({ type: GitAction.GotNotification, payload: [] });
        }
      }
    }));
}


export let gitEpic = new GitEpic();
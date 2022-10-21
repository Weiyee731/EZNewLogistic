import 'rxjs'

import { GitAction } from "../action/gitAction";
import { toast } from "react-toastify";
import axios from "axios";
import { ServerConfiguration } from "../serverConf";
const { filter, map } = require('rxjs/operators');

const url = ServerConfiguration.LiveServerUrl;

export class GitEpic {
  User_ViewUserRole = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GET_USER_VIEWUSERROLE), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_ViewUserRole")
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.GOT_USER_VIEWUSERROLE, payload: JSON.parse(json[0].ReturnData) });
              } else {
                // toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.GOT_USER_VIEWUSERROLE, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_ViewUserRole")
          return dispatch({ type: GitAction.GOT_USER_VIEWUSERROLE, payload: [] });
        }
      }
    }));

  User_UpdateUserRole = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_USER_UPDATEUSERROLE), map(action => {
      return dispatch => {
        try {
          return fetch(
            url + "User_UpdateUserRole?" +
            "USERTYPEID=" + action.payload.UserTypeID +
            "&USERTYPE=" + action.payload.UserType +
            "&MODIFYBY=" + action.payload.ModifyBy
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.UPDATED_USER_UPDATEUSERROLE, payload: JSON.parse(json[0].ReturnData) });
              } else {
                // toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_USER_UPDATEUSERROLE, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_UpdateUserRole")
          return dispatch({ type: GitAction.UPDATED_USER_UPDATEUSERROLE, payload: [] });
        }
      }
    }));

  User_AddUserRole = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ADD_USER_ADDUSERROLE), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_AddUserRole?" +
            "&USERTYPE=" + action.payload.UserType +
            "&CREATERBY=" + action.payload.CreatedBy)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === '1') {
                return dispatch({ type: GitAction.ADDED_USER_ADDUSERROLE, payload: JSON.parse(json[0].ReturnData) });
              } else {
                // toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.ADDED_USER_ADDUSERROLE, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_AddUserRole")
          return dispatch({ type: GitAction.ADDED_USER_ADDUSERROLE, payload: [] });
        }
      }
    }));

  User_Login = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GET_USER_LOGIN), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_Login?" +
            "USERNAME=" + action.payload.Username +
            "&PASSWORD=" + action.payload.Password
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.GOT_USER_LOGIN, payload: JSON.parse(json[0].ReturnData) });
              } else {
                // toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.GOT_USER_LOGIN, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: VerifyUserLogin")
          return dispatch({ type: GitAction.GOT_USER_LOGIN, payload: [] });
        }
      }
    }));

  // ///////////////////////////////////////////////////  User Side Bar ///////////////////////////////////////////////////
  User_ViewPage = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GET_USER_VIEWPAGE), map(action => {
      return dispatch => {

        try {
          return fetch(url + "User_ViewPageByRole?" +
            "ROLEGROUPID=" + action.payload.RoleGroupID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.GOT_USER_VIEWPAGE, payload: JSON.parse(json[0].ReturnData) });
              } else {
                return dispatch({ type: GitAction.GOT_USER_VIEWPAGE, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_ViewPage")
          return dispatch({ type: GitAction.GOT_USER_VIEWPAGE, payload: [] });
        }
      }
    }));

  User_ViewPageByRole = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GET_USER_VIEWPAGE_BY_ROLE), map(action => {
      return dispatch => {

        try {
          return fetch(url + "User_ViewPage?" +
            "ROLEGROUPID=" + action.payload.RoleGroupID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.GOT_USER_VIEWPAGE_BY_ROLE, payload: JSON.parse(json[0].ReturnData) });
              } else {
                // toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.GOT_USER_VIEWPAGE_BY_ROLE, payload: JSON.parse(json[0].ReturnData) });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_ViewPage_By_Role")
          return dispatch({ type: GitAction.GOT_USER_VIEWPAGE_BY_ROLE, payload: [] });
        }
      }
    }));


  User_AddPageAccess = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ADD_USER_ADDPAGEACCESS), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_AddPageAccess?" +
            "PAGEID=" + action.payload.PageID +
            "&USERTYPEID=" + action.payload.UserTypeID +
            "&CREATEDBY=" + action.payload.CreatedBy +
            "&ENABLEIND=" + action.payload.EnableInd)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                // return dispatch({ type: GitAction.ADDED_USER_ADDPAGEACCESS, payload: JSON.parse(json[0].ReturnData) });

                return fetch(url + "User_ViewPageByRole?" +
                  "ROLEGROUPID=" + action.payload.RoleGroupID
                )
                  .then(response => response.json())
                  .then(json => {
                    json = JSON.parse(json)
                    if (json[0].ReturnVal === '1') {
                      return dispatch({ type: GitAction.GOT_USER_VIEWPAGE, payload: JSON.parse(json[0].ReturnData) });
                    } else {
                      toast.error(json[0].ReturnMsg)
                      return dispatch({ type: GitAction.GOT_USER_VIEWPAGE, payload: JSON.parse(json[0].ReturnData) });
                    }
                  });

              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.ADDED_USER_ADDPAGEACCESS, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_AddPageAccess")
          return dispatch({ type: GitAction.ADDED_USER_ADDPAGEACCESS, payload: [] });
        }
      }
    }));

  User_AddPage = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ADD_USER_ADDPAGE), map(action => {
      return dispatch => {
        try {
          return fetch(url +
            "User_AddPage?" +
            "PAGENAME=" + action.payload.PageName +
            "&PAGEICON=" + action.payload.PageIcon +
            "&PAGEURL=" + action.payload.PageUrl +
            "&PAGETYPE=" + action.payload.PageType +
            "&PAGESEQORDER=" + action.payload.PageSeqOrder +
            "&USERTYPEID=" + action.payload.UserTypeID +
            "&PARENTPAGEID=" + action.payload.ParentPageID +
            "&CREATEDBY=" + action.payload.CreatedBy
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.ADDED_USER_ADDPAGE, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.ADDED_USER_ADDPAGE, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_AddPage")
          return dispatch({ type: GitAction.ADDED_USER_ADDPAGE, payload: [] });
        }
      }
    }));

  User_DeletePageAccess = action$ =>
    action$.pipe(filter(action => action.type === GitAction.DELETE_USER_DELETEPAGEACCESS), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_DeletePageAccess?" +
            "PAGEACCESSID=" + action.payload.PageAccessID +
            "&MODIFYBY=" + action.payload.ModifyBy)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === '1') {
                return dispatch({ type: GitAction.DELETED_USER_DELETEPAGEACCESS, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.DELETED_USER_DELETEPAGEACCESS, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_DeletePageAccess")
          return dispatch({ type: GitAction.DELETED_USER_DELETEPAGEACCESS, payload: [] });
        }
      }
    }));

  User_DeletePage = action$ =>
    action$.pipe(filter(action => action.type === GitAction.DELETE_USER_DELETEPAGE), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_DeletePage?" +
            "PAGEID=" + action.payload.PageID +
            "&MODIFYBY=" + action.payload.ModifyBy)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === '1') {
                return dispatch({ type: GitAction.DELETED_USER_DELETEPAGE, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.DELETED_USER_DELETEPAGE, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_DeletePage")
          return dispatch({ type: GitAction.DELETED_USER_DELETEPAGE, payload: [] });
        }
      }
    }));

  ///////////////////////////////////////////////////  User Management  ///////////////////////////////////////////////////

  User_AddUser = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ADD_USER), map(action => {
      return dispatch => {
        try {
          return fetch(url + "AddUser?" +
            "UID=" + action.payload.UID +
            "&Username=" + action.payload.Username +
            "&UserRole=" + action.payload.UserRole +
            "&ApplicationName=" + action.payload.ApplicationName +
            "&Email=" + action.payload.Email +
            "&NRIC=" + action.payload.NRIC +
            "&Password=" + action.payload.Password +
            "&ContactNo=" + action.payload.ContactNo +
            "&Position=" + action.payload.Position +
            "&IsApproved=" + action.payload.IsApproved +
            "&IsOnLine=" + action.payload.IsOnLine +
            "&IsLockedOut=" + action.payload.IsLockedOut +
            "&FailedPasswordAttemptCount=" + action.payload.FailedPasswordAttemptCount +
            "&FailedPasswordAnswerAttemptCount=" + action.payload.FailedPasswordAnswerAttemptCount +
            "&ProfilePhoto=" + action.payload.ProfilePhoto +
            "&NRICFront=" + action.payload.NRICFront +
            "&NRICBack=" + action.payload.NRICBack
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.ADDED_USER, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.ADDED_USER, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_AddUser")
          return dispatch({ type: GitAction.ADDED_USER, payload: [] });
        }
      }
    }));

  User_UpdateUser = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_USER), map(action => {
      return dispatch => {

        try {
          return fetch(url + "UpdateUser?" +
            "UID=" + action.payload.UID +
            "&Username=" + action.payload.Username +
            "&UserID=" + action.payload.UserId +
            "&ApplicationName=" + action.payload.ApplicationName +
            "&Email=" + action.payload.Email +
            "&UserRole=" + action.payload.UserRole +
            "&NRIC=" + action.payload.NRIC +
            "&ContactNo=" + action.payload.ContactNo +
            "&Position=" + action.payload.Position +
            "&IsApproved=" + action.payload.IsApproved +
            "&IsOnLine=" + action.payload.IsOnLine +
            "&IsLockedOut=" + action.payload.IsLockedOut +
            "&FailedPasswordAttemptCount=" + action.payload.FailedPasswordAttemptCount +
            "&FailedPasswordAnswerAttemptCount=" + action.payload.FailedPasswordAnswerAttemptCount +
            "&ProfilePhoto=" + action.payload.ProfilePhoto +
            "&NRICFront=" + action.payload.NRICFront +
            "&NRICBack=" + action.payload.NRICBack
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                toast.success(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_USER, payload: json[0].ReturnData });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_USER, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_UpdateUser")
          return dispatch({ type: GitAction.UPDATED_USER, payload: [] });
        }
      }
    }));

  User_DeleteUser = action$ =>
    action$.pipe(filter(action => action.type === GitAction.DELETE_USER), map(action => {
      return dispatch => {
        try {
          return fetch(url + "DeleteUser?" +
            "UID=" + action.payload.UID +
            "&UserID=" + action.payload.UserID +
            "&CurrentUID=" + action.payload.CurrentUID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                toast.success(json[0].ReturnMsg)
                return dispatch({ type: GitAction.DELETED_USER, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.DELETED_USER, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: DELETED_USER")
          return dispatch({ type: GitAction.DELETED_USER, payload: [] });
        }
      }
    }));

  User_UpdateUserPassword = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_USERPASSWORD), map(action => {
      return dispatch => {
        try {
          return fetch(url + "UpdateUserPassword?" +
            "UserID=" + action.payload.UserID +
            "&Password=" + action.payload.Password
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.UPDATED_USERPASSWORD, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_USERPASSWORD, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: UPDATED_USERPASSWORD")
          return dispatch({ type: GitAction.UPDATED_USERPASSWORD, payload: [] });
        }
      }
    }));

  User_ViewUser = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_USER), map(action => {
      return dispatch => {
        try {
          return fetch(url + "GetUser")
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.VIEWED_USER, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_USER, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_DeletePage")
          return dispatch({ type: GitAction.VIEWED_USER, payload: [] });
        }
      }
    }));

  User_ViewUserWithDataControl = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_USER_WITHDATACONTROL), map(action => {
      return dispatch => {
        try {
          return fetch(url + "GetUserWithDataControl")
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.VIEWED_USER_WITHDATACONTROL, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_USER_WITHDATACONTROL, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_ViewUserWithDataControl")
          return dispatch({ type: GitAction.VIEWED_USER_WITHDATACONTROL, payload: [] });
        }
      }
    }));



  ///////////////////////////////////////////////////  User Data Control  ///////////////////////////////////////////////////
  User_SetDataControl = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_DATACONTROL), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_SetUserDataControl?" +
            "UserId=" + action.payload.UserId +
            "&ParliamentId=" + action.payload.ParliamentId +
            "&BranchId=" + action.payload.BranchId +
            "&AuthorizedEnable=" + action.payload.AuthorizedEnable +
            "&UID=" + action.payload.UID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)

              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.UPDATED_DATACONTROL, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_DATACONTROL, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_DeletePage")
          return dispatch({ type: GitAction.UPDATED_DATACONTROL, payload: [] });
        }
      }
    }));

  User_ViewDataControl = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_DATACONTROL), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_ViewUserDataControl?" +
            "USERID=" + action.payload.UserId
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)

              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.VIEWED_DATACONTROL, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_DATACONTROL, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_ViewUserDataControl")
          return dispatch({ type: GitAction.VIEWED_DATACONTROL, payload: [] });
        }
      }
    }));


  User_ViewDataControlByAuth = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_DATACONTROL_BYAUTH), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_ViewUserDataControlByAuthentication?" +
            "USERID=" + action.payload.UserId
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)

              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.VIEWED_DATACONTROL_BYAUTH, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_DATACONTROL_BYAUTH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_ViewDataControlByAuth")
          return dispatch({ type: GitAction.VIEWED_DATACONTROL_BYAUTH, payload: [] });
        }
      }
    }));

  //////////////////////////////////////////////////// SETTING ACCESS ///////////////////////////////////////////////////////////////////
  Zone_ViewZone = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_ZONE), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Zone_ViewZone")
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.VIEWED_ZONE, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_ZONE, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Zone_ViewZone")
          return dispatch({ type: GitAction.VIEWED_ZONE, payload: [] });
        }
      }
    }));

  Zone_AddZone = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ADD_ZONE), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Zone_AddZone?" +
            "Zone=" + action.payload.Zone +
            "&ContactPerson=" + action.payload.ContactPerson +
            "&ContactOffice=" + action.payload.ContactOffice +
            "&Email=" + action.payload.Email +
            "&Note=" + action.payload.Note +
            "&ActiveInd=" + action.payload.ActiveInd +
            "&UID=" + action.payload.UID
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                // toast.success("New Zone is successfully added")
                return dispatch({ type: GitAction.ADDED_ZONE, payload: json });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.ADDED_ZONE, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Zone_AddZone")
          return dispatch({ type: GitAction.ADDED_ZONE, payload: [] });
        }
      }
    }));

  Zone_UpdateZone = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_ZONE), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Zone_UpdateZone?" +
            "Zone=" + action.payload.Zone +
            "&ZoneId=" + action.payload.ZoneId +
            "&ContactPerson=" + action.payload.ContactPerson +
            "&ContactOffice=" + action.payload.ContactOffice +
            "&Email=" + action.payload.Email +
            "&Note=" + action.payload.Note +
            "&ActiveInd=" + action.payload.ActiveInd +
            "&UID=" + action.payload.UID
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.UPDATED_ZONE, payload: json });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_ZONE, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Zone_UpdateZone")
          return dispatch({ type: GitAction.UPDATED_ZONE, payload: [] });
        }
      }
    }));

  Zone_DeleteZone = action$ =>
    action$.pipe(filter(action => action.type === GitAction.DELETE_ZONE), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Zone_DeleteZone?" +
            "ZoneId=" + action.payload.ZoneId +
            "&UID=" + action.payload.UID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.DELETED_ZONE, payload: json });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.DELETED_ZONE, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Zone_DeleteZone")
          return dispatch({ type: GitAction.DELETED_ZONE, payload: [] });
        }
      }
    }));

  Zone_UpdateZoneStatus = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_ZONESTATUS), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Zone_UpdateZoneStatus?" +
            "ZoneId=" + action.payload.ZoneId +
            "&ActiveInd=" + action.payload.ActiveInd +
            "&UID=" + action.payload.UID
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.UPDATED_ZONESTATUS, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_ZONESTATUS, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Zone_UpdateZoneStatus")
          return dispatch({ type: GitAction.UPDATED_ZONESTATUS, payload: [] });
        }
      }
    }));

  Parliament_ViewParliament = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_PARLIAMENT), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Parliament_ViewParliament?" +
            "ZoneId=" + action.payload.ZoneId
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.VIEWED_PARLIAMENT, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_PARLIAMENT, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Parliament_ViewParliament")
          return dispatch({ type: GitAction.VIEWED_PARLIAMENT, payload: [] });
        }
      }
    }));

  Parliament_ViewParliamentByUserID = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_PARLIAMENTBYUSERID), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Parliament_ViewParliamentByUserID?" +
            "USERID=" + action.payload.UserID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.VIEWED_PARLIAMENT, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_PARLIAMENTBYUSERID, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Parliament_ViewParliament")
          return dispatch({ type: GitAction.VIEWED_PARLIAMENTBYUSERID, payload: [] });
        }
      }
    }));


  Parliament_AddParliament = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ADD_PARLIAMENT), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Parliament_AddParliament?" +
            "ZoneId=" + action.payload.ZoneId +
            "&ParliamentCode=" + action.payload.ParliamentCode +
            "&ParliamentName=" + action.payload.ParliamentName +
            "&Note=" + action.payload.Note +
            "&ActiveInd=" + action.payload.ActiveInd +
            "&UID=" + action.payload.UID
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.ADDED_PARLIAMENT, payload: json });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.ADDED_PARLIAMENT, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Parliament_AddParliament")
          return dispatch({ type: GitAction.ADDED_PARLIAMENT, payload: [] });
        }
      }
    }));

  Parliament_UpdateParliament = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_PARLIAMENT), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Parliament_UpdateParliament?" +
            "ParliamentId=" + action.payload.ParliamentId +
            "&ZoneId=" + action.payload.ZoneId +
            "&ParliamentCode=" + action.payload.ParliamentCode +
            "&ParliamentName=" + action.payload.ParliamentName +
            "&Note=" + action.payload.Note +
            "&ActiveInd=" + action.payload.ActiveInd +
            "&UID=" + action.payload.UID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.UPDATED_PARLIAMENT, payload: json });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_PARLIAMENT, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Parliament_UpdateParliament")
          return dispatch({ type: GitAction.UPDATED_PARLIAMENT, payload: [] });
        }
      }
    }));

  Parliament_DeleteParliament = action$ =>
    action$.pipe(filter(action => action.type === GitAction.DELETE_PARLIAMENT), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Parliament_DeleteParliament?" +
            "ParliamentId=" + action.payload.ParliamentId +
            "&UID=" + action.payload.UID
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.DELETED_PARLIAMENT, payload: json });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.DELETED_PARLIAMENT, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Parliament_DeleteParliament")
          return dispatch({ type: GitAction.DELETED_PARLIAMENT, payload: [] });
        }
      }
    }));

  Parliament_UpdateParliamentStatus = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_PARLIAMENTSTATUS), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Parliament_UpdateParliamentStatus?" +
            "ParliamentId=" + action.payload.ParliamentId +
            "&ActiveInd=" + action.payload.ActiveInd +
            "&UID=" + action.payload.UID
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.UPDATED_PARLIAMENTSTATUS, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_PARLIAMENTSTATUS, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Parliament_UpdateParliamentStatus")
          return dispatch({ type: GitAction.UPDATED_PARLIAMENTSTATUS, payload: [] });
        }
      }
    }));

  Branch_ViewBranch = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_BRANCH), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Branch_ViewBranch?" +
            "PARLIAMENTID=" + action.payload.PARLIAMENTID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.VIEWED_BRANCH, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_BRANCH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Branch_ViewBranch")
          return dispatch({ type: GitAction.VIEWED_BRANCH, payload: [] });
        }
      }
    }));

  Branch_ViewAuthBranch = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_AUTH_BRANCH), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Branch_ViewAuthBranch?" +
            "userId=" + action.payload.userId
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.VIEWED_AUTH_BRANCH, payload: JSON.parse(json[0].ReturnData) });
              } else {
                return dispatch({ type: GitAction.VIEWED_AUTH_BRANCH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Branch_ViewAuthBranch")
          return dispatch({ type: GitAction.VIEWED_AUTH_BRANCH, payload: [] });
        }
      }
    }));

  Branch_AddBranch = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ADD_BRANCH), map(action => {
      return dispatch => {
        try {
          return fetch(
            url + "Branch_AddBranch?" +
            "ParliamentId=" + action.payload.ParliamentId +
            "&BranchCode=" + action.payload.BranchCode +
            "&BranchName=" + action.payload.BranchName +
            "&Note=" + action.payload.Note +
            "&ActiveInd=" + action.payload.ActiveInd +
            "&UID=" + action.payload.UID +
            "&SubBranchCode=" + action.payload.SubBranchCode +
            "&SubBranchName=" + action.payload.SubBranchName
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                toast.success(json[0].ReturnMsg)
                return dispatch({ type: GitAction.ADDED_BRANCH, payload: json });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.ADDED_BRANCH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Branch_AddedBranch")
          return dispatch({ type: GitAction.ADDED_BRANCH, payload: [] });
        }
      }
    }));

  Branch_UpdateBranch = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_BRANCH), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Branch_UpdateBranch?" +
            "BranchId=" + action.payload.BranchId +
            "&ParliamentId=" + action.payload.ParliamentId +
            "&BranchCode=" + action.payload.BranchCode +
            "&BranchName=" + action.payload.BranchName +
            "&Note=" + action.payload.Note +
            "&ActiveInd=" + action.payload.ActiveInd +
            "&UID=" + action.payload.UID
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.UPDATED_BRANCH, payload: json });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_BRANCH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Branch_UpdateBranch")
          return dispatch({ type: GitAction.UPDATED_BRANCH, payload: [] });
        }
      }
    }));


  Branch_DeleteBranch = action$ =>
    action$.pipe(filter(action => action.type === GitAction.DELETE_BRANCH), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Branch_DeleteBranch?" +
            "BranchId=" + action.payload.BranchId +
            "&UID=" + action.payload.UID
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.DELETED_BRANCH, payload: json });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.DELETED_BRANCH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Branch_DeleteBranch")
          return dispatch({ type: GitAction.DELETED_BRANCH, payload: [] });
        }
      }
    }));

  Branch_UpdateBranchStatus = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_BRANCHSTATUS), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Branch_UpdateBranchStatus?" +
            "BranchId=" + action.payload.BranchId +
            "&ActiveInd=" + action.payload.ActiveInd +
            "&UID=" + action.payload.UID
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.UPDATED_BRANCHSTATUS, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_BRANCHSTATUS, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Branch_UpdateBranchStatus")
          return dispatch({ type: GitAction.UPDATED_BRANCHSTATUS, payload: [] });
        }
      }
    }));

  Branch_AddSubBranch = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ADD_SUB_BRANCH), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Branch_AddSubBranch?" +
            "BranchId=" + action.payload.BranchId +
            "&SubBranchCode=" + action.payload.Sub_BranchCode +
            "&SubBranchName=" + action.payload.Sub_BranchName +
            "&UID=" + action.payload.U_id
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.ADDED_SUB_BRANCH, payload: json });
              } else {
                toast.error(json[0].ReturnSqlError)
                return dispatch({ type: GitAction.ADDED_SUB_BRANCH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Branch_Added_Sub_Branch")
          return dispatch({ type: GitAction.ADDED_SUB_BRANCH, payload: [] });
        }
      }
    }));


  Branch_ViewSub_Branch = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_SUB_BRANCH), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Branch_ViewSubBranch?" +
            "BRANCHID=" + action.payload.BRANCHID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.VIEWED_SUB_BRANCH, payload: JSON.parse(json[0].ReturnData) });
              } else {
                return dispatch({ type: GitAction.VIEWED_SUB_BRANCH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Branch_ViewSubBranch")
          return dispatch({ type: GitAction.VIEWED_SUB_BRANCH, payload: [] });
        }
      }
    }));



  Branch_UpdateSub_Branch = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_SUB_BRANCH), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Branch_AddUpdateSubBranch?" +
            "SubBranchId=" + action.payload.SubBranchId +
            "&BranchId=" + action.payload.BranchId +
            "&ParliamentId=" + action.payload.ParliamentId +
            "&SubBranchCode=" + action.payload.SubBranchCode +
            "&SubBranchName=" + action.payload.SubBranchName +
            "&UID=" + action.payload.UID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.UPDATED_SUB_BRANCH, payload: json });
              } else {

                return dispatch({ type: GitAction.UPDATED_SUB_BRANCH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Update Sub Branch")
          return dispatch({ type: GitAction.UPDATED_SUB_BRANCH, payload: [] });
        }
      }
    }));

  Branch_DeleteSubBranch = action$ =>
    action$.pipe(filter(action => action.type === GitAction.DELETE_SUB_BRANCH), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Branch_DeleteSubBranch?" +
            "SubBranchId=" + action.payload.SubBranchId +
            "&UID=" + action.payload.UID
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.DELETED_SUB_BRANCH, payload: json });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.DELETED_SUB_BRANCH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Branch_Delete_Sub_Branch")
          return dispatch({ type: GitAction.DELETED_SUB_BRANCH, payload: [] });
        }
      }
    }));

  Branch_Update_SubBranchStatus = action$ =>
    action$.pipe(filter(action => action.type === GitAction.UPDATE_SUBBRANCHSTATUS), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_SetUserDataControlSubBranch?" +
            "UserId=" + action.payload.UserId +
            "&ParliamentId=" + action.payload.ParliamentId +
            "&BranchId=" + action.payload.BranchId +
            "&SubBranchId=" + action.payload.SubBranchId +
            "&AuthorizedEnable=" + action.payload.AuthorizedEnable +
            "&UID=" + action.payload.UID
          )

            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.UPDATED_SUBBRANCHSTATUS, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.UPDATED_SUBBRANCHSTATUS, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Branch_UpdateSubBranchStatus")
          return dispatch({ type: GitAction.UPDATED_SUBBRANCHSTATUS, payload: [] });
        }
      }
    }));

  Branch_ViewAuthSubBranch = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_AUTH_SUBBRANCH), map(action => {
      return dispatch => {
        try {

          return fetch(url + "Branch_ViewAuthSubBranch?" +
            "userId=" + action.payload.userId
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.VIEWED_AUTH_SUBBRANCH, payload: JSON.parse(json[0].ReturnData) });
              } else {
                return dispatch({ type: GitAction.VIEWED_AUTH_SUBBRANCH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Branch_ViewAuthSubBranch")
          return dispatch({ type: GitAction.VIEWED_AUTH_SUBBRANCH, payload: [] });
        }
      }
    }));


  Member_ViewMemberStatus = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_MEMBERSTATUS), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_ViewMemberStatus?USERTYPEID=" + action.payload.USERTYPEID)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.VIEWED_MEMBERSTATUS, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_MEMBERSTATUS, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_ViewMemberStatus")
          return dispatch({ type: GitAction.VIEWED_MEMBERSTATUS, payload: [] });
        }
      }
    }));

  Member_GetMemberList = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_MEMBERLIST), map(action => {
      return dispatch => {

        try {
          return fetch(
            url + "Member_GetMemberList" +
            "?Filter=" + action.payload.Filter +
            "&MemberStatusId=" + action.payload.MemberStatusId +
            "&BranchCode=" + action.payload.BranchCode +
            "&keyword=" + action.payload.keyword +
            "&isFilterByPayment=" + action.payload.isFilterByPayment +
            "&UID=" + action.payload.UID +
            "&pagination=" + action.payload.pagination +
            "&pageNumber=" + action.payload.pageNumber
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.VIEWED_MEMBERLIST, payload: json });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_MEMBERLIST, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_GetMemberList")
          return dispatch({ type: GitAction.VIEWED_MEMBERLIST, payload: [] });
        }
      }
    }));

  Member_GetMemberArchiveList = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_MEMBERARCHIVELIST), map(action => {
      return dispatch => {
        try {
          return fetch(
            url + "Member_GetMemberArchiveList" +
            "?Filter=" + action.payload.Filter +
            "&MemberStatusId=" + action.payload.MemberStatusId +
            "&UID=" + action.payload.UID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.VIEWED_MEMBERARCHIVELIST, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_MEMBERARCHIVELIST, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_GetMemberList")
          return dispatch({ type: GitAction.VIEWED_MEMBERARCHIVELIST, payload: [] });
        }
      }
    }));

  Member_CheckMemberApplicant = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_MEMBERAPPLICANT), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_MemberCheckApplicant?"
            + "MEMBERNRIC=" + action.payload.MemberNRIC
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal == 1) {
                return dispatch({ type: GitAction.VIEWED_MEMBERAPPLICANT, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_MEMBERAPPLICANT, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: User_DeletePage")
          return dispatch({ type: GitAction.VIEWED_MEMBERAPPLICANT, payload: [] });
        }
      }
    }));

  Report_Dashboard = action$ =>
    action$.pipe(filter(action => action.type === GitAction.FETCH_DASHBOARD_SUMMARY), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Report_Dashboard?USERID=" + action.payload.UserId)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)

              if (json[0].ReturnVal === "1") {
                return dispatch({ type: GitAction.DASHBOARD_SUMMARY_FETCHED, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.DASHBOARD_SUMMARY_FETCHED, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Report_Dashboard")
          return dispatch({ type: GitAction.DASHBOARD_SUMMARY_FETCHED, payload: [] });
        }
      }
    }));

  Report_DashboardCard = action$ =>
    action$.pipe(filter(action => action.type === GitAction.FETCH_DASHBOARDCARD_SUMMARY), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Report_DashboardCard?USERID=" + action.payload.UserId)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.DASHBOARDCARD_SUMMARY_FETCHED, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.DASHBOARDCARD_SUMMARY_FETCHED, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Report_Dashboard")
          return dispatch({ type: GitAction.DASHBOARDCARD_SUMMARY_FETCHED, payload: [] });
        }
      }
    }));

  Member_ViewOccupationType = action$ =>
    action$.pipe(filter(action => action.type === GitAction.FETCH_MEMBER_OCCUPATION_TYPE), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_ViewOccupationType")
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.MEMBER_OCCUPATION_TYPE_FETCHED, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error('FETCH_MEMBER_OCCUPATION_TYPE', json[0].ReturnMsg)
                return dispatch({ type: GitAction.MEMBER_OCCUPATION_TYPE_FETCHED, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_ViewOccupationType")
          return dispatch({ type: GitAction.MEMBER_OCCUPATION_TYPE_FETCHED, payload: [] });
        }
      }
    }));

  Member_ViewReligion = action$ =>
    action$.pipe(filter(action => action.type === GitAction.FETCH_MEMBER_VIEW_RELIGION), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_ViewReligion")
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.MEMBER_VIEW_RELIGION_FETCHED, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.MEMBER_VIEW_RELIGION_FETCHED, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_ViewReligion")
          return dispatch({ type: GitAction.MEMBER_VIEW_RELIGION_FETCHED, payload: [] });
        }
      }
    }));

  Member_ViewEthnic = action$ =>
    action$.pipe(filter(action => action.type === GitAction.FETCH_MEMBER_VIEW_ETHNIC), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_ViewEthnic")
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.MEMBER_VIEW_ETHNIC_FETCHED, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.MEMBER_VIEW_ETHNIC_FETCHED, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_ViewEthnic")
          return dispatch({ type: GitAction.MEMBER_VIEW_ETHNIC_FETCHED, payload: [] });
        }
      }
    }));

  Member_ViewPosition = action$ =>
    action$.pipe(filter(action => action.type === GitAction.FETCH_MEMBER_VIEW_POSITION), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_ViewPosition")
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.MEMBER_VIEW_POSITION_FETCHED, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.MEMBER_VIEW_POSITION_FETCHED, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_ViewPosition")
          return dispatch({ type: GitAction.MEMBER_VIEW_POSITION_FETCHED, payload: [] });
        }
      }
    }));


  Member_AddMember = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ADD_MEMBER), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_AddMember" +
            "?UID=" + action.payload.UID +
            "&BRANCHID=" + action.payload.selectedBranch +
            "&SUBBRANCHID=" + action.payload.selected_SubBranch +
            "&MEMBERNAME=" + action.payload.MemberName +
            "&MEMBERCHINESENAME=" + action.payload.MandarinName +
            "&MEMBERMARRIAGESTATUS=" + action.payload.MaritalStatus +
            "&MEMBERNRIC=" + action.payload.NRIC +
            "&MEMBEROLDNRIC=" + action.payload.OldNRIC +
            "&MEMBERDOB=" + action.payload.DateofBirth +
            "&MEMBERPLACEOFBIRTH=" + action.payload.PlaceofBirth +
            "&MEMBEREDUCATIONLEVEL=" + action.payload.Education +
            "&MEMBERGENDER=" + action.payload.sex +
            "&MEMBERETHNICID=" + action.payload.EthnicId +
            "&MEMBERETHNIC=" + action.payload.Ethnic +
            "&MEMBEROCCUPATIONID=" + action.payload.Occupation +
            "&MEMBEREMAIL=" + action.payload.Email +
            "&MEMBERADDRESS=" + action.payload.ResidentialAddress +
            "&MEMBERRESIDENTALADDRESS=" + action.payload.CurrentAddress +
            "&MEMBERCONTACT=" + action.payload.ContactNumber +
            "&MEMBERCATEGORYID=" + action.payload.MEMBERCATEGORYID +
            "&PROFILEPHOTO=" + action.payload.ProfilePhotoName +
            "&MEMBERNRICFRONT=" + action.payload.ICFrontName +
            "&MEMBERNRICBACK=" + action.payload.ICBackName +
            "&MEMBERSUBSCRIPTIONMETHODID=" + action.payload.Subscription +
            "&PROPOSEID=" + action.payload.proposerNumber +
            "&PROPOSEDNAME=" + action.payload.proposerName +
            "&PROPOSEDCONTACT=" + action.payload.proposerContact +
            "&PROPOSEDNRIC=" + '-' +
            "&SECONDERID=" + action.payload.seconderNumber +
            "&SECONDERNAME=" + action.payload.seconderName +
            "&SECONDERCONTACT=" + action.payload.seconderContact +
            "&SECONDERNRIC=" + '-'
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                toast.success(json[0].ReturnMsg, {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: 1,
                })
                return dispatch({ type: GitAction.ADDED_MEMBER, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.ADDED_MEMBER, payload: ["IC duplicates"] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_AddMember")
          return dispatch({ type: GitAction.ADDED_MEMBER, payload: [] });
        }
      }
    }));

  Member_EditMember = action$ =>
    action$.pipe(filter(action => action.type === GitAction.EDIT_MEMBER), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_EditMember" +
            "?UID=" + action.payload.UID +
            "&MEMBERID=" + action.payload.MEMBERID +
            "&MEMBERNUMBER=" + action.payload.MEMBERNUMBER +
            "&BRANCHID=" + action.payload.BRANCHID +
            "&SUBBRANCHID=" + action.payload.SUBBRANCHID +
            "&MEMBERNAME=" + action.payload.MEMBERNAME +
            "&MEMBERCHINESENAME=" + action.payload.MEMBERCHINESENAME +
            "&MEMBERMARRIAGESTATUS=" + action.payload.MEMBERMARRIAGESTATUS +
            "&MEMBERNRIC=" + action.payload.MEMBERNRIC +
            "&MEMBEROLDNRIC=" + action.payload.MEMBEROLDNRIC +
            "&MEMBERDOB=" + action.payload.MEMBERDOB +
            "&MEMBERPLACEOFBIRTH=" + action.payload.MEMBERPLACEOFBIRTH +
            "&MEMBEREDUCATIONLEVEL=" + action.payload.MEMBEREDUCATIONLEVEL +
            "&MEMBERGENDER=" + action.payload.MEMBERGENDER +
            "&MEMBERETHNICID=" + action.payload.MEMBERETHNICID +
            "&MEMBEROCCUPATIONID=" + action.payload.MEMBEROCCUPATIONID +
            "&MEMBEREMAIL=" + action.payload.MEMBEREMAIL +
            "&MEMBERADDRESS=" + action.payload.MEMBERADDRESS +
            "&MEMBERRESIDENTALADDRESS=" + action.payload.MEMBERRESIDENTALADDRESS +
            "&MEMBERCONTACT=" + action.payload.MEMBERCONTACT +
            "&MEMBERCATEGORYID=" + action.payload.MEMBERCATEGORYID +
            "&PROFILEPHOTO=" + action.payload.EDITPROFILEPHOTO +
            "&MEMBERNRICFRONT=" + action.payload.EDITMEMBERNRICFRONT +
            "&MEMBERNRICBACK=" + action.payload.EDITMEMBERNRICBACK +
            "&MEMBERSUBSCRIPTIONMETHODID=" + action.payload.MEMBERSUBSCRIPTIONMETHODID +
            "&PROPOSEID=" + action.payload.PROPOSEID +
            "&PROPOSEDNAME=" + action.payload.PROPOSEDNAME +
            "&PROPOSEDCONTACT=" + action.payload.PROPOSEDCONTACT +
            "&PROPOSEDNRIC=" + action.payload.PROPOSEDNRIC +
            "&SECONDERID=" + action.payload.SECONDERID +
            "&SECONDERNAME=" + action.payload.SECONDERNAME +
            "&SECONDERCONTACT=" + action.payload.SECONDERCONTACT +
            "&SECONDERNRIC=" + action.payload.SECONDERNRIC +
            "&MEMBERSTATUSID=" + action.payload.MEMBERSTATUSID +
            "&PARLIAMENTID=" + action.payload.PARLIAMENTID +
            "&PROPOSENUMBER=" + action.payload.PROPOSENUMBER +
            "&SECONDERNUMBER=" + action.payload.SECONDERNUMBER +
            "&DECLARATIONCHECK=" + action.payload.DECLARATIONCHECK
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                toast.success(json[0].ReturnMsg)
                return dispatch({ type: GitAction.EDITED_MEMBER, payload: json[0] });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.EDITED_MEMBER, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_EditMember")
          return dispatch({ type: GitAction.EDITED_MEMBER, payload: [] });
        }
      }
    }));

  Member_ViewMemberProposedPerson = action$ =>
    action$.pipe(filter(action => action.type === GitAction.VIEW_MEMBER_PROPOSED_PERSON), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_ViewMemberProposedPerson")
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.VIEWED_MEMBER_PROPOSED_PERSON, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.VIEWED_MEMBER_PROPOSED_PERSON, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_ViewMemberProposedPerson")
          return dispatch({ type: GitAction.VIEWED_MEMBER_PROPOSED_PERSON, payload: [] });
        }
      }
    }));

  Member_EndorseMembershipAndDetail = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ENDORSE_MEMBERSHIP_WITH_DETAILS), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_EndorseMembershipAndDetail" +
            "?MEMBERID=" + action.payload.MEMBERID +
            "&BRANCHID=" + action.payload.BRANCHID +
            "&SUBBRANCHID=" + action.payload.SUBBRANCHID +
            "&MEMBERNAME=" + action.payload.MEMBERNAME +
            "&MEMBERNUMBER=" + action.payload.MEMBERNUMBER +
            "&MEMBERCHINESENAME=" + action.payload.MEMBERCHINESENAME +
            "&MEMBERMARRIAGESTATUS=" + action.payload.MEMBERMARRIAGESTATUS +
            "&MEMBERNRIC=" + action.payload.MEMBERNRIC +
            "&MEMBEROLDNRIC=" + action.payload.MEMBEROLDNRIC +
            "&MEMBERDOB=" + action.payload.MEMBERDOB +
            "&MEMBERPLACEOFBIRTH=" + action.payload.MEMBERPLACEOFBIRTH +
            "&MEMBEREDUCATIONLEVEL=" + action.payload.MEMBEREDUCATIONLEVEL +
            "&MEMBERGENDER=" + action.payload.MEMBERGENDER +
            "&MEMBERETHNICID=" + action.payload.MEMBERETHNICID +
            "&MEMBEROCCUPATIONID=" + action.payload.MEMBEROCCUPATIONID +
            "&MEMBEREMAIL=" + action.payload.MEMBEREMAIL +
            "&MEMBERADDRESS=" + action.payload.MEMBERADDRESS +
            "&MEMBERRESIDENTALADDRESS=" + action.payload.MEMBERRESIDENTALADDRESS +
            "&MEMBERCONTACT=" + action.payload.MEMBERCONTACT +
            "&MEMBERCATEGORYID=" + action.payload.MEMBERCATEGORYID +
            "&PROFILEPHOTO=" + action.payload.PROFILEPHOTO +
            "&MEMBERNRICFRONT=" + action.payload.MEMBERNRICFRONT +
            "&MEMBERNRICBACK=" + action.payload.MEMBERNRICBACK +
            "&MEMBERSUBSCRIPTIONMETHODID=" + action.payload.MEMBERSUBSCRIPTIONMETHODID +
            "&PROPOSEID=" + action.payload.PROPOSEID +
            "&PROPOSEDNAME=" + action.payload.PROPOSEDNAME +
            "&PROPOSEDCONTACT=" + action.payload.PROPOSEDCONTACT +
            "&PROPOSEDNRIC=" + action.payload.PROPOSEDNRIC +
            "&SECONDERID=" + action.payload.SECONDERID +
            "&SECONDERNAME=" + action.payload.SECONDERNAME +
            "&SECONDERCONTACT=" + action.payload.SECONDERCONTACT +
            "&SECONDERNRIC=" + action.payload.SECONDERNRIC +
            "&MEMBERSTATUSID=" + action.payload.MEMBERSTATUSID +
            "&UID=" + action.payload.UID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                toast.success(json[0].ReturnMsg)
                return dispatch({ type: GitAction.MEMBERSHIP_WITH_DETAILS_ENDORSED, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.MEMBERSHIP_WITH_DETAILS_ENDORSED, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_EndorseMembershipAndDetail")
          return dispatch({ type: GitAction.MEMBERSHIP_WITH_DETAILS_ENDORSED, payload: [] });
        }
      }
    }));

  Member_EndorseMembership = action$ => // update deceased (12), expelled (13), resigned (14)
    action$.pipe(filter(action => action.type === GitAction.ENDORSE_MEMBERSHIP_WITH_STATUS), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_EndorseMembership" +
            "?MEMBERID=" + action.payload.MEMBERID +
            "&MEMBERSTATUSID=" + action.payload.MEMBERSTATUSID +
            "&REASONREJECTED=" + action.payload.ReasonRejected +
            "&UID=" + action.payload.UID
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.MEMBERSHIP_WITH_STATUS_ENDORSED, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.MEMBERSHIP_WITH_STATUS_ENDORSED, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_EndorseMembership")
          return dispatch({ type: GitAction.MEMBERSHIP_WITH_STATUS_ENDORSED, payload: [] });
        }
      }
    }));

  Member_DeleteMember = action$ =>
    action$.pipe(filter(action => action.type === GitAction.DELETE_MEMBERSHIP_WITH_STATUS), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_DeleteMember" +
            "?MEMBERID=" + action.payload.memberId +
            "&UID=" + action.payload.uId
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.MEMBERSHIP_WITH_STATUS_DELETED, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.MEMBERSHIP_WITH_STATUS_DELETED, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_EndorseMembership")
          return dispatch({ type: GitAction.MEMBERSHIP_WITH_STATUS_DELETED, payload: [] });
        }
      }
    }));

  Member_UpdateMemberPayment = action$ =>
    action$.pipe(filter(action => action.type === GitAction.MAKE_PAYMENT_MEMBERSHIP), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Member_UpdateMemberPayment" +
            "?MEMBERID=" + action.payload.memberId +
            "&MEMBERPAYMENTSTATUSID=" + action.payload.paymentStatusId +
            "&MEMBERPAYMENTRECEIPT=" + action.payload.paymentReceipt +
            "&UID=" + action.payload.uId
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                toast.success(json[0].ReturnMsg)
                return dispatch({ type: GitAction.PAYMENT_MEMBERSHIP_MADE, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.PAYMENT_MEMBERSHIP_MADE, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_UpdateMemberPayment")
          return dispatch({ type: GitAction.PAYMENT_MEMBERSHIP_MADE, payload: [] });
        }
      }
    }));

  Member_BranchTransfer = action$ =>
    action$.pipe(filter(action => action.type === GitAction.MEMBER_BRANCH_TRANSFER), map(action => {
      return dispatch => {
        try {
          return fetch(
            url + "Member_BranchTransfer" +
            "?MEMBERID=" + action.payload.memberId +
            "&NEWBRANCHID=" + action.payload.newBranchId +
            "&NEWBRANCHCODE=" + action.payload.newBranchCode +
            "&NEWBRANCHNAME=" + action.payload.newBranchName +
            "&UID=" + action.payload.userId
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                toast.success(json[0].ReturnMsg)
                return dispatch({ type: GitAction.MEMBER_BRANCH_TRANSFERRED, payload: JSON.parse(json[0].ReturnData) });
              } else {
                toast.error(json[0].ReturnMsg)
                return dispatch({ type: GitAction.MEMBER_BRANCH_TRANSFERRED, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_BranchTransfer")
          return dispatch({ type: GitAction.MEMBER_BRANCH_TRANSFERRED, payload: [] });
        }
      }
    }));

  Member_GetMemberPreviousBranches = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GET_MEMBER_PREV_BRANCH), map(action => {
      return dispatch => {
        try {
          return fetch(
            url + "Member_GetMemberPreviousBranches" +
            "?MEMBERNAME=" + action.payload.memberName +
            "&MEMBERNRIC=" + action.payload.memberNric
          )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              if (json[0].ReturnVal === 1) {
                return dispatch({ type: GitAction.GOT_MEMBER_PREV_BRANCH, payload: JSON.parse(json[0].ReturnData) });
              } else {
                return dispatch({ type: GitAction.GOT_MEMBER_PREV_BRANCH, payload: [] });
              }
            });
        } catch (error) {
          toast.error("Error Code: Member_GetMemberPreviousBranches")
          return dispatch({ type: GitAction.GOT_MEMBER_PREV_BRANCH, payload: [] });
        }
      }
    }));

  Notification_ViewNotification = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GetNotification), map(action => {
      console.log('something')

      return dispatch => {
        console.log(url + "Notification_ViewNotification")
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
import { GitAction } from "../action/gitAction";

const INITIAL_STATE = {
  loading: false,
  logonUser: [],
  userUpdateReturnValue: [],
  viewNotification: [],
  parcelStatus: [],
};

export function counterReducer(state = INITIAL_STATE, action) {
  ///////////////////////////////////////////////////  General ///////////////////////////////////////////////////
  switch (action.type) {
    ////////////////////////////////////////////////////// User ///////////////////////////////////////////////////

    case GitAction.Login:
      return Object.assign({}, state, { loading: true });
    case GitAction.LoginSuccess:
      return Object.assign({}, state, {
        loading: false,
        logonUser: action.payload
      });

    case GitAction.Logout:
      return Object.assign({}, state, { loading: true });
    case GitAction.LoggedOutSuccess:
      return Object.assign({}, state, {
        loading: false,
        logonUser: action.payload
      });

    case GitAction.ClearLogonUser:
      return Object.assign({}, state, {
        loading: false,
        logonUser: []
      });

    case GitAction.UpdateUserAccountPassword:
      return Object.assign({}, state, { loading: true });
    case GitAction.UserAccountPasswordUpdated:
      return Object.assign({}, state, {
        loading: false,
        userUpdateReturnValue: action.payload
      });

    case GitAction.RegisterUser:
      return Object.assign({}, state, { loading: true });
    case GitAction.UserRegistered:
      return Object.assign({}, state, {
        loading: false,
        userUpdateReturnValue: action.payload
      });

    case GitAction.ResetUserUpdateReturnValue:
      return Object.assign({}, state, {
        loading: false,
        userUpdateReturnValue: []
      });

    ////////////////////////////////////////////////////// User ///////////////////////////////////////////////////
    case GitAction.GetNotification:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotNotification:
      return Object.assign({}, state, {
        loading: false,
        viewNotification: action.payload
      });

    case GitAction.GetParcelStatus:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotParcelStatus:
      return Object.assign({}, state, {
        loading: false,
        parcelStatus: action.payload
      });

    /////////////////////////////////////////////////// Default ///////////////////////////////////////////////////
    default:
      return state;
  }
}
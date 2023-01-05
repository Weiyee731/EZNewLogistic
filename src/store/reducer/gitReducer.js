import { GitAction } from "../action/gitAction";

const INITIAL_STATE = {
  loading: false,
  logonUser: [],
  userUpdateReturnValue: [],
  viewNotification: [],
  areaCodes: [],
  parcelStatus: [],
  setting: [],
  userProfile: [],
  resetPassword: [],
  commission: []
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

    case GitAction.ForgetPassword:
      return Object.assign({}, state, { loading: true });
    case GitAction.ForgotPassword:
      return Object.assign({}, state, {
        loading: false,
        resetPassword: action.payload
      });

    case GitAction.ClearForgetPassword:
      return Object.assign({}, state, {
        loading: false,
        resetPassword: []
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


    case GitAction.UpdatePassword:
      return Object.assign({}, state, { loading: true });
    case GitAction.PasswordUpdated:
      return Object.assign({}, state, {
        loading: false,
        userUpdateReturnValue: action.payload
      });

    case GitAction.ResetUserUpdateReturnValue:
      return Object.assign({}, state, {
        loading: false,
        userUpdateReturnValue: []
      });

    case GitAction.FetchUserAreaCode:
      return Object.assign({}, state, { loading: true });
    case GitAction.UserAreaCodeFetched:
      return Object.assign({}, state, {
        loading: false,
        areaCodes: action.payload
      });

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

    case GitAction.FetchUserProfileByID:
      return Object.assign({}, state, { loading: true });
    case GitAction.UserProfileByIDFetched:
      return Object.assign({}, state, {
        loading: false,
        userProfile: action.payload
      });

    case GitAction.GetParcelStatus2:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotParcelStatus2:
      return Object.assign({}, state, {
        loading: false,
        parcelStatus: action.payload
      });

    case GitAction.GetGeneralSetting:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotGeneralSetting:
      return Object.assign({}, state, {
        loading: false,
        setting: action.payload
      });

    case GitAction.UpdateUserProfile:
      return Object.assign({}, state, { loading: true });
    case GitAction.UserProfileUpdated:
      return Object.assign({}, state, {
        loading: false,
        userUpdateReturnValue: action.payload
      });
    case GitAction.ResetUserProfile:
      return Object.assign({}, state, {
        loading: false,
        userProfile: []
      });

    case GitAction.User_ViewCommissionList:
      return Object.assign({}, state, { loading: true });
    case GitAction.User_ViewedCommissionList:
      return Object.assign({}, state, {
        loading: false,
        commission: action.payload
      });


    /////////////////////////////////////////////////// Default ///////////////////////////////////////////////////
    default:
      return state;
  }
}
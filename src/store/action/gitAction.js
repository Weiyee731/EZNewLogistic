export class GitAction {
  ///////////////////////////////////////////////////  user account credentials ///////////////////////////////////////////////////

  static Login = "USER_LOGIN";
  static LoginSuccess = "USER_LOGIN_SUCCESS";
  static CallUserLogin(propsData) {
    return {
      type: GitAction.Login,
      payload: propsData
    };
  }

  static Logout = "USER_LOGOUT";
  static LoggedOutSuccess = "USER_LOGGED_OUT_SUCCESS";
  static ClearLogonUser = "USER_CLEAR_CACHE";
  static CallUserLogout(propsData) {
    return {
      type: GitAction.Logout,
      payload: propsData
    };
  }

  static CallClearLogonUserCache() {
    return {
      type: GitAction.ClearLogonUser,
    };
  }

  static UpdateUserAccountPassword = "UPDATE_USER_ACCOUNT_PASSWORD";
  static UserAccountPasswordUpdated = "USER_ACCOUNT_PASSWORD_UPDATED";
  static CallUpdateUserAccountPassword() {
    return {
      type: GitAction.UpdateUserAccountPassword
    };
  }
  static ResetUserUpdateReturnValue = "RESET_USER_UPDATE_RETURN_VALUE";
  static CallResetUserUpdateReturnValue() {
    return {
      type: GitAction.ResetUserUpdateReturnValue
    };
  }

  static RegisterUser = "REGISTER_USER";
  static UserRegistered = "USER_REGISTERED";
  static CallRegisterUser(propsData) {
    return {
      type: GitAction.RegisterUser,
      payload: propsData
    };
  }

  static FetchUserAreaCode = "FETCH_USER_AREA_CODE";
  static UserAreaCodeFetched = "USER_AREA_CODE_FETCHED";
  static CallFetchUserAreaCode() {
    return {
      type: GitAction.FetchUserAreaCode
    };
  }

  static FetchUserProfileByID = "FETCH_USER_PROFILE_BY_ID";
  static UserProfileByIDFetched = "USER_PROFILE_BY_ID_FETCHED";
  static CallFetchUserProfileByID(propsData) {
    return {
      type: GitAction.UpdateUserAccountPassword,
      payload: propsData
    };
  }

  ///////////////////////////////////////////////////  sidebar configuration  ///////////////////////////////////////////////////

  static GetNotification = "GetNotification";
  static GotNotification = "GotNotification";
  static CallGetNotification(propsData) {
    return {
      type: GitAction.GetNotification,
      payload: propsData
    };
  }

  static GetParcelStatus = "GetParcelStatus";
  static GotParcelStatus = "GotParcelStatus";
  static CallGetParcelStatus(propsData) {
    return {
      type: GitAction.GetParcelStatus,
      payload: propsData
    };
  }

  static UpdatePassword = "UpdatePassword";
  static PasswordUpdated = "PasswordUpdated";
  static CallUpdatePassword(propsData) {
    return {
      type: GitAction.UpdatePassword,
      payload: propsData
    };
  }

  static GetParcelStatus2 = "GetParcelStatus2";
  static GotParcelStatus2 = "GotParcelStatus2";
  static CallGetParcelStatus2(propsData) {
    return {
      type: GitAction.GetParcelStatus2,
      payload: propsData
    };
  }

  static GetGeneralSetting = "GetGeneralSetting";
  static GotGeneralSetting = "GotGeneralSetting";
  static CallGetGeneralSetting(propsData) {
    return {
      type: GitAction.GetGeneralSetting,
      payload: propsData
    };
  }

}


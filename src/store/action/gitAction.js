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
  static CallRegisterUser() {
    return {
      type: GitAction.RegisterUser
    };
  }

  ///////////////////////////////////////////////////  sidebar configuration  ///////////////////////////////////////////////////

  static GetNotification = "GetNotification";
  static GotNotification = "GotNotification";
  static CallGetNotification() {

    return {
      type: GitAction.GetNotification,
    };
  }

}


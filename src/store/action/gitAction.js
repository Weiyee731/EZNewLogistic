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

  static RegisterUser_WithReferal = "REGISTER_USER_WITHREFERAL";
  static UserRegistered_WithReferal = "USER_REGISTERED_WITHREFERAL";
  static CallRegisterUser_WithReferal(propsData) {
    return {
      type: GitAction.RegisterUser_WithReferal,
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
      type: GitAction.FetchUserProfileByID,
      payload: propsData
    };
  }

  static UpdateUserProfile = "UPDATE_USER_PROFILE";
  static UserProfileUpdated = "USER_PROFILE_UPDATED";
  static CallUpdateUserProfile(propsData) {
    return {
      type: GitAction.UpdateUserProfile,
      payload: propsData
    };
  }

  static ResetUserProfile = "ResetUserProfile";
  static CallResetUserProfile() {
    return {
      type: GitAction.ResetUserProfile
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

  static GetParcelPrice = "USER_GET_PARCELPRICE";
  static GotParcelPrice = "USER_GOT_PARCELPRICE";
  static CallCalculateParcelPrice(propsData) {
    return {
      type: GitAction.GetParcelPrice,
      payload: propsData
    };
  }

  static ResetParcelPrice = "ResetParcelPrice";
  static CallResetParcelPrice() {
    return {
      type: GitAction.ResetParcelPrice
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


  static ForgetPassword = "ForgetPassword";
  static ForgotPassword = "ForgotPassword";
  static CallResetPassword(propsData) {
    return {
      type: GitAction.ForgetPassword,
      payload: propsData
    };
  }


  static ClearForgetPassword = "ClearForgetPassword";
  static CallClearForgetPassword() {
    return {
      type: GitAction.ClearForgetPassword,
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

  static ClearParcelStatus2 = "ClearParcelStatus2";
  static CallClearParcelStatus2() {
    return {
      type: GitAction.ClearParcelStatus2,
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

  static User_ViewCommissionList = "User_ViewCommissionList";
  static User_ViewedCommissionList = "User_ViewedCommissionList";
  static CallViewCommissionByUserCode(propsData) {
    return {
      type: GitAction.User_ViewCommissionList,
      payload: propsData
    };
  }


}


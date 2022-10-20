import { GitAction } from "../action/gitAction";

const INITIAL_STATE = {
  loading: false,
  Userrole: [],
  userLogin: [],
  Userstatus: [],
  logonUser: [],
  Userprofile: [],
  Userprofiles: [],
  Userpaymentmethod: [],
  notification: [],
  userpage: [],
  userpages: [],

  useraction: [],
  userlisting: [],
  userlistingWithDataControl: [],
  datacontrolaction: [],
  datacontrollisting: [],
  datacontrollistingwithauth: [],
  viewzone: [],
  addzone: [],
  updatezone: [],
  deletezone: [],
  deletezonestatus: [],
  viewparliament: [],
  viewparliamentbyID: [],
  addparliament: [],
  updateparliament: [],
  deleteparliament: [],
  updateparliamentstatus: [],
  viewbranch: [],
  addbranch: [],
  updatebranch: [],
  deletebranch: [],
  updatebranchstatus: [],
  add_subBranch: [],
  view_subBranch: [],
  update_SubBranch: [],
  update_SubBranchStatus: [],
  delete_SubBranch: [],
  memberStatus: [],
  memberList: [],
  memberArchiveList: [],
  dashboardSummary: [],
  dashboardSummarycard: [],
  memberOccupation: [],
  memberReligion: [],
  memberEthnic: [],
  memberPosition: [],
  addMember: [],
  updateMember: [],
  memberProposedPerson: [],
  endorsementReturn: [],
  deleteReturn: [],
  memberApplicationStatus: [],
  memberPayment: [],
  memberBranchTransfer: [],
  memberPrevBranch: [],
  viewAuthBranch: [],
  viewAuthSubBranch: [],
  updateUserListing: [],
  updateUserrole: []
};

export function counterReducer(state = INITIAL_STATE, action) {
  ///////////////////////////////////////////////////  General ///////////////////////////////////////////////////
  switch (action.type) {
    // /////////////////////////////////////////////////// User ///////////////////////////////////////////////////

    case GitAction.GET_USER_VIEWUSERROLE:
      return Object.assign({}, state, { loading: true });
    case GitAction.GOT_USER_VIEWUSERROLE:
      return Object.assign({}, state, {
        loading: false,
        Userrole: action.payload
      });

    case GitAction.UPDATE_USER_UPDATEUSERROLE:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_USER_UPDATEUSERROLE:
      return Object.assign({}, state, {
        loading: false,
        updateUserrole: action.payload
      });

    case GitAction.GET_USER_LOGIN:
      return Object.assign({}, state, { loading: true });
    case GitAction.GOT_USER_LOGIN:
      return Object.assign({}, state, {
        loading: false,
        userLogin: action.payload
      });

    case GitAction.GET_USER_VIEWPAGE:
      return Object.assign({}, state, { loading: true });
    case GitAction.GOT_USER_VIEWPAGE:
      return Object.assign({}, state, {
        loading: false,
        userpages: action.payload
      });

    case GitAction.GET_USER_VIEWPAGE_BY_ROLE:
      return Object.assign({}, state, { loading: true });
    case GitAction.GOT_USER_VIEWPAGE_BY_ROLE:
      return Object.assign({}, state, {
        loading: false,
        userpage: action.payload
      });

    case GitAction.ADD_USER_ADDPAGEACCESS:
      return Object.assign({}, state, { loading: true });
    case GitAction.ADDED_USER_ADDPAGEACCESS:
      return Object.assign({}, state, {
        loading: false,
        userpage: action.payload
      });

    case GitAction.ADD_USER_ADDPAGE:
      return Object.assign({}, state, { loading: true });
    case GitAction.ADDED_USER_ADDPAGE:
      return Object.assign({}, state, {
        loading: false,
        userpage: action.payload
      });

    case GitAction.DELETE_USER_DELETEPAGEACCESS:
      return Object.assign({}, state, { loading: true });
    case GitAction.DELETED_USER_DELETEPAGEACCESS:
      return Object.assign({}, state, {
        loading: false,
        userpage: action.payload
      });

    case GitAction.DELETE_USER_DELETEPAGE:
      return Object.assign({}, state, { loading: true });
    case GitAction.DELETED_USER_DELETEPAGE:
      return Object.assign({}, state, {
        loading: false,
        userpage: action.payload
      });

    ///////////////////////////////////////////////////  User Management  ///////////////////////////////////////////////////
    case GitAction.ADD_USER:
      return Object.assign({}, state, { loading: true });
    case GitAction.ADDED_USER:
      return Object.assign({}, state, {
        loading: false,
        useraction: action.payload
      });

    case GitAction.UPDATE_USER:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_USER:
      return Object.assign({}, state, {
        loading: false,
        updateUserListing: action.payload
      });


    case GitAction.UPDATE_USERPASSWORD:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_USERPASSWORD:
      return Object.assign({}, state, {
        loading: false,
        useraction: action.payload
      });

    case GitAction.DELETE_USER:
      return Object.assign({}, state, { loading: true });
    case GitAction.DELETED_USER:
      return Object.assign({}, state, {
        loading: false,
        useraction: action.payload
      });


    case GitAction.VIEW_USER:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_USER:
      return Object.assign({}, state, {
        loading: false,
        userlisting: action.payload
      });

    case GitAction.VIEW_USER_WITHDATACONTROL:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_USER_WITHDATACONTROL:
      return Object.assign({}, state, {
        loading: false,
        userlistingWithDataControl: action.payload
      });

    ///////////////////////////////////////////////////  User Data Control  ///////////////////////////////////////////////////


    case GitAction.UPDATE_DATACONTROL:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_DATACONTROL:
      return Object.assign({}, state, {
        loading: false,
        datacontrolaction: action.payload
      });

    case GitAction.VIEW_DATACONTROL:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_DATACONTROL:
      return Object.assign({}, state, {
        loading: false,
        datacontrollisting: action.payload
      });

    case GitAction.CLEAR_USERDATACONTROLLING:
      return Object.assign({}, state, { datacontrolaction: [], });

    case GitAction.VIEW_DATACONTROL_BYAUTH:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_DATACONTROL_BYAUTH:
      return Object.assign({}, state, {
        loading: false,
        datacontrollistingwithauth: action.payload
      });


    ////////////////////////////////////////////// Setting Access ///////////////////////////////////////////////////////////////////////

    case GitAction.VIEW_ZONE:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_ZONE:
      return Object.assign({}, state, {
        loading: false,
        viewzone: action.payload
      });

    case GitAction.ADD_ZONE:
      return Object.assign({}, state, { loading: true });
    case GitAction.ADDED_ZONE:
      return Object.assign({}, state, {
        loading: false,
        addzone: action.payload
      });

    case GitAction.CLEAR_ADDZONE:
      return Object.assign({}, state, { loading: true });
    case GitAction.CLEARED_ADDZONE:
      return Object.assign({}, state, {
        loading: false,
        addzone: []
      });

    case GitAction.UPDATE_ZONE:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_ZONE:
      return Object.assign({}, state, {
        loading: false,
        updatezone: action.payload
      });

    case GitAction.DELETE_ZONE:
      return Object.assign({}, state, { loading: true });
    case GitAction.DELETED_ZONE:
      return Object.assign({}, state, {
        loading: false,
        deletezone: action.payload
      });

    case GitAction.UPDATE_ZONESTATUS:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_ZONESTATUS:
      return Object.assign({}, state, {
        loading: false,
        updatezonestatus: action.payload
      });

    case GitAction.VIEW_PARLIAMENT:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_PARLIAMENT:
      return Object.assign({}, state, {
        loading: false,
        viewparliament: action.payload
      });

    case GitAction.VIEW_PARLIAMENTBYUSERID:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_PARLIAMENTBYUSERID:
      return Object.assign({}, state, {
        loading: false,
        viewparliament: action.payload
      });

    case GitAction.ADD_PARLIAMENT:
      return Object.assign({}, state, { loading: true });
    case GitAction.ADDED_PARLIAMENT:
      return Object.assign({}, state, {
        loading: false,
        addparliament: action.payload
      });

    case GitAction.UPDATE_PARLIAMENT:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_PARLIAMENT:
      return Object.assign({}, state, {
        loading: false,
        updateparliament: action.payload
      });

    case GitAction.DELETE_PARLIAMENT:
      return Object.assign({}, state, { loading: true });
    case GitAction.DELETED_PARLIAMENT:
      return Object.assign({}, state, {
        loading: false,
        deleteparliament: action.payload
      });

    case GitAction.UPDATE_PARLIAMENTSTATUS:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_PARLIAMENTSTATUS:
      return Object.assign({}, state, {
        loading: false,
        updateparliamentstatus: action.payload
      });

    case GitAction.VIEW_BRANCH:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_BRANCH:
      return Object.assign({}, state, {
        loading: false,
        viewbranch: action.payload
      });

    case GitAction.VIEW_AUTH_BRANCH:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_AUTH_BRANCH:
      return Object.assign({}, state, {
        loading: false,
        viewAuthBranch: action.payload
      });

    case GitAction.ADD_BRANCH:
      return Object.assign({}, state, { loading: true });
    case GitAction.ADDED_BRANCH:
      return Object.assign({}, state, {
        loading: false,
        addbranch: action.payload
      });

    case GitAction.UPDATE_BRANCH:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_BRANCH:
      return Object.assign({}, state, {
        loading: false,
        updatebranch: action.payload
      });

    case GitAction.DELETE_BRANCH:
      return Object.assign({}, state, { loading: true });
    case GitAction.DELETED_BRANCH:
      return Object.assign({}, state, {
        loading: false,
        deletebranch: action.payload
      });

    case GitAction.UPDATE_BRANCHSTATUS:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_BRANCHSTATUS:
      return Object.assign({}, state, {
        loading: false,
        updatebranchstatus: action.payload
      });


    case GitAction.ADD_SUB_BRANCH:
      return Object.assign({}, state, { loading: true });
    case GitAction.ADDED_SUB_BRANCH:
      return Object.assign({}, state, {
        loading: false,
        add_subBranch: action.payload
      });

    case GitAction.VIEW_SUB_BRANCH:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_SUB_BRANCH:
      return Object.assign({}, state, {
        loading: false,
        view_subBranch: action.payload
      });

    case GitAction.DELETE_SUB_BRANCH:
      return Object.assign({}, state, { loading: true });
    case GitAction.DELETED_SUB_BRANCH:
      return Object.assign({}, state, {
        loading: false,
        delete_SubBranch: action.payload
      });

    case GitAction.UPDATE_SUB_BRANCH:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_SUB_BRANCH:
      return Object.assign({}, state, {
        loading: false,
        update_SubBranch: action.payload
      });

    case GitAction.UPDATE_SUBBRANCHSTATUS:
      return Object.assign({}, state, { loading: true });
    case GitAction.UPDATED_SUBBRANCHSTATUS:
      return Object.assign({}, state, {
        loading: false,
        update_SubBranchStatus: action.payload
      });

    case GitAction.VIEW_AUTH_SUBBRANCH:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_AUTH_SUBBRANCH:
      return Object.assign({}, state, {
        loading: false,
        viewAuthSubBranch: action.payload
      });

    case GitAction.VIEW_MEMBERSTATUS:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_MEMBERSTATUS:
      return Object.assign({}, state, {
        loading: false,
        memberStatus: action.payload
      });

    case GitAction.VIEW_MEMBERLIST:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_MEMBERLIST:
      return Object.assign({}, state, {
        loading: false,
        memberList: action.payload
      });

    case GitAction.VIEW_MEMBERARCHIVELIST:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_MEMBERARCHIVELIST:
      return Object.assign({}, state, {
        loading: false,
        memberArchiveList: action.payload
      });

    case GitAction.VIEW_MEMBERAPPLICANT:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_MEMBERAPPLICANT:
      return Object.assign({}, state, {
        loading: false,
        memberApplicationStatus: action.payload
      });

    case GitAction.CLEAR_MEMBERAPPLICANT:
      return Object.assign({}, state, { loading: true });
    case GitAction.CLEARED_MEMBERAPPLICANT:
      return Object.assign({}, state, {
        loading: false,
        memberApplicationStatus: []
      });

    case GitAction.FETCH_DASHBOARD_SUMMARY:
      return Object.assign({}, state, { loading: true });
    case GitAction.DASHBOARD_SUMMARY_FETCHED:
      return Object.assign({}, state, {
        loading: false,
        dashboardSummary: action.payload
      });
    case GitAction.FETCH_DASHBOARDCARD_SUMMARY:
      return Object.assign({}, state, { loading: true });
    case GitAction.DASHBOARDCARD_SUMMARY_FETCHED:
      return Object.assign({}, state, {
        loading: false,
        dashboardSummarycard: action.payload
      });
    ////////////////////////Member///////////////////////////////////////////////

    case GitAction.FETCH_MEMBER_OCCUPATION_TYPE:
      return Object.assign({}, state, { loading: true });
    case GitAction.MEMBER_OCCUPATION_TYPE_FETCHED:
      return Object.assign({}, state, {
        loading: false,
        memberOccupation: action.payload
      });

    case GitAction.FETCH_MEMBER_VIEW_RELIGION:
      return Object.assign({}, state, { loading: true });
    case GitAction.MEMBER_VIEW_RELIGION_FETCHED:
      return Object.assign({}, state, {
        loading: false,
        memberReligion: action.payload
      });

    case GitAction.FETCH_MEMBER_VIEW_ETHNIC:
      return Object.assign({}, state, { loading: true });
    case GitAction.MEMBER_VIEW_ETHNIC_FETCHED:
      return Object.assign({}, state, {
        loading: false,
        memberEthnic: action.payload
      });

    case GitAction.FETCH_MEMBER_VIEW_POSITION:
      return Object.assign({}, state, { loading: true });
    case GitAction.MEMBER_VIEW_POSITION_FETCHED:
      return Object.assign({}, state, {
        loading: false,
        memberPosition: action.payload
      });

    case GitAction.ADD_MEMBER:
      return Object.assign({}, state, { loading: true });
    case GitAction.ADDED_MEMBER:
      return Object.assign({}, state, {
        loading: false,
        addMember: action.payload
      });


    case GitAction.EDIT_MEMBER:
      return Object.assign({}, state, { loading: true });
    case GitAction.EDITED_MEMBER:
      return Object.assign({}, state, {
        loading: false,
        updateMember: action.payload
      });

    case GitAction.VIEW_MEMBER_PROPOSED_PERSON:
      return Object.assign({}, state, { loading: true });
    case GitAction.VIEWED_MEMBER_PROPOSED_PERSON:
      return Object.assign({}, state, {
        loading: false,
        memberProposedPerson: action.payload
      });
    case GitAction.ENDORSE_MEMBERSHIP_WITH_DETAILS:
      return Object.assign({}, state, { loading: true });
    case GitAction.MEMBERSHIP_WITH_DETAILS_ENDORSED:
      return Object.assign({}, state, {
        loading: false,
        endorsementReturn: action.payload
      });
    case GitAction.ENDORSE_MEMBERSHIP_WITH_STATUS:
      return Object.assign({}, state, { loading: true });
    case GitAction.MEMBERSHIP_WITH_STATUS_ENDORSED:
      return Object.assign({}, state, {
        loading: false,
        endorsementReturn: action.payload
      });
    case GitAction.DELETE_MEMBERSHIP_WITH_STATUS:
      return Object.assign({}, state, { loading: true });
    case GitAction.MEMBERSHIP_WITH_STATUS_DELETED:
      return Object.assign({}, state, {
        loading: false,
        deleteReturn: action.payload
      });
    case GitAction.MAKE_PAYMENT_MEMBERSHIP:
      return Object.assign({}, state, { loading: true });
    case GitAction.PAYMENT_MEMBERSHIP_MADE:
      return Object.assign({}, state, {
        loading: false,
        memberPayment: action.payload
      });
    case GitAction.MEMBER_BRANCH_TRANSFER:
      return Object.assign({}, state, { loading: true });
    case GitAction.MEMBER_BRANCH_TRANSFERRED:
      return Object.assign({}, state, {
        loading: false,
        memberBranchTransfer: action.payload
      });

    case GitAction.GET_MEMBER_PREV_BRANCH:
      return Object.assign({}, state, { loading: true });
    case GitAction.GOT_MEMBER_PREV_BRANCH:
      return Object.assign({}, state, {
        loading: false,
        memberPrevBranch: action.payload
      });

    /////////////////////////////////////////////////// Default ///////////////////////////////////////////////////
    default:
      return state;
  }
}
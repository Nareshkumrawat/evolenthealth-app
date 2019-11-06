import * as types from "./types";
/**
 * @constant initialState
 * @description The initial state and data model for the reducer
 */

const initialState = {
  getAllUserDetails: {},
  getUserDetailsById: {},
  updateUserDetailsById: {},
  deleteUserDetailsById: {},
  addUserDetails: {},
  isLoadingAllContactDetails: false,
  isLoadingContactDetailsById: false,
  isLoadingUpdateContactDetailsById: false,
  isLoadingDeleteContactDetailsById: false,
  isLoadingInsertContactDetails: false,
  errorDesc: null
};
/**
 * Reducer for managing the state of a landing page
 */
function mycurdReducer(state = initialState, action) {
  switch (action.type) {
    case types.ALLCONTACT_DETAILS_LOADING:
      return {
        ...state,
        isLoadingAllContactDetails: true
      };
    case types.ALLCONTACT_DETAILS_SUCCESS:
      return {
        ...state,
        getAllUserDetails: action.data,
        isLoadingAllContactDetails: false,
        errorDesc: null
      };
    case types.ALLCONTACT_DETAILS_ERROR:
      return {
        ...state,
        isLoadingAllContactDetails: false,
        errorDesc: action.error
      };

    case types.CONTACT_DETAILS_ID_LOADING:
      return {
        ...state,
        isLoadingContactDetailsById: true
      };
    case types.CONTACT_DETAILS_ID_SUCCESS:
      return {
        ...state,
        getUserDetailsById: action.data,
        isLoadingContactDetailsById: false,
        errorDesc: null
      };
    case types.CONTACT_DETAILS_ID_ERROR:
      return {
        ...state,
        isLoadingContactDetailsById: false,
        errorDesc: action.error
      };

    case types.UPDATE_CONTACT_DETAILS_ID_LOADING:
      return {
        ...state,
        isLoadingUpdateContactDetailsById: true
      };
    case types.UPDATE_CONTACT_DETAILS_ID_SUCCESS:
      return {
        ...state,
        updateUserDetailsById: action.data,
        isLoadingUpdateContactDetailsById: false,
        errorDesc: null
      };
    case types.UPDATE_CONTACT_DETAILS_ID_ERROR:
      return {
        ...state,
        isLoadingUpdateContactDetailsById: false,
        errorDesc: action.error
      };

    case types.DELETE_CONTACT_DETAILS_ID_LOADING:
      return {
        ...state,
        isLoadingDeleteContactDetailsById: true
      };
    case types.DELETE_CONTACT_DETAILS_ID_SUCCESS:
      return {
        ...state,
        deleteUserDetailsById: action.data,
        isLoadingDeleteContactDetailsById: false,
        errorDesc: null
      };
    case types.DELETE_CONTACT_DETAILS_ID_ERROR:
      return {
        ...state,
        isLoadingDeleteContactDetailsById: false,
        errorDesc: action.error
      };

    case types.INSERT_CONTACT_DETAILS_LOADING:
      return {
        ...state,
        isLoadingInsertContactDetails: true
      };
    case types.INSERT_CONTACT_DETAILS_SUCCESS:
      return {
        ...state,
        addUserDetails: action.data,
        isLoadingInsertContactDetails: false,
        errorDesc: null
      };
    case types.INSERT_CONTACT_DETAILS_ERROR:
      return {
        ...state,
        isLoadingInsertContactDetails: false,
        errorDesc: action.error
      };

    default:
      return state;
  }
}

export default mycurdReducer;

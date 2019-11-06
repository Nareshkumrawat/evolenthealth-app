import * as types from "./types";
import ApiService from "../../api";
import { ApiConstants } from "../../constants";

export function setContactDetailsLoading() {
  return { type: types.ALLCONTACT_DETAILS_LOADING };
}

export function onContactDetailsError(error) {
  return { type: types.ALLCONTACT_DETAILS_ERROR, error };
}

export function onContactDetailsSuccess(data) {
  return { type: types.ALLCONTACT_DETAILS_SUCCESS, data };
}

export function setContactDetailsIdLoading() {
  return { type: types.CONTACT_DETAILS_ID_LOADING };
}

export function onContactDetailsIdError(error) {
  return { type: types.CONTACT_DETAILS_ID_ERROR, error };
}

export function onContactDetailsIdSuccess(data) {
  return { type: types.CONTACT_DETAILS_ID_SUCCESS, data };
}

export function setUpdateContactDetailsIdLoading() {
  return { type: types.UPDATE_CONTACT_DETAILS_ID_LOADING };
}

export function onUpdateContactDetailsIdError(error) {
  return { type: types.UPDATE_CONTACT_DETAILS_ID_ERROR, error };
}

export function onUpdateContactDetailsIdSuccess(data) {
  return { type: types.UPDATE_CONTACT_DETAILS_ID_SUCCESS, data };
}

export function setDeleteContactDetailsIdLoading() {
  return { type: types.DELETE_CONTACT_DETAILS_ID_LOADING };
}

export function onDeleteContactDetailsIdError(error) {
  return { type: types.DELETE_CONTACT_DETAILS_ID_ERROR, error };
}

export function onDeleteContactDetailsIdSuccess(data) {
  return { type: types.DELETE_CONTACT_DETAILS_ID_SUCCESS, data };
}

export function setInsertContactDetailsLoading() {
  return { type: types.INSERT_CONTACT_DETAILS_LOADING };
}

export function onInsertContactDetailsError(error) {
  return { type: types.INSERT_CONTACT_DETAILS_ERROR, error };
}

export function onInsertContactDetailsSuccess(data) {
  return { type: types.INSERT_CONTACT_DETAILS_SUCCESS, data };
}

export function getAllUserDetails() {
  return function action(dispatch) {
    dispatch(setContactDetailsLoading());
    ApiService.getContactDetails()
      .then(response => {
        if (response.data.IsSuccessful && response.data.ErrorMsg === null) {
          dispatch(onContactDetailsSuccess(response.data.ResponseData));
        } else {
          dispatch(onContactDetailsError(ApiConstants.API_NO_RESPONDING));
        }
      })
      .catch(error => {
        dispatch(onContactDetailsError(error));
      });
  };
}

export function getUserDetailsById(contactId) {
  return function action(dispatch) {
    dispatch(setContactDetailsIdLoading());
    ApiService.getContactDetailsById(contactId)
      .then(response => {
        if (response.data.IsSuccessful && response.data.ErrorMsg === null) {
          dispatch(onContactDetailsIdSuccess(response.data.ResponseData));
        } else {
          dispatch(onContactDetailsIdError(ApiConstants.API_NO_RESPONDING));
        }
      })
      .catch(error => {
        dispatch(onContactDetailsIdError(error));
      });
  };
}

export function updateUserDetails(params) {
  if (!Helper.isObjectEmpty(params.Customer)) {
    //let Mobile = Helper.rsaEncrypt(params.Customer.Mobile, "urldecode");
    //let Email = Helper.rsaEncrypt(params.Customer.Email, "urldecode");
    let FirstName = params.Customer.FirstName;
    let LastName = params.Customer.LastName;
    let Email = params.Customer.Email;
    let PhoneNo = params.Customer.PhoneNo;
    let StatusMode = params.Customer.StatusMode;
    return function action(dispatch) {
      dispatch(setUpdateContactDetailsIdLoading());
      ApiService.UpdateContactDetails(
        contactId, // Need to ask question for primary key ID(contactId)
        FirstName,
        LastName,
        Email,
        PhoneNo,
        StatusMode
      )
        .then(response => {
          if (response.data.IsSuccessful && response.data.ErrorMsg === null) {
            let result = [];
            result.push(response.data.ResponseData);
            dispatch(onUpdateContactDetailsIdSuccess(result));
          } else {
            dispatch(
              onUpdateContactDetailsIdError(ApiConstants.API_NO_RESPONDING)
            );
          }
        })
        .catch(error => {
          dispatch(onUpdateContactDetailsIdError(error));
        });
    };
  }
}

export function deleteUserDetails(contactId) {
  return function action(dispatch) {
    dispatch(setDeleteContactDetailsIdLoading());
    ApiService.deleteContactDetails(contactId)
      .then(response => {
        if (response.data.IsSuccessful && response.data.ErrorMsg === null) {
          dispatch(onDeleteContactDetailsIdSuccess(response.data.ResponseData));
        } else {
          dispatch(
            onDeleteContactDetailsIdError(ApiConstants.API_NO_RESPONDING)
          );
        }
      })
      .catch(error => {
        dispatch(onDeleteContactDetailsIdError(error));
      });
  };
}

export function addUserDetails(firstName, lastName, email, phoneNo) {
  return function action(dispatch) {
    dispatch(setInsertContactDetailsLoading());
    ApiService.insertContactDetails(firstName, lastName, email, phoneNo)
      .then(response => {
        if (response.data.IsSuccessful && response.data.ErrorMsg === null) {
          dispatch(onInsertContactDetailsSuccess(response.data.ResponseData));
        } else {
          dispatch(onInsertContactDetailsError(ApiConstants.API_NO_RESPONDING));
        }
      })
      .catch(error => {
        dispatch(onInsertContactDetailsError(error.response));
      });
  };
}

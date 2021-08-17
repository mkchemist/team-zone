import HttpService from "../../service/http-service";
import { HANDLE_REFRESH_USER_DATA_REQUEST, HANDLE_REFRESH_USER_DATA_REQUEST_ERROR, START_REFRESH_USER_DATA_REQUEST } from "../types/actions-types";

export function startRefreshUserDataRequest() {
  return {
    type: START_REFRESH_USER_DATA_REQUEST
  }
}

export function handleRefreshUserDataRequest(payload) {
  return {
    type: HANDLE_REFRESH_USER_DATA_REQUEST,
    payload
  }
}

export function handleRefreshUserDataRequestError(error) {
  return {
    type: HANDLE_REFRESH_USER_DATA_REQUEST_ERROR,
    error
  }
}


export function refreshUserData() {
  return dispatch => {
    dispatch(startRefreshUserDataRequest())
    HttpService.get('v1/user/data')
    .then(({data}) => {
      dispatch(handleRefreshUserDataRequest(data))
    }).catch(err => {
      console.log(err)
      dispatch(handleRefreshUserDataRequestError(err.message))
    })
  }
}

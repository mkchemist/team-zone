import apiScheme from "../../constant/api-scheme";
import HttpService from "../../service/http-service";
import { HANDLE_FETCH_PERMISSIONS, HANDLE_FETCH_PERMISSIONS_ERROR, START_FETCH_PERMISSIONS } from "../types/actions-types";

export function startFetchPermissions() {
  return {
    type : START_FETCH_PERMISSIONS
  }
}

export function handleFetchPermission(payload) {
  return {
    type: HANDLE_FETCH_PERMISSIONS,
    payload
  }
}

export function handleFetchPermissionError(error) {
  return {
    type: HANDLE_FETCH_PERMISSIONS_ERROR,
    error
  }
}

export function fetchPermissions() {
  return dispatch =>  {
    dispatch(startFetchPermissions());
    HttpService.get(apiScheme.permission.calendars)
    .then(({data}) => {
      dispatch(handleFetchPermission(data.data))
    }).catch(err => {
      console.log(err)
      dispatch(handleFetchPermissionError(err.message))
    })
  }
}

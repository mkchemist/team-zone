import {
  HANDLE_CALENDARS_ERROR,
  HANDLE_CALENDARS_REQUEST,
  START_CALENDARS_REQUEST,
} from "./types";

import UserHttpService from "../../user/user-http-service";

export function startCalendarRequest() {
  return {
    type: START_CALENDARS_REQUEST,
  };
}

export function handleCalendarRequest(payload) {
  return {
    type: HANDLE_CALENDARS_REQUEST,
    payload,
  };
}

export function handleCalendarError(error) {
  return {
    type: HANDLE_CALENDARS_ERROR,
    error,
  };
}

export function fetchingCalendarsFromApiService(payload = {}) {
  return (dispatch) => {
    dispatch(startCalendarRequest());

    UserHttpService.get(payload.url, {
      params: payload.params || {}
    }).then(({data}) => {
      dispatch(handleCalendarRequest(data));
    }).catch(err => {
      dispatch(handleCalendarError(err))
    })
  };
}

import apiScheme from "../../constant/api-scheme";
import HttpService from "../../service/http-service";
import {
  START_CALENDARS_REQUEST,
  HANDLE_CALENDARS_REQUEST_ERROR,
  HANDEL_CALENDARS_REQUEST,
} from "../types/actions-types";

export function startCalendarRequest() {
  return {
    type: START_CALENDARS_REQUEST,
  };
}

export function handleCalendarRequest(payload) {
  return {
    type: HANDEL_CALENDARS_REQUEST,
    payload,
  };
}

export function handleCalendarRequestError(error) {
  return {
    type: HANDLE_CALENDARS_REQUEST_ERROR,
    error,
  };
}

export function startFetchingCalendars(payload = {}) {
  return (dispatch) => {
    dispatch(startCalendarRequest());
    HttpService.get(apiScheme.calendars)
      .then(({ data }) => {
        dispatch(handleCalendarRequest(data.data))
      })
      .catch((err) => {
        dispatch(handleCalendarRequestError(err))
      });
  };
}

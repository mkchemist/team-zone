import {
  HANDEL_CALENDARS_REQUEST,
  HANDLE_CALENDARS_REQUEST_ERROR,
  START_CALENDARS_REQUEST,
} from "../types/actions-types";

const InitialCalendarState = {
  status: "idle",
  error: null,
  data: [],
};

export default function (state = InitialCalendarState, action) {
  switch (action.type) {
    case START_CALENDARS_REQUEST:
      return {
        ...state,
        status: "loading",
      };
    case HANDEL_CALENDARS_REQUEST:
      return {
        ...state,
        status: "succeeded",
        data: action.payload,
      };
    case HANDLE_CALENDARS_REQUEST_ERROR:
      return {
        ...state,
        status: "failed",
        error: action.error,
      };
    default:
      return state;
  }
}

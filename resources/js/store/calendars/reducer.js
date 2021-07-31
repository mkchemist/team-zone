import initial from "./initial";
import { ADD_SINGLE_CALENDAR, DELETE_SINGLE_CALENDAR, HANDLE_CALENDARS_ERROR, HANDLE_CALENDARS_REQUEST, START_CALENDARS_REQUEST, UPDATE_SINGLE_CALENDAR, VIEW_SINGLE_CALENDAR } from "./types";

export default function CalendarReducer(state = initial, action) {
  switch(action.type) {
    case START_CALENDARS_REQUEST:
      return state;
    case HANDLE_CALENDARS_REQUEST:
      return state;
    case HANDLE_CALENDARS_ERROR:
      return state;
    case ADD_SINGLE_CALENDAR:
      return state;
    case VIEW_SINGLE_CALENDAR:
      return state;
    case UPDATE_SINGLE_CALENDAR:
      return state;
    case DELETE_SINGLE_CALENDAR:
      return state;
    default:
      return state;
  }
}

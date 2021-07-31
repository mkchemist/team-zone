import { combineReducers } from "redux";
import CalendarReducer from "../../store/calendars/reducer";

export default combineReducers({
  CalendarStore: CalendarReducer
})

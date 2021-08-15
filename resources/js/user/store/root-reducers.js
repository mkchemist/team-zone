import { combineReducers } from "redux";
import calendarReducer from "../../store/reducers/calendar-reducer";
import friendsReducer from "../../store/reducers/friends-reducer";
import permissionsReducer from "../../store/reducers/permissions-reducer";
import plannerReducer from "../../store/reducers/planner-reducer";
import userReducer from "../../store/reducers/user-reducer";
import viewCalendarReducer from "../../store/reducers/view-calendar-reducer";


export default combineReducers({
  UserStore: userReducer,
  CalendarStore: calendarReducer,
  ViewCalendarStore: viewCalendarReducer,
  PlannerStore: plannerReducer,
  FriendsStore: friendsReducer,
  PermissionsStore: permissionsReducer
})

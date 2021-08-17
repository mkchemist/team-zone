import { HANDLE_CALENDARS_REQUEST_ERROR, LOAD_VIEW_CALENDAR_CONTENT, MARK_LOADING_VIEW_CALENDAR_AS_DONE, RESET_VIEW_CALENDAR, SET_VIEW_CALENDAR_ID, START_FETCH_VIEW_CALENDAR } from "../types/actions-types";

const initialState = {
  /**
   * store status
   * available [idle, loading, succeeded, failed, finished]
   * @var {String}
   */
  status: 'idle',
  /**
   * store events
   *
   * @var {Array}
   */
  events: [],

  /**
   * loading error
   *
   * @var {String}
   */
  error: null,
  /**
   * next page url
   *
   * @var {String}
   */
  nextPageUrl: null,
  /**
   * current fetched calendar id
   *
   * @var {Number}
   */
  calendarId: null
}


export default function (state = initialState, action) {
  switch(action.type) {
    case SET_VIEW_CALENDAR_ID :
      return {
        ...state,
        calendarId: action.payload
      }
    case START_FETCH_VIEW_CALENDAR :
      return {
        ...state,
        status: 'loading'
      }
    case RESET_VIEW_CALENDAR :
      return {
        ...state,
        planners: [],
        events: [],
        nextPageUrl: null
      }
    case LOAD_VIEW_CALENDAR_CONTENT :
      return {
        ...state,
        events: [...state.events,...action.payload.events],
        status: 'succeeded',
        nextPageUrl: action.payload.nextPageUrl
      }
    case HANDLE_CALENDARS_REQUEST_ERROR:
      return {
        ...state,
        status: 'failed',
        events: [],
        nextPageUrl: null,
        error: action.error
      }
    case MARK_LOADING_VIEW_CALENDAR_AS_DONE:
      return {
        ...state,
        status: 'finished'
      }
    default :
      return state
  }
}

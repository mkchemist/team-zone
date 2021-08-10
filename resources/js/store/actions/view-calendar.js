import {
  HANDLE_LOADING_VIEW_CALENDAR_ERROR,
  LOAD_VIEW_CALENDAR_CONTENT,
  MARK_LOADING_VIEW_CALENDAR_AS_DONE,
  RESET_VIEW_CALENDAR,
  SET_VIEW_CALENDAR_ID,
  START_FETCH_VIEW_CALENDAR,
} from "../types/actions-types";

import HttpService from "../../service/http-service"

export function setViewCalendarId(payload) {
  return {
    type: SET_VIEW_CALENDAR_ID,
    payload
  }
}

export function startFetchViewCalendar() {
  return {
    type: START_FETCH_VIEW_CALENDAR,
  };
}

export function resetViewCalendar() {
  return {
    type: RESET_VIEW_CALENDAR,
  };
}

export function loadViewCalendar(payload) {
  return {
    type: LOAD_VIEW_CALENDAR_CONTENT,
    payload,
  };
}

export function handleLoadingViewCalendarError(error) {
  return {
    type: HANDLE_LOADING_VIEW_CALENDAR_ERROR,
    error,
  };
}

export function markLoadingViewCalendarAsDone() {
  return {
    type: MARK_LOADING_VIEW_CALENDAR_AS_DONE,
  };
}


export function calendarRequest(payload = {}) {
  let url = payload.url || `v1/view-calendar/${payload.id}`
  let paginated = payload.paginated || false;
  let query = payload.query || {}
  return dispatch => {
    dispatch(setViewCalendarId(parseInt(payload.id)));
    dispatch(startFetchViewCalendar());
    if(!paginated) {
      dispatch(resetViewCalendar())
    }
    HttpService.get(url, {
      params: query
    }).then(({data}) => {
      let planners = data.data.map(i => i.planner)
      data.data.forEach(item => {
        item['start'] = new Date(item.start)
        item['end'] = new Date(item.end)
      })
      dispatch(loadViewCalendar({
        planners,
        events: data.data,
        nextPageUrl: data.links.next
      }))
      if(data.links.next) {
        dispatch(calendarRequest({
          url: data.links.next,
          id: payload.id,
          paginated: true
        }))
      } else {
        dispatch(markLoadingViewCalendarAsDone())
      }
    }).catch(error => {
      console.log(error)
      dispatch(handleLoadingViewCalendarError(error))
    })
  }
}

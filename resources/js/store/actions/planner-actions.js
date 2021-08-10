import HttpService from "../../service/http-service";
import { HANDLE_PLANNER_REQUEST, HANDLE_PLANNER_REQUEST_ERROR, START_PLANNER_REQUEST } from "../types/actions-types";
import apiScheme from "../../constant/api-scheme"

export function startPlannerRequest() {
  return {
    type: START_PLANNER_REQUEST
  }
}

export function handlePlannerRequest(payload) {
  return {
    type: "HANDLE_PLANNER_REQUEST",
    payload
  }
}

export function handlePlannerRequestError(error) {
  return {
    type: HANDLE_PLANNER_REQUEST_ERROR,
    error
  }
}


export function fetchPlanners(payload = {}) {
  let query = payload.query || {};
  return dispatch => {
    dispatch(startPlannerRequest())
    HttpService.get(apiScheme.planners, {
      params: query,
      headers: {
        'Accept' : 'application/json'
      }
    })
    .then(({data}) => {
      dispatch(handlePlannerRequest(data.data))
    }).catch(err => {
      console.log(err)
      dispatch(handlePlannerRequestError(err))
    })
  }
}

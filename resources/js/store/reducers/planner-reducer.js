import {
  HANDLE_PLANNER_REQUEST,
  HANDLE_PLANNER_REQUEST_ERROR,
  START_PLANNER_REQUEST,
} from "../types/actions-types";

const initialState = {
  /**
   * store state
   * available status [idle, loading, succeeded, failed]
   *
   * @var {String}
   */
  status: "idle",
  /**
   * planners data
   *
   * @var {Array}
   */
  data: [],
  /**
   * errors
   *
   * @var {String|null}
   */
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_PLANNER_REQUEST:
      return {
        status: "loading",
        data: [],
        error: null,
      };
    case "HANDLE_PLANNER_REQUEST":
      return {
        status: 'succeeded',
        data: action.payload,
        error: null,
      };
    case HANDLE_PLANNER_REQUEST_ERROR:
      let error  = action.error;
      if(typeof error === "object") {
        error = error.message;
      }
      return {
        status: "failed",
        data: [],
        error: error,
      };
    default:
      return state;
  }
}

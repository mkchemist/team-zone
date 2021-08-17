import { HANDLE_FRIENDS_REQUEST, HANDLE_FRIENDS_REQUEST_ERROR, START_FRIENDS_REQUEST } from "../types/actions-types";

const initialState = {
  /**
   * request status
   * available status [idle, loading, succeeded, failed]
   *
   * @var {String}
   */
  status: "idle",
  /**
   * friends data
   *
   * @var {Array}
   */
  data: [],
  /**
   * friends request error
   *
   * @var {String|null}
   */
  error: null,
};

export default function (state = initialState, action) {
  switch(action.type) {
    case START_FRIENDS_REQUEST:
      return {
        ...state,
        status: 'loading'
      }
    case HANDLE_FRIENDS_REQUEST:
      return {
        data: action.payload,
        status: 'succeeded',
        error: null
      }
    case HANDLE_FRIENDS_REQUEST_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

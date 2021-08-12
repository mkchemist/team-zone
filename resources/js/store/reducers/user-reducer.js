import { HANDLE_REFRESH_USER_DATA_REQUEST, START_REFRESH_USER_DATA_REQUEST } from "../types/actions-types"

let user = JSON.parse(document.getElementById("user").value)
const InitialUserState = {
  data: user,
  token: user.api_token,
  /**
   * request status
   * available status [idle, loading, succeeded, failed]
   *
   * @var {String}
   */
  status: 'idle',
  /**
   * refresh request error
   *
   * @var {String|null}
   */
  error: null

}

export default function (state=InitialUserState, action) {
  switch(action.type) {
    case START_REFRESH_USER_DATA_REQUEST:
      return {
        ...state,
        status: 'loading'
      }
    case HANDLE_REFRESH_USER_DATA_REQUEST:
      return {
        data: action.payload,
        token: action.payload.api_token,
        status: 'succeeded'
      }
    case HANDLE_REFRESH_USER_DATA_REQUEST:
      return {
        ...state,
        status: 'failed',
        error: action.error
      }
    default :
      return state
  }
}

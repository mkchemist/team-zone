import { HANDLE_FETCH_PERMISSIONS, HANDLE_FETCH_PERMISSIONS_ERROR, START_FETCH_PERMISSIONS } from "../types/actions-types";

const initialState = {
  /**
   * status
   * [idle, loading, succeeded, failed]
   *
   * @var {String}
   */
  status: 'idle',
  /**
   * request error
   *
   * @var {String|null}
   */
  error: null,
  /**
   * user permissions
   *
   * @var {Array}
   */
  userPermissions: [],
  /**
   * user friends permissions
   *
   * @var {Array}
   */
  friendsPermissions: []
}

export default function (state = initialState, action) {
  switch(action.type) {
    case START_FETCH_PERMISSIONS :
      return {
        ...state,
        status: 'loading'
      }
    case HANDLE_FETCH_PERMISSIONS:
      return {
        status: 'succeeded',
        userPermissions: action.payload.user_permissions,
        friendsPermissions: action.payload.friends_permissions,
        error: null
      }
    case HANDLE_FETCH_PERMISSIONS_ERROR:
      return {
        status: 'failed',
        userPermissions: [],
        friendsPermissions: [],
        error: payload.error
      }
    default :
      return state;

  }
}



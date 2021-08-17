import apiScheme from "../../constant/api-scheme"
import HttpService from "../../service/http-service"
import { HANDLE_FRIENDS_REQUEST, HANDLE_FRIENDS_REQUEST_ERROR, START_FRIENDS_REQUEST } from "../types/actions-types"

export const startFriendsRequest = () => {
  return {
    type: START_FRIENDS_REQUEST
  }
}

export const handleFriendsRequest = payload => {
  return {
    type: HANDLE_FRIENDS_REQUEST,
    payload
  }
}

export const handleFriendsRequestError = error => {
  return {
    type: HANDLE_FRIENDS_REQUEST_ERROR,
    error
  }
}


export const fetchFriends = () => dispatch => {
  dispatch(startFriendsRequest)
  HttpService.get(apiScheme.friends)
  .then(({data}) => {
    dispatch(handleFriendsRequest(data.data))
  }).catch(err => {
    console.log(err)
    dispatch(handleFriendsRequestError(err))
  })
}

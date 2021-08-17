import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import apiScheme from "../constant/api-scheme";
import HttpService from "../service/http-service";
import Store from "../user/store";

let user = Store.getState().UserStore;

/**
 * check if the given user is a friend of
 * current user or not
 *
 * @param {Object} friend
 * @returns {Boolean}
 */
export const isAFriend = (friend) => {
  let is_a_friend = false;
  let friendsGroup = friend.friends;

  if (!friendsGroup || !friendsGroup.length) {
    return is_a_friend;
  }

  friendsGroup.map((item) => {
    if (item.user_id === user.data.id || item.friend_id === user.data.id) {
      is_a_friend = true;
    }
  });

  return true;
};

/**
 * check if friendship of the given user
 * is accepted
 *
 * @param {Object} friend
 * @returns {Boolean}
 */
export const IsFriendshipAccepted = (friend) =>
  friend.friends[0].accepted === 1;


export const removeFromFriendList = (id) => {
  window.event.preventDefault();
  return HttpService.delete(apiScheme.friends + `/${id}`, {friend_id: id}).then(({data}) => {
    Swal.fire({
      title: 'Success',
      text: 'Action completed',
      icon: 'success',
      toast: true,
      timer: 3000,
      timerProgressBar: true
    })

  })
}

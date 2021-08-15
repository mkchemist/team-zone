import React from "react";
import PropTypes from "prop-types";
import { defaultProfileImage, profileImage } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import HttpService from "../../service/http-service";
import apiScheme from "../../constant/api-scheme";
import Swal from "sweetalert2";
import { isAFriend, IsFriendshipAccepted, removeFromFriendList } from "../../helpers/friends-helper";
import { fetchFriends } from "../../store/actions/friends-actions";

function FriendsListComponent({ friends, onListUpdate }) {
  let user = useSelector((state) => state.UserStore.data);
  let dispatch = useDispatch();

  const addFriend = (friend) => {
    window.event.preventDefault();
    HttpService.post(apiScheme.friends, { friend_id: friend.id })
      .then(({ data }) => {
        Swal.fire({
          title: "Success",
          text: "Request Sent",
          icon: "success",
          toast: true,
          timer: 2000,
          timerProgressBar:true
        })
        onListUpdate()
        dispatch(fetchFriends())
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* const isFriend = (friend) => {
    let is_a_friend = false;
    if (!friend.friends.length) {
      return is_a_friend;
    }
    friend.friends.map((item) => {
      if (item.user_id === user.id || item.friend_id === user.id) {
        is_a_friend = true;
      }
    });
    return is_a_friend;
  }; */
  const isFriend = isAFriend;

 /*  const isFriendShipAccepted = (friend) => {
    return friend.friends[0].accepted === 1;
  }; */

  const deleteFriend = (friend) => {
    window.event.preventDefault();
    removeFromFriendList(friend.friends[0].id)
    .then(() => {
      onListUpdate()
      dispatch(fetchFriends())
    })
    .catch(err => console.log(err))
  }

  const isFriendShipAccepted = IsFriendshipAccepted

  return (
    <div>
      {friends.map((friend) => {
        return (
          <div
            key={friend.id}
            className="row mx-auto pb-3 align-items-center border-bottom"
          >
            <div className="col-1">
              <img
                src={
                  friend.image
                    ? profileImage(friend.image.url)
                    : defaultProfileImage()
                }
                alt={`${friend.name} profile picture`}
                className="img-fluid rounded"
              />
            </div>
            <div className="col">
              <p className="mb-0 lead">{friend.name}</p>
              <p className="mb-0 small text-muted">{friend.email}</p>
              <div className="my-2">
                <a href="" className="badge badge-primary mr-1">
                  <span className="fa fa-book mr-1"></span>
                  <span>View</span>
                </a>
                {/* {user.id !== friend.id ? (
                  <a href="" className="badge badge-primary" onClick={e => addFriend(friend)}>
                    <span className="fa fa-plus mr-1"></span>
                    <span>Add</span>
                  </a>
                ) : null} */}
                {isFriend(friend) ? (
                  <>
                    {isFriendShipAccepted(friend) ? (
                      <a href="" className="badge badge-danger" onClick={e => deleteFriend(friend)}>
                        <span className="fa fa-user-slash mr-1"></span>
                        <span>Unfriend</span>
                      </a>
                    ) : (
                      <a href="" className="badge badge-secondary border" onClick={e => deleteFriend(friend)}>
                        <span className="fa fa-times mr-1"></span>
                        <span>Cancel friend request</span>
                      </a>
                    )}
                  </>
                ) : user.id !== friend.id ? (
                  <a
                    href=""
                    className="badge badge-primary"
                    onClick={(e) => addFriend(friend)}
                  >
                    <span className="fa fa-plus mr-1"></span>
                    <span>Add</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

FriendsListComponent.propTypes = {
  friends: PropTypes.array.isRequired,
  onListUpdate: PropTypes.func
};

export default FriendsListComponent;

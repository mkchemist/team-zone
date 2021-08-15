import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
/* import Swal from "sweetalert2"; */
import ErrorHandlingComponent from "../../../components/ErrorHandlingComponent";
import LoadingComponent from "../../../components/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound";
import SearchBox from "../../../components/SearchBox";
/* import apiScheme from "../../../constant/api-scheme"; */
import { removeFromFriendList } from "../../../helpers/friends-helper";
/* import HttpService from "../../../service/http-service"; */
import { fetchFriends } from "../../../store/actions/friends-actions";
import { defaultProfileImage, profileImage } from "../../../utils/utils";

function FriendsHome() {
  let friends = useSelector((state) => state.FriendsStore);
  let dispatch =useDispatch()

  const onSearch = (keyword) => {
    console.log(keyword);
  };

  const removeFriend = (friend) => {
    /* window.event.preventDefault();
    HttpService.delete(apiScheme.friends+`/${friend.relation_id}`)
    .then(({data}) => {
      Swal.fire({
        title: "Success",
        text: 'Action completed',
        icon: "success",
        toast: true,
        timer: 2000,
        timerProgressBar: true
      })
      dispatch(fetchFriends());
    }).catch(err => {
      console.log(err)
    }); */
    removeFromFriendList(friend.relation_id)
    .then(() => dispatch(fetchFriends()))
    .catch(err => console.log(err))
  }

  return (
    <div className="p-2">
      <div className="row mx-auto">
        <SearchBox
          placeholder="search friends ..."
          onSearch={onSearch}
          autoSearch={true}
          className="col"
        />
        <button className="btn btn-sm btn-primary" onClick={e => dispatch(fetchFriends())}>
          <span className="fa fa-sync-alt mr-1"></span>
          <span>refresh</span>
        </button>
      </div>
      <hr />
      {friends.data.length ? (
        <div>
          {friends.data.map((friend) => (
            <div className="row mx-auto pb-3 my-2 border-bottom align-items-center" key={friend.id}>
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
                <p className="mb-0">{friend.name}</p>
                <p className="mb-0 text-muted small">{friend.email}</p>
                <div>
                  <a href="" className="badge badge-primary mr-1">
                    <span className="fa fa-book mr-1"></span>
                    <span>View</span>
                  </a>
                  {friend.accepted ? (
                    <>
                     <a href="" className="badge badge-danger" onClick={e => removeFriend(friend)}>
                       <span className="fa fa-user-slash mr-1"></span>
                       <span>Unfriend</span>
                     </a>
                    </>
                  ) : (
                    <>
                     <a href="" className="badge badge-secondary" onClick={e => removeFriend(friend)}>
                       <span className="fa fa-times mr-1"></span>
                       <span>Cancel friend request</span>
                     </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : friends.status === "succeeded" && !friends.data.length ? (
        <>
          <NoDataFound text={"No Friends found"} />
          <div className="text-center">
            <Link to="/friends/add" className="btn btn-primary">
              <span className="fa fa-plus-circle mr-1"></span>
              <span>Add a friend</span>
            </Link>
          </div>
        </>
      ) : friends.status === "failed" ? (
        <ErrorHandlingComponent />
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
}

export default FriendsHome;

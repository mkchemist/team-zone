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
  let friendsStore = useSelector((state) => state.FriendsStore);
  let [friends, setFriends] = React.useState([]);
  let [search, setSearch] = React.useState(null);
  let dispatch = useDispatch();

  React.useEffect(() => {
    if (friendsStore.status === "idle") {
      dispatch(fetchFriends());
    }
    let $friends = friendsStore.data;
    if (search) {
      $friends = $friends.filter((friend) => {
        return (
          friend.name.toLowerCase().includes(search.toLowerCase()) ||
          friend.email.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    setFriends($friends);

  }, [friendsStore.status, search]);

  const onSearch = (keyword) => {
    setSearch(keyword)
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
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-2">
      <div className="row mx-auto">
        <SearchBox
          placeholder="search friends ..."
          onSearch={onSearch}
          autoSearch={true}
          className="col"
        />
        <button
          className="btn btn-sm btn-primary"
          onClick={(e) => dispatch(fetchFriends())}
        >
          <span className="fa fa-sync-alt mr-1"></span>
          <span>refresh</span>
        </button>
      </div>
      <hr />
      {friendsStore.data.length ? (
        <div>
          <p>
            Total friends : {friends.length} found
          </p>
          {friends.map((friend) => (
            <div
              className="row mx-auto pb-3 my-2 border-bottom align-items-center"
              key={friend.id}
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
                <Link to={`friends/profile/${friend.id}`} className="mb-0">
                  {friend.name}
                </Link>
                <p className="mb-0 text-muted small">{friend.email}</p>
                <div>
                  <Link
                    to={`friends/profile/${friend.id}`}
                    className="badge badge-primary mr-1"
                  >
                    <span className="fa fa-book mr-1"></span>
                    <span>View</span>
                  </Link>
                  {friend.accepted ? (
                    <>
                      <a
                        href=""
                        className="badge badge-danger"
                        onClick={(e) => removeFriend(friend)}
                      >
                        <span className="fa fa-user-slash mr-1"></span>
                        <span>Unfriend</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href=""
                        className="badge badge-secondary"
                        onClick={(e) => removeFriend(friend)}
                      >
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
      ) : friendsStore.status === "succeeded" && !friendsStore.data.length ? (
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

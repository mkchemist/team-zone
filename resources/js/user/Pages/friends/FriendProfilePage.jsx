import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import { fetchFriends } from "../../../store/actions/friends-actions";
import { defaultProfileImage, profileImage } from "../../../utils/utils";

function FriendProfilePage() {
  let { id } = useParams();
  let friends = useSelector((state) => state.FriendsStore);
  let [friend, setFriend] = React.useState(null);
  let dispatch = useDispatch()

  React.useEffect(() => {
    if(friends.status === 'idle') {
      dispatch(fetchFriends())
    }
    let matchedFriends = friends.data.filter(friend => friend.id === parseInt(id));

    if(matchedFriends.length) {
      setFriend(matchedFriends[0])
    }
  }, [friends.status, id])



  return (
    <div>
      <p className="lead">
        <img
          src={
            friend && friend.image
              ? profileImage(friend.image.url)
              : defaultProfileImage()
          }
          alt={`${friend ? friend.name : ""} profile picture`}
          className="icon-img-xl rounded-circle"
        />
        <span className="mx-1"><b className="text-primary">{friend? friend.name : ''}</b> Profile Picture</span>
      </p>
      <hr />
      {friend ? (
        <div className="my-2">
          <p className="mb-2">Name : {friend.name}</p>
          <p className="mb-2">E-mail : {friend.email}</p>
          <p className="mb-2">Gender : {friend.gender || '--------------'}</p>
          <p className="mb-2">Company :{friend.company || '--------------'}</p>
          <p className="mb-2">Phone : {friend.phone || '--------------'}</p>
          <p className="mb-2">Date of birth : {friend.birth_date || '--------------'}</p>
          <hr />
          <BackButton block={false} />
        </div>
      ) : null}
    </div>
  );
}

export default FriendProfilePage;

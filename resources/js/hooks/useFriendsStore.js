import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../store/actions/friends-actions";

export default function() {
  let dispatch = useDispatch()
  let store = useSelector(state => state.FriendsStore)

  useEffect(() => {
    if(store.status === "idle") {
      dispatch(fetchFriends())
    }
  }, [store.status])

  return store
}

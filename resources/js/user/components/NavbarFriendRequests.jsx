import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import apiScheme from "../../constant/api-scheme";
import HttpService from "../../service/http-service";
import { fetchFriends } from "../../store/actions/friends-actions";
import { defaultProfileImage, profileImage } from "../../utils/utils";

function NavbarFriendRequests() {

  let [requests, setRequest] = useState([])
  let dispatch = useDispatch();
  const getRequests = () => {
    HttpService.get(apiScheme.friendRequests)
    .then(({data}) => {
      setRequest(data.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(getRequests, [])

  const handleRequest = (request, type) => {
    let query = {
      type,
      id: request.id
    }
    HttpService.put(apiScheme.friends+`/${request.relation_id}`, query)
    .then(({data}) => {
      Swal.fire({
        title: 'Success',
        text: data.message,
        icon: 'success',
        toast: true,
        timer: 3000,
        timerProgressBar:true
      })
      getRequests();

      dispatch(fetchFriends())

    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <li className="nav-item dropleft">
      <a href="" className="nav-link dropdown-toggle text-white" data-toggle="dropdown">
        <span className="fa fa-bell mr-1"></span>
        <span>{requests.length}</span>
      </a>
      <div className="dropdown-menu">
        {requests.length ? (
          <>
            {requests.map((request) => (
              <div className="dropdown-item border-bottom small" key={request.id}>
                <Link to="/"  className="text-decoration-none text-dark">
                  <img
                    src={
                      request.image
                        ? profileImage(request.image.url)
                        : defaultProfileImage()
                    }
                    alt={`${request.name} profile picture`}
                    className="icon-img rounded-circle img-fluid"
                  />
                  <span className="ml-1">{request.name}</span>
                </Link>
                <div className="my-2 text-center">
                  <button className="btn btn-sm btn-success mr-1" type="button" onClick={e => handleRequest(request, true)}>
                    <span className="fa fa-check mr-1"></span>
                    <span>confirm</span>
                  </button>
                  <button className="btn btn-sm btn-danger" type="button" onClick={e => handleRequest(request, false)} >
                    <span className="fa fa-times mr-1"></span>
                    <span>deny</span>
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <span className="dropdown-item-text small"> <span className="fa fa-sync" style={{ cursor: 'pointer' }} onClick={getRequests}></span> No waiting friend requests</span>
        )}
      </div>
    </li>
  );
}



export default NavbarFriendRequests;

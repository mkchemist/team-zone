import React, { useState } from "react";
import Swal from "sweetalert2";
import ErrorHandlingComponent from "../../../components/ErrorHandlingComponent";
import LoadingComponent from "../../../components/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound";
import SearchBox from "../../../components/SearchBox";
import apiScheme from "../../../constant/api-scheme";
import HttpService from "../../../service/http-service";
import FriendsListComponent from "../../components/FriendsListComponent";

export default function () {
  let [searchKeyword, setSearchKeyword] = useState(null);
  let [friends, setFriends] = useState([]);
  let [error, setError] = useState(null);
  let [started, toggleStarted] = useState(false);
  let [status, setStatus] = useState("idle");
  let [nextPage, setNextPage] = useState(null);
  let [prevPage, setPrevPage] = useState(null);
  let [fromResult, setFromResult] = useState(0);
  let [toResult, setToResult] = useState(0);
  const startSearch = (keyword, url = null) => {
    if (!keyword || keyword === "") {
      /* Swal.fire({
        title: "Info",
        text: "You didn't enter anything",
        icon: "info",
        toast: true,
      }); */
      Swal.fire({
        title : "Warning",
        text: "you didn\'t enter anything",
        icon : "warning",
        toast: true,
        confirmButtonText: `<span class="fa fa-check"></span> okay, let me try again`,
      confirmButtonColor: `#32b9e4`

      })
      return;
    }
    setSearchKeyword(keyword)
    toggleStarted(true);
    setStatus("loading");
    if(!url) {
      url = apiScheme.friendsSearch
    }
    HttpService.post(url, { keyword })
      .then(({ data }) => {
        setStatus("succeeded");
        setFriends(data.data);
        setNextPage(data.links.next);
        setPrevPage(data.links.prev);
        setFromResult(data.meta.from);
        setToResult(data.meta.to);
      })
      .catch((err) => {
        console.log(err);
        setStatus("failed");
        if (err.response && err.response.status === 422) {
          setError("Missing keyword");
        } else {
          setError("Unable to handle this request");
        }
      });
  };

  const onListUpdate= () => {
    startSearch(searchKeyword);
  }

  return (
    <div className="p-2">
      <div className="row mx-auto">
        <SearchBox
          autoSearch={false}
          onSearch={startSearch}
          placeholder={`Enter friend name or email`}
        />
      </div>
      <hr />
      <div>
        {!started ? (
          <div className="p-5 text-center">
            <span className="fa fa-check-circle fa-3x text-primary"></span>
            <p className="my-2">
              Enter friend E-mail or Name and then click search
            </p>
          </div>
        ) : friends.length && started ? (
          <div>
            <div className="my-2">
              <p className="mb-1">
                show results from {fromResult} to {toResult}
              </p>
              <div className="btn-group">
                <button
                  className="btn btn-light border"
                  disabled={!prevPage}
                  onClick={(e) => startSearch(searchKeyword, prevPage)}
                >
                  Prev
                </button>
                <button
                  className="btn btn-light border"
                  disabled={!nextPage}
                  onClick={(e) => startSearch(searchKeyword, nextPage)}
                >
                  Next
                </button>
              </div>
            </div>
            <FriendsListComponent friends={friends} onListUpdate={onListUpdate} />
          </div>
        ) : status === "succeeded" && !friends.length ? (
          <NoDataFound />
        ) : status === "failed" ? (
          <ErrorHandlingComponent text={error} />
        ) : (
          <LoadingComponent />
        )}
      </div>
    </div>
  );
}

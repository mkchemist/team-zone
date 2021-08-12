import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import apiScheme from "../constant/api-scheme";
import HttpService from "../service/http-service";
import { refreshUserData } from "../store/actions/user-actions";
import ModalComponent from "./ModalComponent";

function ChangeProfilePictureComponent() {
  let [showModal, toggleModal] = React.useState(false);
  let [pic, setPic] = React.useState(null);
  let dispatch = useDispatch()
  let inputFile = React.createRef();
  let profilePicForm = React.createRef();
  let [uploadError, setUploadError] = React.useState(null);

  const handleInputFile = (e) => {
    let files = e.target.files;
    if (files.length) {
      setPic(files[0]);
    }
  };
  const openUploadInput = () => {
    inputFile.current.click();
  };

  const saveProfilePicture = (e) => {
    /**
     * set upload error to null to remove
     * error alert if exists
     */
    setUploadError(null);
    e.preventDefault();

    /**
     * check if user already choose picture
     * and fire sweet alert if not
     */
    if (!pic) {
      Swal.fire({
        title: "Warning",
        text: "You didn't choose any picture",
        icon: "warning",
      });
      return;
    }
    /**
     * create form data and hold image within it
     */
    let data = new FormData();
    data.append("pic", pic);
    /**
     * send to api service
     */
    HttpService.post(apiScheme.profile.picture, data)
      .then(({ data }) => {
        toggleModal(false)
        Swal.fire({
          title: "Success",
          text: `Profile picture changed`,
          icon: 'success',
          toast: true,
          timer:3000,
          timerProgressBar: true
        })
        dispatch(refreshUserData())
      })
      .catch((err) => {
        console.log(err);
        /**
         * check if the error is a validation error
         * if true it will fire sweet alert with text about
         * missing item
         * else it will fire alert
         */
        if (err.response.status === 422) {
          setUploadError(err.response.data.errors.pic[0]);
        } else {
          setUploadError(
            "Unable to upload your picture right now, try again later"
          );
        }
      });
  };

  return (
    <div className="my-2">
      <button
        type="button"
        className="btn btn-sm btn-block btn-success"
        onClick={() => toggleModal(true)}
      >
        <span className="fa fa-upload mr-1"></span>
        <span>change profile picture</span>
      </button>
      <ModalComponent
        onClose={() => toggleModal(false)}
        show={showModal}
        id={`change_profile_picture_modal`}
      >
        <>
          <p className="font-weight-bold">Change Profile Picture</p>
          <form
            encType="multipart/form-data"
            onSubmit={saveProfilePicture}
            ref={profilePicForm}
          >
            <div className="form-group">
              <button
                className="btn btn-sm btn-block btn-primary"
                type="button"
                onClick={openUploadInput}
              >
                <span className="fa fa-upload mr-1"></span>
                <span>Upload Picture</span>
              </button>
              <input
                type="file"
                style={{ display: "none" }}
                ref={inputFile}
                onChange={handleInputFile}
              />
              <div className="my-2 small">
                <p className="mb-0">
                  Allowed file types : <b>JPG,JPEG,GIF,SVG</b>
                </p>
                <p className="mb-0">
                  Max. file size: <b>1 MB</b>
                </p>
                {uploadError && (
                  <p className="my-2 alert alert-danger">{uploadError}</p>
                )}
              </div>
            </div>
            <hr />
            <div className="form-group text-right">
              <button
                className="btn btn-sm btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                <span className="fa fa-times mr-1"></span>
                <span>close</span>
              </button>
              <button className="btn btn-sm btn-success mx-1" type="submit">
                <span className="fa fa-save mr-1"></span>
                <span>Save</span>
              </button>
            </div>
          </form>
        </>
      </ModalComponent>
    </div>
  );
}

export default ChangeProfilePictureComponent;

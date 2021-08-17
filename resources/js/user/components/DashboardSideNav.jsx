import React from "react";
import Swal from "sweetalert2";
import AsideNav from "../../components/AsideNav";
import ModalComponent from "../../components/ModalComponent";
import apiScheme from "../../constant/api-scheme";
import HttpService from "../../service/http-service";

function DashboardSideNav() {
  const [showInviteModal, toggleInviteModal] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const items = [
    {
      title: "Add Calendar",
      path: "/calendars/add",
      icon: "fa fa-plus-circle mx-1",
    },
    {
      title: "Add Planner",
      path: "/planners/add",
      icon: "fa fa-plus-circle mx-1",
    },
    {
      title: "Add Friend",
      path: "/friends/add",
      icon: "fa fa-plus-circle mx-1",
    },
    {
      title: "Invite Friend",
      path: "/invite",
      icon: "fa fa-envelope mx-1",
      type: "action",
      action: (e) => {
        e.preventDefault();
        toggleInviteModal(true);
      },
    },
  ];

  const sendInvite = (e) => {
    e.preventDefault();
    HttpService.post(apiScheme.invite, {mail: email})
    .then(({data}) => {
      Swal.fire({
        title: 'Success',
        text: data.message,
        icon: "success",
        toast: true,
        timer: 3000,
        timerProgressBar: true
      })
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="p-2">
      <AsideNav items={items} />
      <ModalComponent
        show={showInviteModal}
        onClose={(e) => toggleInviteModal(false)}
        id="dashboard_invite_friend_modal"
      >
        <div>
        <p className="lead">Invite friend</p>
        <hr />
        <form onSubmit={sendInvite}>
          <div className="form-group">
            <label htmlFor="">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control form-control-sm"
              placeholder="Enter friend email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <hr />
          <div>
            <button className="btn btn-block btn-primary" type="submit">
              <span className="fa fa-paper-plane mx-1"></span>
              <span>send</span>
            </button>
            <button className="btn btn-block btn-secondary my-2" type="button" data-dismiss="modal">
              <span className="fa fa-times mx-1"></span>
              <span>cancel</span>
            </button>
          </div>
        </form>
        </div>
      </ModalComponent>
    </div>
  );
}

export default DashboardSideNav;

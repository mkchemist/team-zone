import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import HttpService from "../../service/http-service";
import apiScheme from "../../constant/api-scheme";
import { useDispatch } from "react-redux";
import { fetchPlanners } from "../../store/actions/planner-actions";

const PlannerListComponentItem = ({ item }) => {
  let dispatch = useDispatch();

  const deletePlanner = planner => {
    window.event.preventDefault();
    Swal.fire({
      title: "Warning",
      html : `Are you sure, you want to delete planner ${planner.name}?`,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: `<span class="fa fa-trash"></span> Yes, Delete`,
      confirmButtonColor: '#ec5151',
      cancelButtonText: `<span class="fa fa-times"></span> Keep`
    }).then(res => {
      if(res.isConfirmed) {
        HttpService.delete(`${apiScheme.planners}/${planner.id}`)
        .then(({data}) => {
          Swal.fire({
            title: "Success",
            html: `${planner.title} planner deleted`,
            icon: 'success',
            toast: true,
            timer: 5000,
            timerProgressBar: true
          })

          dispatch(fetchPlanners());

        }).catch(err => console.log(err))
      }
    })
  }

  return (
    <div className="my-2">
      <div className="d-flex align-items-center">
        <div>
          <span className="fa-stack fa-2x">
            <span
              className="fa fa-stack-2x fa-circle"
              style={{ color: item.style.backgroundColor }}
            ></span>
            <span
              className={`${item.style.icon} fa fa-stack-1x`}
              style={{ color: item.style.color }}
            ></span>
          </span>
        </div>
        <div className="col">
          <p className="mb-0 lead">{item.title}</p>
          <p className="mb-0 text-muted">{item.desc || "No description"}</p>
          <p className="mb-0 small">
            {item.calendar.title} | {item.user.name}
          </p>
        </div>
        <div className="btn-group btn-group-sm">
          <Link to={`/planners/edit/${item.id}`} className="btn btn-secondary">
            <span className="far fa-edit mr-1"></span>
            <span>Edit</span>
          </Link>
          <a href="" className="btn btn-secondary" onClick={e => deletePlanner(item)}>
            <span className="fa fa-trash mr-1"></span>
            <span>Delete</span>
          </a>
        </div>
      </div>
    </div>
  );
};

PlannerListComponentItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function PlannerListComponent({ list }) {
  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>
          <PlannerListComponentItem item={item} />
        </div>
      ))}
    </div>
  );
}

PlannerListComponent.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlannerListComponent;

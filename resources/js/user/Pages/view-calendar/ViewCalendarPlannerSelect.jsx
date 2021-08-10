import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../components/LoadingComponent";

function ViewCalendarPlannerSelect({ list, onUpdate }) {
  let [viewList, setViewList] = React.useState([]);
  let {id} = useParams()
  function handleViewListChange(item) {
    let checked = window.event.target.checked;
    let $list = [];
    if (checked) {
      $list = [...viewList, item];
      setViewList($list);
    } else {
      $list = viewList.filter((i) => i !== item);
      setViewList($list);
    }
    onUpdate($list);
  }

  React.useEffect(() => {
    let planners = list.map((item) => item.title);

    setViewList(planners);
  }, [list]);

  return (
    <div>
      <div className="border rounded p-2">
        <p className="lead mb-0">Planners</p>
        <hr />
        {list.length ? (
          <nav className="nav">
            {list.map((item, itemIndex) => (
              <li
                key={`list_item_${itemIndex}_${item.id}`}
                className="col-12 nav-item"
              >
                <input
                  type="checkbox"
                  id="planner_list"
                  className="mr-1"
                  checked={viewList.includes(item.title)}
                  onChange={(e) => handleViewListChange(item.title)}
                />
                <label htmlFor="" className="small">
                  {item.title}
                </label>
              </li>
            ))}
          </nav>
        ) : (
          <LoadingComponent />
        )}

        <div className="text-right">
          <Link
            to={`/planners/add`}
            className="text-decoration-none"
            title="Add planner"
          >
            <span className="fa fa-plus-circle"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}

ViewCalendarPlannerSelect.propTypes = {
  list: PropTypes.array.isRequired,
  onUpdate: PropTypes.func,
};

export default ViewCalendarPlannerSelect;

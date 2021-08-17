import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import NoDataFound from "../../../components/NoDataFound";
import { useSelector } from "react-redux";

function ViewCalendarPlannerSelect({ list, onUpdate }) {
  let [viewList, setViewList] = React.useState([]);
  let [calendarPlanners, setCalendarPlanners] = React.useState([]);
  let { id } = useParams();
  let user = useSelector((state) => state.UserStore.data);
  let calendarsStore = useSelector((state) => state.CalendarStore);
  let [canAddPlanner, toggleCanAddPlanner] = React.useState(false);

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
    let $planners = list.filter((item) => item.calendar.id === parseInt(id));
    setCalendarPlanners($planners);
    let planners = $planners.map((item) => item.title);
    setViewList(planners);
  }, [list]);

  React.useEffect(() => {
    let matched = calendarsStore.data.filter((cal) => cal.id === parseInt(id));
    if (matched.length) {
      let cal = matched[0];
      if (cal.user.id === user.id) {
        toggleCanAddPlanner(true);
      }
    }
  }, [calendarsStore.status, id]);

  return (
    <div>
      <div className="border rounded p-2">
        <p className="lead mb-0">Planners</p>
        <hr />
        {calendarPlanners.length ? (
          <nav className="nav">
            {calendarPlanners.map((item, itemIndex) => (
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
          <NoDataFound
            text={"No Planners found"}
            textClass={"small text-primary"}
          />
        )}
        {canAddPlanner === true ? (
          <div className="text-right">
            <Link
              to={`/planners/add`}
              className="text-decoration-none"
              title="Add planner"
            >
              <span className="fa fa-plus-circle"></span>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

ViewCalendarPlannerSelect.propTypes = {
  list: PropTypes.array.isRequired,
  onUpdate: PropTypes.func,
};

export default ViewCalendarPlannerSelect;

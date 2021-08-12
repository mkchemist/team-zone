import React from "react";
import { fetchPlanners } from "../../../store/actions/planner-actions";
import { getQuerySearch, imgUrl } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../../../components/NoDataFound";
import LoadingComponent from "../../../components/LoadingComponent";
import ErrorHandlingComponent from "../../../components/ErrorHandlingComponent";
import PlannerListComponent from "../../components/PlannerListComponent";
import { useLocation } from "react-router-dom";

function PlannerList() {
  const dispatch = useDispatch();
  const PlannerStore = useSelector((state) => state.PlannerStore);
  const getPlanners = () => dispatch(fetchPlanners());
  const [planners, setPlanners] = React.useState([]);
  const location = useLocation();
  const [searchKey, setSearchKey] = React.useState(null);
  React.useEffect(() => {
    if (PlannerStore.status === "idle") {
      getPlanners();
    }
    let calendar = getQuerySearch(location.search, "calendar_id");
    if (calendar) {
      let $filteredPlanners = PlannerStore.data.filter((planner) => {
        return planner.calendar.id === parseInt(calendar);
      });
      setPlanners($filteredPlanners);
    } else {
      if (searchKey && searchKey !== "") {
        setPlanners(
          PlannerStore.data.filter((planner) =>
            planner.title.toLowerCase().includes(searchKey.toLowerCase())
          )
        );
      } else {
        setPlanners(PlannerStore.data);
      }
    }
  }, [PlannerStore.status, location.search, searchKey]);

  return (
    <div className="p-2">
      <p className="lead">
        <img
          src={imgUrl("planner-box.png")}
          alt="Planner list"
          className="icon-img mr-1"
        />
        <span>Planner list</span>
      </p>
      <hr />
      <div className="my-2">
        {planners.length ? (
          <div>
            <div className="my-2">
              <input
                type="search"
                id="search_planners_list"
                name="search_planners_list"
                className="form-control form-control-sm"
                placeholder="Search planners"
                onChange={e => setSearchKey(e.target.value)}
              />
            </div>
            <hr />
            <PlannerListComponent list={planners} />
          </div>
        ) : PlannerStore.status === "succeeded" && !planners.length ? (
          <NoDataFound />
        ) : PlannerStore.status === "failed" ? (
          <ErrorHandlingComponent text={PlannerStore.error} />
        ) : (
          <LoadingComponent />
        )}
      </div>
    </div>
  );
}

export default PlannerList;

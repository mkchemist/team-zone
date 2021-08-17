import React from "react";
import asideNavTypes from "../types/aside-nav-types";
import { Link } from "react-router-dom";
import { Fragment } from "react";

function AsideNav({ items }) {
  return (
    <div className="list-group list-group-flush">
      {items.map((item, itemIndex) => (
        <Fragment key={`side_nav_item_${item.title}_${itemIndex}`}>
          {item.action && item.type === 'action' ? (
            <a href="" className="list-group-item text-decoration-none text-dark" onClick={item.action}>
              {item.icon && <span className={`${item.icon} mr-1`}></span>}
              <span>{item.title}</span>
            </a>
          ) : (
            <Link
              to={item.path}
              className="list-group-item text-decoration-none text-dark"
            >
              {item.icon && <span className={`${item.icon} mr-1`}></span>}
              <span>{item.title}</span>
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );
}

AsideNav.propTypes = asideNavTypes;

export default AsideNav;

import React from "react";
import asideNavTypes from "../types/aside-nav-types";
import { Link } from "react-router-dom";

function AsideNav({ items }) {
  return (
    <div className="list-group list-group-flush">
      {items.map((item, itemIndex) => (
        <Link
          to={item.path}
          key={`side_nav_item_${item.title}_${itemIndex}`}
          className="list-group-item text-decoration-none text-dark small"
        >
          {item.icon && <span className={item.icon}></span>}
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
}

AsideNav.propTypes = asideNavTypes;

export default AsideNav;

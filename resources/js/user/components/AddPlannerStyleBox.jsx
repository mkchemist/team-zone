import React from "react";
import iconList from "../../constant/icon-list";
import PropTypes from "prop-types";

function AddPlannerStyleBox({ defaultStyle, onUpdate }) {
  let [bgColor, setBgColor] = React.useState("#000000");
  let [color, setColor] = React.useState("#ffffff");
  let [icon, setIcon] = React.useState("fa fa-user");

  React.useEffect(() => {
    onUpdate({
      bg_color: bgColor,
      color,
      icon,
    });
  }, [bgColor, color, icon]);

  React.useEffect(() => {
    if (defaultStyle) {
      setBgColor(defaultStyle.bg_color);
      setColor(defaultStyle.color);
      setIcon(defaultStyle.icon);
    }
  }, [defaultStyle]);
  return (
    <div className="row mx-auto">
      <div className="col">
        <label htmlFor="bg_color">Background color</label>
        <input
          type="color"
          className="form-control-sm form-control"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>
      <div className="col">
        <label htmlFor="bg_color">Color</label>
        <input
          type="color"
          className="form-control-sm form-control"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="col dropdown">
        <label htmlFor="icon">icon</label>
        <a
          href=""
          className="dropdown-toggle nav-link small"
          data-toggle="dropdown"
        >
          choose icon
        </a>
        <div className="dropdown-menu p-1">
          <ul className="nav dropdown-item">
            {iconList.map((icon, i) => (
              <li
                key={`icon_${i}_${icon}`}
                className="mx-1 text-dark font-weight-bold"
                title={icon}
              >
                <input
                  type="radio"
                  name="icon"
                  id={`icon-${i}`}
                  value={icon}
                  onClick={(e) => setIcon(e.target.value)}
                  className="mr-1"
                />
                <span className={icon}></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col">
        <label htmlFor="">Sample</label>
        <p className="mb-1 px-1" style={{ backgroundColor: bgColor, color }}>
          <span className={`${icon} mr-1`}></span>
          <span>Sample Text</span>
        </p>
      </div>
    </div>
  );
}

AddPlannerStyleBox.defaultProps = {
  defaultStyle: null,
};

AddPlannerStyleBox.propTypes = {
  defaultStyle: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

export default AddPlannerStyleBox;

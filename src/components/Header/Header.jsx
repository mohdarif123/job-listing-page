import React from "react";
import { NavLink } from "react-router-dom";
import "../Header/HeaderStyle.css";

const Header = () => {
  return (
    <>
      <div className="topnav">
        <div>
          <h2 className="company_logo">Find Opportunities</h2>
        </div>
        <div>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/jobs" activeClassName="active">
            Jobs
          </NavLink>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
          <NavLink to="/notifications" activeClassName="active">
            Notifications
          </NavLink>
        </div>
        <div className="profileStyle">
          <h1>A</h1>
        </div>
      </div>
    </>
  );
};
export default React.memo(Header);

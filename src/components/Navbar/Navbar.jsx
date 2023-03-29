import React from "react";
import classNames from "classnames/bind";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Navbar = () => {
  return (
    <div className={cx("container")}>
      <Link to={"/"}>
        <img src={logo} />
      </Link>
    </div>
  );
};

export default Navbar;

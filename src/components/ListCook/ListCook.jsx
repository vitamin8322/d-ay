import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ListCook.module.css";
import { DishDataContext } from "../../App";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const ListCook = () => {
  const { data, setData, setCurrentId } = useContext(DishDataContext);

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <div className={cx("container")}>
      {data.map((d, id) => (
        <div to={`diary/${id}`} className={cx("item")} key={id}>
          <Link to={`diary/${id}`}>
            <img src={d.image} width="100%" height={"40%"} />
          </Link>
          <div style={{ padding: "5px", height: "100%" }}>
            <h2 style={{ margin: "5px" }}>{d.title}</h2>
            <div className={cx("detail")}>{d.detail}</div>
            <div className={cx("bottom")}>
              <button onClick={() => setCurrentId(id)}>Edit</button>
              <button onClick={() => handleDelete(id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCook;

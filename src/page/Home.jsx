import React from "react";
import ListCook from "../components/ListCook/ListCook";
import AddDisk from "../components/AddDisk/AddDisk";

const Home = () => {
  return (
    <div style={{ display: "flex", margin: "0 2%" }}>
      <div style={{ width: "75%" }}>
        <ListCook />
      </div>
      <AddDisk />
    </div>
  );
};

export default Home;

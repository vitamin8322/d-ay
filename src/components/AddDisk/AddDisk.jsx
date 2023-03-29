import React, { useContext, useEffect, useState } from "react";
import { DishDataContext } from "../../App";
import "./AddDish.css";

const AddDisk = () => {
  const { data, setData, setCurrentId, currentId } =
    useContext(DishDataContext);

  //   console.log(setData);
  const [dishData, setDishData] = useState({
    title: "",
    image: "",
    star: 0,
    comment: [],
    detail: "",
  });
  console.log(currentId);
  
  useEffect(() => {
    if (currentId > -1) {
      const newDishData = Object.assign({}, data[currentId]);
      setDishData(newDishData);
    }
  }, [currentId, data]);


  const hanleSubmit = (e) => {
  e.preventDefault();
  if (currentId > -1) {
    // Edit dish
    const editedDish = {
      title: dishData.title,
      image: dishData.image,
      star: dishData.star,
      detail: dishData.detail,
      comment:  [...data[0].comment,'12312123' ],
    };
    const newData = [...data];
    newData[currentId] = editedDish;
    setData(newData);
  } else {
    // Add new dish
    const newDish = {
      title: dishData.title,
      image: dishData.image,
      star: 0,
      detail: dishData.detail,
      comment: [],
    };
    setData([...data, newDish]);
  }
  setCurrentId(-10)
  setDishData({ title: "", image: "", detail: "" });
};


  const handleTitleChange = (e) => {
    setDishData({ ...dishData, title: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const url = URL.createObjectURL(selectedImage);
    setDishData({ ...dishData, image: url });
  };

  const handleDetailChange = (e) => {
    setDishData({ ...dishData, detail: e.target.value });
    console.log(e.target.value);
  };

  return (
    <div className="form-container">
      <form onSubmit={hanleSubmit}>
        <div class="form__group field">
          <input
            required=""
            placeholder="Title"
            onChange={handleTitleChange}
            class="form__field"
            value={dishData.title}
            type="input"
          />
          <label class="form__label" for="title">
            Title
          </label>
        </div>
        <label>
          Image
          <input
            type="file"
            onChange={handleImageChange}
            // value={dishData.image}
          />
        </label>
        <div class="form__group field">
          <input
            required=""
            placeholder="Detail"
            onChange={handleDetailChange}
            class="form__field"
            value={dishData.detail}
            type="text"
          />
          <label class="form__label" for="detail">
            Detail
          </label>
        </div>
        <button class="cssbuttons">
          <span>{currentId>-1 ? 'Save' : 'Add'}</span>
        </button>
      </form>
    </div>
  );
};

export default AddDisk;

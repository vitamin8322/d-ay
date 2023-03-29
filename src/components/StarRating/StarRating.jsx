import React, { useContext, useState, useCallback, useMemo } from 'react';
import './StarRating.css'
import { DishDataContext } from "../../App";
import { useParams } from 'react-router-dom';

const StarRating = () => {
  console.log('star');
  const { id } = useParams();
  const { data, setData } = useContext(DishDataContext);
  const [rating, setRating] = useState(data[id]?.star);

  const handleClick = useCallback((index) => {
    setRating(index + 1);
    const newStar = {
      ...data[id],
      star: index + 1
    }
    const newData = [...data];
    newData[id] = newStar;
  
    setData(newData)
  }, [data, id, setData]);

  const stars = useMemo(() => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        style={{cursor:'pointer', fontSize:'50px'}}
        className={index < rating ? 'filled' : ''}
        onClick={() => handleClick(index)}
      >
        ★
      </span>
    ))
  }, [handleClick, rating]);

  return (
    <div>
    {stars}
  </div>
  );
};

export default React.memo(StarRating);
import React from "react";
import { useDispatch } from "react-redux";
import s from "./Pagination.module.css";
import { arrow_left, arrow_right } from "../../Images";

export const Pagination = ({ count=1, take, previous, next }) => {
  const dispatch = useDispatch();
  
  const pagination = (next) => {
    dispatch(take(next));
  };
  return (
    <div className={s.pagination}>
      <div
        className={previous !== null ? s.vector_img : s.unactive}
        onClick={() => pagination(previous)}
      >
        <img src={arrow_left} alt="" />
      </div>
      {/* {[...Array(count)].map((_, index) => (
      
          <div key={index} className={s.pagination_box}>
            {index + 1}
          </div>
      
      ))} */}
      <div
        className={next !== null ? s.vector_img : s.unactive}
        onClick={() => pagination(next)}
      >
        <img src={arrow_right} alt="" />
      </div>
    </div>
  );
};
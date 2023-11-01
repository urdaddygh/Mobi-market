import React from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Pagination.module.css";
import { arrow_left, arrow_right } from "../../Images";

export const Pagination = ({ page, take, previous, next, takeTwo }) => {
  const dispatch = useDispatch();
  const products = useSelector(state=>state.products.products)

  let count = products.count  
  let totalPages = Math.ceil(products.count /2) 
  // let p = Array(pages)
  // console.log(pages)
  const pagination = (next) => {
    dispatch(take(next));
  };

  // let current = next[next.length - 1]
  // console.log(current)

  return (
    <div className={s.pagination}>
      <div
        className={previous !== null ? s.vector_img : s.unactive}
        onClick={() => pagination(previous)}
      >
        <img src={arrow_left} alt="" />
      </div>
      {count!==undefined?[...Array(totalPages)].map((_, index) => (
        <div
          key={index}
          className={page===index+1?s.pagination_box:s.pagination_unactive}
          onClick={() => dispatch(takeTwo(index + 1))}
        >
          {index + 1}
        </div>
      )):<>sadsa</>}
      <div
        className={next !== null ? s.vector_img : s.unactive}
        onClick={() => pagination(next)}
      >
        <img src={arrow_right} alt="" />
      </div>
    </div>
  );
};

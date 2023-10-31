import React, { useEffect } from "react";
import s from "./MainPage.module.css";
import NavBar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { heart_icon, img, liked_icon } from "../../Images";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsForPagination,
} from "../../redux/slices/productsApiSlice";
import Skeleton from "../../components/skeleton/Skeleton";
import { Pagination } from "../../components/pagination/Pagination";

function MainPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const err = useSelector((state) => state.products.error);

  let count = products.count / 2
   Math.ceil(count)
  // console.log(count)
  console.log(products);
  useEffect(() => {
    dispatch(getProducts(1));
  }, []);
  return (
    <main>
      <Header name="Алеся" username="sergeykrash01" />
      <section className={s.first_section}>
        {err ? (
          products.results.map((el) => (
            <div className={s.product_card} key={el.id}>
              <img src={el.image} alt="" width="142px" height="85px" />
              <h4>{el.name}</h4>
              <p>{el.price}</p>
              <div className={s.heart_icon}>
                <img src={heart_icon} alt="" />
                <span> {el.like_count}</span>
              </div>
            </div>
          ))
        ) : (
          <Skeleton count={32} />
        )}
      </section>
      <div className={s.pagination_cont}>
        <Pagination
          count={count}
          next={products.next}
          previous={products.previous}
          take={getProductsForPagination}
        />
      </div>
    </main>
  );
}

export default MainPage;

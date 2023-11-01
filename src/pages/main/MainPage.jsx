import React, { useEffect, useState } from "react";
import s from "./MainPage.module.css";
import Header from "../../components/header/Header";
import { heart_icon, img, liked_icon, red_heart_icon } from "../../Images";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsById,
  getProductsForPagination,
  likeProduct,
} from "../../redux/slices/productsApiSlice";
import Skeleton from "../../components/skeleton/Skeleton";
import { Pagination } from "../../components/pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import ModalForProduct from "../../components/modalForProduct/ModalForProduct";
import ModalForAddProduct from "../../components/modalForAddProduct/ModalForAddProduct";
import { ModalForCancel } from "../../components/modalForCancel/ModalForCancel";

function MainPage() {
  const [modalActive, setModalActive] = useState(false);
  const [secondModalActive, setSecondModalActive] = useState(false);
  const [cancelModalActive, setCancelModalActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(1));
  }, []);

  const showToastMessage = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };
  const showSuccessMessage = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };

  const products = useSelector((state) => state.products.products);
  const product = useSelector((state) => state.products.product);
  const err = useSelector((state) => state.products.error);
  const likeErr = useSelector((state) => state.products.likeErr);
  console.log(product);

  const likeProductById = (id, e) => {
    e.stopPropagation();
    dispatch(likeProduct(id));
    if (!likeErr) showToastMessage("Подтвердите свой аккаунт пожалуйста");
    else showSuccessMessage("Товар добавлен в понравившиеся");
  };

  const getProductForModal = (data) => {
    dispatch(getProductsById(data));
    setModalActive(true);
  };

  const clickOnNo=()=>{
    setCancelModalActive(false)
  }
  const clickOnYes=()=>{
    setCancelModalActive(false)
    setSecondModalActive(false)
  }
  return (
    <main>
      <ToastContainer />
      <Header
        name="Алеся"
        username="sergeykrash01"
        onClick={() => setSecondModalActive(true)}
      />
      <section className={s.first_section}>
        {err ? (
          products.results.map((el) => (
            <div
              className={s.product_card}
              key={el.id}
              onClick={() => getProductForModal(el.id)}
            >
              <img src={el.image} alt="" width="142px" height="85px" />
              <h4>{el.name}</h4>
              <p>{el.price}</p>
              <div className={s.heart_icon}>
                <img
                  src={el.liked_by_current_user ? red_heart_icon : heart_icon}
                  alt=""
                  onClick={(e) => likeProductById(el.id, e)}
                  className={s.heart}
                />
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
          page={products.page}
          next={products.next}
          previous={products.previous}
          take={getProductsForPagination}
          takeTwo={getProducts}
        />
      </div>

      <ModalForProduct
        active={modalActive}
        setActive={setModalActive}
        full_description={product.full_description}
        id={product.id}
        image={product.image}
        likeProductById={likeProductById}
        like_count={product.like_count}
        liked_by_current_user={product.liked_by_current_user}
        name={product.name}
        price={product.price}
        short_description={product.short_description}
        closeModal={() => setModalActive(false)}
      />
      <ModalForAddProduct
        active={secondModalActive}
        setActive={() => setCancelModalActive(true)}
        closeModal={() => setCancelModalActive(true)}
      />
      {cancelModalActive && (
        <ModalForCancel yesClick={clickOnYes} noClick={clickOnNo} />
      )}
      {/* <ModalForCancel/> */}
    </main>
  );
}

export default MainPage;

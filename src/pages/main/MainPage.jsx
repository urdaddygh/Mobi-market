import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import s from "./MainPage.module.css";
import Header from "../../components/header/Header";
import { heart_icon, img, liked_icon, red_heart_icon } from "../../Images";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsById,
  getProductsForPagination,
  likeProduct,
  unLikeProduct,
} from "../../redux/slices/productsApiSlice";
import Skeleton from "../../components/skeleton/Skeleton";
import { Pagination } from "../../components/pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import ModalForProduct from "../../components/modalForProduct/ModalForProduct";
import ModalForAddProduct from "../../components/modalForAddProduct/ModalForAddProduct";
import { ModalForCancel } from "../../components/modalForCancel/ModalForCancel";
import { getInfoOfUser, updateProfilePage } from "../../redux/slices/profileSlice";
import DeleteModal from "../../components/deleteModal/DeleteModal";

function MainPage() {
  const [modalActive, setModalActive] = useState(false);
  const [secondModalActive, setSecondModalActive] = useState(false);
  const [cancelModalActive, setCancelModalActive] = useState(false);
  const [deleteModalActive, setDeleteModalActive] = useState(false)
  const dispatch = useDispatch(); 

  const showToastMessage = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };
  
  const showSuccessMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };

  const updatePage=()=>{
    dispatch(getProducts(products.page))
  }

  const products = useSelector((state) => state.products.products);
  const product = useSelector((state) => state.products.product);
  const err = useSelector((state) => state.products);
  const userInfo = useSelector((state) => state.profile.user);
  // console.log(products);

  const likeProductById = (id, e) => {
    e.stopPropagation();
    let data = {value:{product:id}, showToastMessage, showSuccessMessage, updatePage}
    dispatch(likeProduct(data));
    setDeleteModalActive(false)
    setModalActive(false)
  };

  const unLikeProductById = (id, e) => {
    e.stopPropagation();
    setSecondModalActive(false)
    setModalActive(false)
    setDeleteModalActive(false)
    let data = {id, updatePage}
    dispatch(unLikeProduct(data));
  };

  const getProductForModal = (data) => {
    dispatch(getProductsById(data));
    setModalActive(true);
  };

  const activeModal =()=>{
    setDeleteModalActive(false)
    setModalActive(true)
  }

  const clickOnNo=()=>{
    setCancelModalActive(false)
  }
  const clickOnYes=()=>{
    setCancelModalActive(false)
    setSecondModalActive(false)
  }
  useEffect(() => {
    dispatch(getProducts(1));
    dispatch(getInfoOfUser())
  }, []);

  return (
    <main>
      <ToastContainer />
      <Header
        name={userInfo?.first_name}
        username={userInfo?.username}
        onClick={() => setSecondModalActive(true)}
        to="/profile/profilePage"
      />
      <section className={s.first_section}>
        {err?.error ? (
          products?.results.map((el) => (
            <div
              className={s.product_card}
              key={el.id}
              onClick={() => getProductForModal(el.id)}
            >
              <img
                src={el.images[0].image}
                alt=""
                width="142px"
                height="85px"
              />
              <h4>{el.name}</h4>
              <p>{el.price}</p>
              <div className={s.heart_icon}>
                <img
                  src={el.liked_by_current_user ? red_heart_icon : heart_icon}
                  alt=""
                  onClick={
                    el.liked_by_current_user
                      ? (e) => unLikeProductById(el.id, e)
                      : (e) => likeProductById(el.id, e)
                  }
                  className={s.heart}
                />
                <span> {el.like_count}</span>
              </div>
            </div>
          ))
        ) : (
          <Skeleton count={2} />
        )}
      </section>
      {products?.count > 3 && (
        <div className={s.pagination_cont}>
          <Pagination
            page={products?.page}
            next={products?.next}
            previous={products?.previous}
            take={getProductsForPagination}
            takeTwo={getProducts}
            count={products?.count}
          />
        </div>
      )}

      <ModalForProduct
        active={modalActive}
        setActive={setModalActive}
        full_description={product.full_description}
        id={product.id}
        image={product?.images}
        likeProductById={likeProductById}
        like_count={product.like_count}
        liked_by_current_user={product.liked_by_current_user}
        name={product.name}
        price={product.price}
        short_description={product.short_description}
        closeModal={() => setModalActive(false)}
        phone_number={product.phone_number}
        deleteModalActive={setDeleteModalActive}
      />
      <ModalForAddProduct
        active={secondModalActive}
        setActiveSuccess={setSecondModalActive}
        setActive={() => setCancelModalActive(true)}
        closeModal={() => setCancelModalActive(true)}
      />
      {cancelModalActive && (
        <ModalForCancel
          yesClick={clickOnYes}
          noClick={clickOnNo}
          text="Вы действительно хотите отменить добавление товара?"
        />
      )}
      <DeleteModal
        acitve={deleteModalActive}
        setActive={setDeleteModalActive}
        onClick={(e) => unLikeProductById(product.id, e)}
        cancelClick={activeModal}
      />
    </main>
  );
}

export default MainPage;

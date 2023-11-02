import React, { useEffect, useState } from 'react'
import BackToPrevBtn from '../../../components/backToPrevBtn/BackToPrevBtn'
import s from './LikedProduct.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getLikedProducts, getProductsById } from '../../../redux/slices/productsApiSlice';
import { heart_icon, red_heart_icon } from '../../../Images';
import Skeleton from '../../../components/skeleton/Skeleton';
import { Pagination } from '../../../components/pagination/Pagination';

function LikedProduct() {

  const [modalActive, setModalActive] = useState(false);
  const [secondModalActive, setSecondModalActive] = useState(false);
  const [cancelModalActive, setCancelModalActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikedProducts());
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

  const products = useSelector((state) => state.products.likedProducts);
  // const product = useSelector((state) => state.products.product);
  const err = useSelector((state) => state.products.error);
  const likeErr = useSelector((state) => state.products.likeErr);
  console.log(products);

  // const likeProductById = (id, e) => {
  //   e.stopPropagation();
  //   dispatch(likeProduct(id));
  //   if (!likeErr) showToastMessage("Подтвердите свой аккаунт пожалуйста");
  //   else showSuccessMessage("Товар добавлен в понравившиеся");
  // };

  const getProductForModal = (data) => {
    dispatch(getProductsById(data));
    setModalActive(true);
  };

  return (
    <>
      <BackToPrevBtn to="/main"/>  
      <h2 className={s.h2}>Понравившиеся</h2>
      <div className={s.cont}>
      {err ? (
          products?.map((el) => (
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
                  // onClick={(e) => likeProductById(el.id, e)}
                  className={s.heart}
                />
                <span> {el.like_count}</span>
              </div>
            </div>
          ))
        ) : (
          <Skeleton count={16} margin="87px 0 0 0" />
        )}
      </div>
      <Pagination />
    </>
  )
}

export default LikedProduct
import React, { useEffect, useState } from 'react'
import BackToPrevBtn from '../../../components/backToPrevBtn/BackToPrevBtn'
import s from './MyProduct.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { getLikedProducts, getMyProducts, getProducts, getProductsById, getProductsForPagination, likeProduct, unLikeProduct } from '../../../redux/slices/productsApiSlice';
import { empty_icon, heart_icon, red_heart_icon } from '../../../Images';
import Skeleton from '../../../components/skeleton/Skeleton';
import { Pagination } from '../../../components/pagination/Pagination';
import ModalForProduct from '../../../components/modalForProduct/ModalForProduct';
import DeleteModal from '../../../components/deleteModal/DeleteModal';
import ModalForChangeProduct from '../../../components/modalForChangeProduct/ModalForChangeProduct';
function MyProduct() {

    const [modalActive, setModalActive] = useState(false);
    const [secondModalActive, setSecondModalActive] = useState(false);
    const [cancelModalActive, setCancelModalActive] = useState(false);
    const [isChanging, setIsChanging] = useState(false)
    const activeModal =()=>{
      setSecondModalActive(false)
      setModalActive(true)
    }
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getMyProducts(1));
    }, []);
  
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
  
    const products = useSelector((state) => state.products.myProducts);
    const product = useSelector((state) => state.products.product);
    const err = useSelector((state) => state.products.getMyProductsErr);
    console.log(err);

    const updatePage = ()=>{
      dispatch(getMyProducts(products.page))
    }

    const likeProductById = (id, e) => {
      e.stopPropagation();
      let data = {value:{product:id}, showToastMessage, showSuccessMessage, updatePage}
      dispatch(likeProduct(data));
    };

    const unLikeProductById = (id, e) => {
      e.stopPropagation();
      setSecondModalActive(false)
      let data = {id, updatePage}
      dispatch(unLikeProduct(data));
    };

    const getProductForModal = (data) => {
      dispatch(getProductsById(data));
      setModalActive(true);
    };

    const openDeleteModal=(id, e)=>{
      e.stopPropagation();
      dispatch(getProductsById(id))
      setSecondModalActive(true)
    }

    const closeModal = ()=>{
      setModalActive(false)
      setIsChanging(false)
    }
  return (
    <>
      <ToastContainer />
      <BackToPrevBtn to="/main" />
      <h2 className={s.h2}>Мои товары</h2>
      {products?.count !== 0 ? (
        <>
          <div className={s.cont}>
            {err ? (
              products?.results.map((el, index) => (
                <div
                  className={s.product_card}
                  key={index}
                  onClick={() => getProductForModal(el.id)}
                >
                  <img src={el.images[0].image} alt="" width="142px" height="85px" />
                  <h4>{el.name}</h4>
                  <p>{el.price}</p>
                  <div className={s.heart_icon}>
                    <img
                      src={
                        el.liked_by_current_user ? red_heart_icon : heart_icon
                      }
                      alt=""
                      onClick={
                        el.liked_by_current_user
                          ? (e) => openDeleteModal(el.id, e)
                          : (e) => likeProductById(el.id, e)
                      }
                      className={s.heart}
                    />
                    <span> {el.like_count}</span>
                  </div>
                </div>
              ))
            ) : (
              <Skeleton count={16} />
            )}
          </div>
          {products?.count >3&&
          <Pagination
            page={products.page}
            next={products.next}
            previous={products.previous}
            take={getProductsForPagination}
            takeTwo={getProducts}
            count={products.count}
          />}
        </>
      ) : (
        <img src={empty_icon} className={s.empty_icon} />
      )}
      <ModalForChangeProduct
        active={modalActive}
        setActive={closeModal}
        full_description={product.full_description}
        id={product.id}
        image={product.images}
        name={product.name}
        price={product.price}
        short_description={product.short_description}
        closeModal={closeModal}
        isChanging={isChanging}
        setIsChanging={setIsChanging}
        myProductsPage={products.page}
      />
      <DeleteModal
        acitve={secondModalActive}
        setActive={secondModalActive}
        onClick={(e) => unLikeProductById(product.id, e)}
        cancelClick={activeModal}
      />
    </>
  );
}

export default MyProduct
import React from "react";
import s from './Skeleton.module.css'
function Skeleton({ count = 1 }) {
  return (
    <>
      {count > 1 ? (
        <ul className={s.list}>
          {[...Array(count)].map((_, index) => (
            <li key={index} className={s.box}></li>
          ))}
        </ul>
      ) : (
        <li className={s.box}></li>
      )}
    </>
  );
}

export default Skeleton;

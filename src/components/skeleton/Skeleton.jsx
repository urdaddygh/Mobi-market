import React from "react";
import s from './Skeleton.module.css'
function Skeleton({ count = 1,margin }) {
  return (
    <>
      {count > 1 ? (
        <ul className={s.list} style={{margin:margin}}>
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

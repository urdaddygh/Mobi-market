import React from 'react'
import './Modal.css'

export const Modal = ({active, setActive, children, width, height}) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={()=>setActive(false)}>
        <div className='modal_content' onClick={e=>e.stopPropagation()} style={{width:width, height:height}}>
          {children}
        </div>
    </div>
  )
}
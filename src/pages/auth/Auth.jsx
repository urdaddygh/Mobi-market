import React from 'react'
import s from "./styles.module.css"
import BackToPrevBtn from '../../components/backToPrevBtn/BackToPrevBtn'


function Auth() {
  return (
    <>
        <BackToPrevBtn to={"/register/email"}/>
    </>
  )
}

export default Auth
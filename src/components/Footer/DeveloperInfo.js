import React from 'react'
import style from './DeveloperInfo.module.css'



const DeveloperInfo = () => {
  return (
    <div className={style.dev_info}>
        @ Developed By<a href='http://saaddev-io.web.app/' target='_blank' rel="noreferrer">SaadDev</a>
    </div>
  )
}

export default DeveloperInfo
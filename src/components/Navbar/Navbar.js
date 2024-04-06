import React, {useContext, useEffect, useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import style from './Navbar.module.css'
import MessContext from "../../Context/MessContext";


const Navbar = () => {

  const navigate = useNavigate()

    let mess  = localStorage.getItem('mess')

  let token = localStorage.getItem('token')
  let username = localStorage.getItem('username')

  const onLogout = async() => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
      localStorage.removeItem('mess')
    
    let response = await fetch('http://saaddev.pythonanywhere.com/mms/logout/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })

    let data = await response.json()
    navigate('/')
    window.location.reload()
  }

  let menu = document.querySelector(".menu");
  const navMenu = () => {
    let navBar = document.querySelector(".navbar");
    navBar.classList.toggle("active");
    menu = document.querySelector(".menu");
    menu.classList.toggle("bar");
  }

  let [admins, setAdmins] = useState([])

    useEffect(()=>{
        getAdmins()
    }, [])

  let getAdmins = async () => {
      let response = await fetch('http://saaddev.pythonanywhere.com/mess/get_all_admin/')
      let data = await response.json()
      setAdmins(data)
  }

  return (
    <div className={style.nav}>
      <h2 className='title'>MMS</h2>
        <h3 className='responsive_title'>Mess Management System</h3>
      <div className="menu" style={{cursor:'pointer', width: 30}} onClick={navMenu}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
      </div>
      <div className='wrapper navbar'>
        {token ?
        <>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/documentation/'>Documentation</NavLink>
          <NavLink to='/students'>Student</NavLink>
          {
             admins.map((admin)=>(
                admin === username ?
              <NavLink to='/office'>Office</NavLink>
                  :
                  <></>
             ))
          }
          <NavLink to='/make_payment/'>Payment</NavLink>
          <NavLink to='/profile/'><strong>{username}</strong></NavLink>
          <NavLink onClick={onLogout}>Logout</NavLink>
        </>:
        <>
          <NavLink to='/documentation/'>Documentation</NavLink>
          <NavLink to='/welcome'>New Mess Setup</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/signup'>Sign Up</NavLink>

        </> }
      </div>
    </div>
  )
}

export default Navbar
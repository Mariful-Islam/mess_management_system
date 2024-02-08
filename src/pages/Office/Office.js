import React, {useEffect, useState} from 'react'
import PaymentConfirm from "../../components/PaymentConfirm";
import PaymentList from "../../components/PaymentList";
import {NavLink} from 'react-router-dom'

const Office = () => {

    let username = localStorage.getItem('username')

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
    <div className='wrapper'>
        {
            admins.map((admin)=>(

            admin===username ?
                <>
                    <PaymentConfirm/>
                    <br/> <br/>
                    <PaymentList/>
                    <br/> <br/> <br/>
                </>

            :
            <p className='tsc'></p> ))
        }

    </div>
  )
}

export default Office
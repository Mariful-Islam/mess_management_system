import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Welcome =()=>{

    let onSetup = async (e) => {
        e.preventDefault()
        onSignup(e)
        let res = await fetch('http://saaddev.pythonanywhere.com/mess/setup/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"mess_name": e.target.mess_name.value,
                "location": e.target.location.value,
                "username": e.target.username.value,
                "email": e.target.email.value,
                "password": e.target.password.value
            })
        })
        let data = await res.json()
    }

    let [user, setUser] = useState([])

  const navigate = useNavigate()

  let [errorMsg, setErrorMsg] = useState("")

  let onSignup = async(e) => {
    e.preventDefault()
      let response = await fetch('http://saaddev.pythonanywhere.com/mms/signup/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"username": e.target.username.value,
                            "email": e.target.email.value,
                            "password": e.target.password.value})
      })
      let data = await response.json()
      setUser(data)

      localStorage.setItem('username', data['username'])
      localStorage.setItem('token', data['token'])

      navigate('/')
      window.location.reload()

  }

    return (
        <div>
            <h3 style={{textAlign: "center"}}>Welcome To Mess Management System</h3>
            <form onSubmit={onSetup}>
                <input type='text' name='mess_name' placeholder='Mess Name'/>
                <input type='text' name='location' placeholder='Location'/>
                <input type='text' name='username' placeholder='Admin Username'/>
                <input type='email' name='email' placeholder='Admin Email'/>
                <input type='password' name='password' placeholder='Password'/>
                <input type='submit' value='Setup'/>
            </form>
        </div>
    )
}

export default Welcome

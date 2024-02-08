import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const SignUp = () => {
  let [user, setUser] = useState([])

  const navigate = useNavigate()

  let [errorMsg, setErrorMsg] = useState("")

  let onSignup = async(e) => {
    e.preventDefault()
    if (e.target.password1.value===e.target.password2.value) {
      let response = await fetch('http://saaddev.pythonanywhere.com/mms/signup/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"username": e.target.username.value, 
                            "email": e.target.email.value, 
                            "password": e.target.password1.value})
      })
      let data = await response.json()
      setUser(data)

      localStorage.setItem('username', data['username'])
      localStorage.setItem('token', data['token'])


      navigate('/')
      window.location.reload()

    }else{
        setErrorMsg("Password Not Matched")
    }
  }

  return (
    <div className='wrapper height_wrapper'>
        <h3 style={{textAlign:'center'}}>Sign Up</h3>
        <form method='POST' onSubmit={(e)=>onSignup(e)}>
        <p className='tsc' style={{color:'orangered'}}>{errorMsg}</p>
          <input type='text' name='username' placeholder='Username' />
          <input type='email' name='email' placeholder='Email' />
          <input type='password' name='password1' placeholder='Password' />
          <input type='password' name='password2' placeholder='Confirm Password' />
      
          <input type='submit' value='Sign Up' /> 
          <br/><br/><br/>
          <Link to='/login/'>Login</Link>
        </form>
      </div>
  )
}

export default SignUp
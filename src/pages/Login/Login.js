import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  let navigate = useNavigate()

  let [errorMsg, setErrorMsg] = useState("")

  let onLogin = async(e) => {
    e.preventDefault()
    let response = await fetch('http://saaddev.pythonanywhere.com/mms/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"username": e.target.username.value,
                          "password": e.target.password.value})
    })
    let data = await response.json()
    if (data==="Invalid Credintial"){
      setErrorMsg(data)
    }else{
      localStorage.setItem('username', data['username'])
      localStorage.setItem('token', data['token'])
      localStorage.setItem('mess', data['mess'])
      navigate('/')

    } 
  }
  return (
    <div className='wrapper height_wrapper'>
      <h3 style={{textAlign:'center'}}>Login</h3>
      <form method='POST' onSubmit={(e)=>onLogin(e)}>
        <p className='tsc' style={{color:'orangered'}}>{errorMsg}</p>
        <input type='text' name='username' placeholder='Username' />
        <input type='text' name='password' placeholder='Password' />
        <input type='submit' value='Login' /> <br/><br/><br/>
        <Link style={{textAlign:'center'}} to='/signup/'>SignUp</Link>
      </form>
    </div>
  )
}

export default Login
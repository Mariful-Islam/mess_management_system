import React, {useEffect, useState} from 'react'

const StudentForm = () => {

  let username = localStorage.getItem('username')

    let [mess, setMess] = useState("")

  let [res, setRes] = useState("")

  let StudentFormHandle = async(e) =>{

      e.preventDefault()
      let response = await fetch('http://saaddev.pythonanywhere.com/mms/student_form/', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"username": username,
                                "mess": e.target.mess.value,
                                "room": e.target.room.value,
                                "nid": e.target.nid.value,
                                "phone": e.target.phone.value,
                                "dept": e.target.dept.value,
                                "district": e.target.district.value,
                                "division": e.target.division.value
                              })
        })

      localStorage.setItem('mess', e.target.mess.value)
      let data = await response.json()
      setRes(data)
  }

   let [messes, setMesses] = useState([])

    useEffect(()=>{
        getMesses()
    }, [])

  let getMesses = async () => {
      let response = await fetch('http://saaddev.pythonanywhere.com/mess/get_messes/')
      let data = await response.json()
      setMesses(data)
  }


  return (
    <div className='wrapper height_wrapper'>
      <h3 style={{textAlign: 'center'}}>Student Form</h3>
      <form onSubmit={(e)=>StudentFormHandle(e)}>
        {res.length===0 ? 
        <>
            <select className='select_item' name='mess' onChange={(e)=>setMess(e.target.value)}>
                {messes.map((mess)=>(
                    <option value={mess.mess_name}>{mess.mess_name}</option>
                ))}
            </select>
          <input type='text' name='room' placeholder='Room Number' />
          <input type='text' name='nid' placeholder='NID' />
          <input type='text' name='phone' placeholder='Phone' />
          <input type='text' name='dept' placeholder='Dept' />
          <input type='text' name='district' placeholder='District' />
          <input type='text' name='division' placeholder='division' />
          <input type='submit' value='Submit' />
         </>: <p className='tsc'>{res}</p> }
      </form>
    </div>
  )
}

export default StudentForm
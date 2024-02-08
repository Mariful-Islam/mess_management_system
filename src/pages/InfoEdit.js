import React, {useEffect, useState} from "react";

const InfoEdit = () => {
    let username = localStorage.getItem('username')

    let [user, setUser] = useState([])

    let [res, setRes] = useState("")

    let [verify, setverify] = useState("")

    let usernameVerification = async (e) => {
        let response = await fetch(`http://saaddev.pythonanywhere.com/mms/username_verification/${e}/`)
        let data = await response.json()
        setverify(data)
    }

    let EditFormHandle = async (e) => {
        e.preventDefault()
      let res = await fetch(`http://saaddev.pythonanywhere.com/mms/edit_info/${username}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username: e.target.username.value,
                                room: e.target.room.value,
                                nid: e.target.nid.value,
                                email: e.target.email.value,
                                phone: e.target.phone.value,
                                dept: e.target.dept.value,
                                district: e.target.district.value,
                                division: e.target.division.value
                              })
        })
        let data = await res.json()
        setRes(data)
        usernameVerification()
    }


    let [student, setStudent] = useState({username:"", room_num: 0, nid: 0, phone:"", email: "", dept: "", district: "", division: ""})

    useEffect(()=>{
        getStudent()
    }, [])

    let getStudent = async() => {
        let response = await fetch(`/mms/student/${username}/`)
        let data = await response.json()
        setStudent(data)
    }



    return (
        <div>
            <h3 style={{textAlign:"center"}}>Edit</h3>
            <p className='tsc' style={{textAlign: "center"}}>{res}</p>
            <form onSubmit={(e)=>EditFormHandle(e)}>
                <input type='text' name='username' placeholder='username' value={student.username} onChange={(e)=>setStudent({username: e.target.value})}/>
                <p className='tsc'>{verify}</p>
                <input type='text' name='room' placeholder='Room Number' value={student.room_num} onChange={(e)=>setStudent({room_num: e.target.value})}/>
                <input type='text' name='nid' placeholder='NID' value={student.nid} onChange={(e)=>setStudent({nid: e.target.value})}/>
                <input type='email' name='email' placeholder='Email' value={student.email} onChange={(e)=>setStudent({email: e.target.value})}/>
                <input type='text' name='phone' placeholder='Phone' value={student.phone} onChange={(e)=>setStudent({phone: e.target.value})}/>
                <input type='text' name='dept' placeholder='Dept' value={student.dept} onChange={(e)=>setStudent({dept: e.target.value})}/>
                <input type='text' name='district' placeholder='District' value={student.district} onChange={(e)=>setStudent({district: e.target.value})}/>
                <input type='text' name='division' placeholder='division' value={student.division} onChange={(e)=>setStudent({division: e.target.value})}/>
                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}

export default InfoEdit
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PaymentHistory from "../components/PaymentHistory";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    let navigate = useNavigate()
    let username = localStorage.getItem('username')

    let [student, setStudent] = useState("")
    
    useEffect(()=>{
        getStudent()
    }, [])

    let getStudent = async() => {
        let response = await fetch(`http://saaddev.pythonanywhere.com/mms/student/${username}/`)
        let data = await response.json()
        setStudent(data)
    }

    let onEdit = async () => {
        navigate('/edit/')
    }

    let [leave, setLeave] = useState("")

    let onLeaveHandle = async () => {
        let res = await fetch(`http://saaddev.pythonanywhere.com/mms/leave_request/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username})
        })
        let data = await res.json()
        setLeave(data)
        getStudent()

    }
    let mess = localStorage.getItem('mess')

  return (
    <div className='profile'>
        
        {student.length===0 ? 
            <p className='tsc'>You have no student account kindly <Link to='/student_form/'>visit here</Link></p> 
            :
            <div>
                <p className='tsc'>{leave}</p>
                {student.sts==="leaving" || student.sts === "exit" ?
                    <></>
                    :
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap:20}}>
                        <svg onClick={onEdit} className="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24"
                             stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"/>
                            <path d="M13.5 6.5l4 4"/>
                        </svg>
                        <svg onClick={onLeaveHandle} className='exit' viewBox="0 0 512 512" height='20' width='20'>
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                        </svg>
                    </div>
                }

                <p><strong>Name: </strong>{username} </p>
                <p><strong>Associated Mess: </strong>{mess} </p>
                <p><strong>Room Number: </strong>{student.room_num} </p>
                <p><strong>NID: </strong> {student.nid}</p>   
                <p><strong>Phone: </strong> {student.phone}</p>
                <p><strong>Email: </strong> {student.email}</p>
                <p><strong>Department: </strong> {student.dept}</p>
                <p><strong>District: </strong> {student.district}</p>
                <p><strong>Division: </strong> {student.division}</p>
                <p><strong>Joined: </strong> {student.get_date_created}</p>
                <p style={{display: 'flex', justifyContent: "space-around", alignItems: "center"}}><strong>Status: </strong>
                    {student.sts === "active" ? <div className='active_student'></div> :
                      student.sts === "leaving" ? <><div className='leaving_student'></div>{30-(student.get_date_updated.slice(0,2)-Date().slice(8,10))} days left</> :
                      student.sts === "exit" ? <div className='exit_student'></div> : <></>
                    }
                </p>
            </div>
    }
        <div className='profile_history'>
            <PaymentHistory/>
        </div>
    </div>
  )
}

export default Profile
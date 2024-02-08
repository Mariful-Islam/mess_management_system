import React, { createContext, useState, useEffect } from 'react'


const StudentContext = createContext()
export default StudentContext


export const StudentProvider = ({children}) => {

    let [students, setstudents] = useState([])

    useEffect(()=>{
        getstudents()
    }, [])

    let getstudents = async() => {
        let response = await fetch('http://saaddev.pythonanywhere.com/mms/students/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({'mess': localStorage.getItem('mess')})
        })
        let data = await response.json()
        setstudents(data)
    }

    let data = {
        students: students,
        getstudents: getstudents
    }

  return (
    <div>
        <StudentContext.Provider key={students} value={data}>
            {children}
        </StudentContext.Provider>
    </div>
  )
}

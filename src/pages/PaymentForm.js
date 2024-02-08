import React, {useContext, useEffect, useState} from "react";
import StudentContext from "../Context/StudentContext";

let PaymentForm = () => {

    let username = localStorage.getItem('username')

    let [res, setRes] = useState("")

    let paymentHandler = async (e) => {
        e.preventDefault()
        let res = await fetch('http://saaddev.pythonanywhere.com/mms/make_payment/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username:username, tk: e.target.tk.value, month: e.target.month.value})
        })
        let data = await res.json()
        setRes(data)
    }


    let [student, setStudent] = useState("")

    useEffect(()=>{
        getStudent()
    }, [])

    let getStudent = async() => {
        let response = await fetch(`http://saaddev.pythonanywhere.com/mms/student/${username}/`)
        let data = await response.json()
        setStudent(data)
    }

    return(
        <div className='wrapper height_wrapper'>
            {student.sts === "exit" ?
                <p className='tsc' style={{textAlign:'center'}}>You left the mess that's why you cannot access payment form</p>
                :
                <>
                    <h3 style={{textAlign:"center"}}>Payment Form</h3>
                    {res.length === 0 ?
                    <form method='POST' onSubmit={(e)=>paymentHandler(e)}>
                        <input type='text' name='tk' placeholder='tk'/>
                        <select name='month' className='select_item'>
                            <option value='January'>January</option>
                            <option value='February'>February</option>
                            <option value='March'>March</option>
                            <option value='April'>April</option>
                            <option value='May'>May</option>
                            <option value='June'>June</option>
                            <option value='July'>July</option>
                            <option value='August'>August</option>
                            <option value='September'>September</option>
                            <option value='October'>October</option>
                            <option value='November'>November</option>
                            <option value='December'>December</option>
                        </select>
                        <input type='submit' value='Pay'/>
                    </form> :
                    <p className='tsc' style={{textAlign:"center"}}>{res}</p> }
                    </>}
        </div>
    )
}

export default PaymentForm
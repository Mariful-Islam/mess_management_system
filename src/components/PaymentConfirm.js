import React, {useEffect, useState} from "react";

const PaymentConfirm =()=>{
    let username = localStorage.getItem('username')
    let mess = localStorage.getItem('mess')

    let [students, setStudents] = useState([])

    useEffect(()=>{
        getStudents()
    },[])

    let getStudents = async () => {
        let response = await fetch(`https://saaddev.pythonanywhere.com/mms/payment_confirmation/${mess}/`)

        let data = await response.json()
        setStudents(data)
    }

    let [conMsg, setConMsg] = useState("")

    let onConfirm = async (e, id, username) =>{
        e.preventDefault()
        let response = await fetch(`https://saaddev.pythonanywhere.com/mms/payment_confirmation/${mess}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"id": id, "username": username})
        })
        let data = await response.json()
        setConMsg(data)
        getStudents()
    }

    let [src, setSrc] = useState([])
    let [srcFilter, setSrcFilter] = useState([])

    useEffect(()=>{
        onSearch()
    }, [src])

    let onSearch = () => {
        let filterItems = students.filter((student)=>student.username.toLowerCase().includes(src.toLowerCase()))
        setSrcFilter(filterItems)
    }

    return(
        <div>
            <h3 style={{textAlign: 'center'}}>Payment Confirmation</h3>
            <div style={{backgroundColor:'#eeeeee', padding:20, borderRadius:7}}>
            <p className='tsc' style={{textAlign: 'center'}}>{conMsg}</p>
            <div>
                <h4 style={{width:180}}>Total: {students.length}</h4>
                <form style={{marginTop:-50}} >
                    <input type='text' placeholder='search' name='search'
                        onChange={(e)=>setSrc(e.target.value)}
                    />
                </form>
            </div>

                <div className='payment_confirmation'>
                    <div>
                        <h4>Name</h4>
                        <h4>Room Number</h4>
                        <h4>Tk</h4>
                        <h4>Month</h4>
                        <h4>Time</h4>
                    </div>
                </div>

                <div style={{overflowY:"auto", height:250}}>
                    <div className='payment_confirmation'>
                        {src.length===0 ?

                            students.map((student)=>(
                            student.is_paid.toString() === "false" ?

                                <div>
                                    <p>{student.username}</p>
                                    <p>{student.room_num}</p>
                                    <p>{student.tk} tk</p>
                                    <p>{student.month}</p>

                                    <p>{student.get_date} {student.get_time}</p>
                                    <form method='POST' onSubmit={(e)=>onConfirm(e, student.id, student.username)}>
                                        <input type='submit' value='Confirm'/>
                                    </form>
                                </div>
                                :
                                <p className='tsc'>No Payment History</p>
                        )):
                            srcFilter.length === 0 ?
                                <p>Not Found</p>
                                :
                                srcFilter.map((student)=>(
                                    student.is_paid.toString() === "false" ?
                                    <div>
                                        <p>{student.username}</p>
                                        <p>{student.room_num}</p>
                                        <p>{student.tk} tk</p>
                                        <p>{student.month}</p>

                                        <p>{student.get_date} {student.get_time}</p>
                                        <form method='POST' onSubmit={(e)=>onConfirm(e, student.id, student.username)}>
                                            <input type='submit' value='Confirm'/>
                                        </form>
                                    </div>
                                :
                                <p className='tsc'>No Payment History</p>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentConfirm
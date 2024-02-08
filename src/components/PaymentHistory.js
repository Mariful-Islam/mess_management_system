import React, {useEffect, useState} from "react";

const PaymentHistory = () => {

    let username = localStorage.getItem('username')
    let [paymentHisory, setPaymentHistory] = useState([])

    useEffect(()=>{
        getPaymentHistory()
    }, [])

    let getPaymentHistory = async () => {
        let res = await fetch(`http://saaddev.pythonanywhere.com/mms/payment_history/${username}/`)
        let data = await res.json()
        setPaymentHistory(data)
    }

    let totalTk = 0

    paymentHisory.map((student)=> totalTk+=student.tk)

    return (
        <div style={{marginTop:50, marginBottom:50}}>
            <h3>Payment History</h3>
            <div style={{backgroundColor:'#eeeeee', padding:20, borderRadius: 7}}>
                  <div className='payment_confirmation'>
                        <h4>Name</h4>
                        <h4>Room Number</h4>
                        <h4>Tk</h4>
                        <h4>Month</h4>
                        <h4>Time</h4>
                        <h4>Status</h4>
                  </div>
                    <div className='payment_confirmation' style={{overflowY:"auto", height:250}}>
                      {paymentHisory.map((p)=>(

                        <>
                            <p>{p.username}</p>
                            <p>{p.room_num}</p>
                            <p>{p.tk} tk</p>
                            <p>{p.month}</p>
                            <p>{p.get_date} {p.get_time}</p>
                            <p style={{display:"flex", justifyContent:"center"}}>
                                { p.is_paid.toString() === "true" ?
                                  <svg className="icon icon-tabler icon-tabler-check" width="24"
                                       height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                       stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M5 12l5 5l10 -10"/>
                                  </svg>
                                    :
                                    <svg version="1.1" id="Layer_1" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" >
                                    <g>
                                        <line fill="white" color='white' stroke="white" stroke-width="5" stroke-miterlimit="10" x1="18.947" y1="17.153" x2="45.045" y2="43.056"/>
                                    </g>
                                    <g>
                                        <line fill="white" stroke="white" stroke-width="5" stroke-miterlimit="10" x1="19.045" y1="43.153" x2="44.947" y2="17.056"/>
                                    </g>
                                    <g>
                                        <circle fill="none" stroke="red" stroke-width="5" stroke-miterlimit="10" cx="32" cy="32" r="30.999"/>
                                    </g>
                              </svg>
                                }
                            </p>
                        </>
                    ))}
                    </div>
                <div className='payment_count'>
                    <p><strong>Total Payment: </strong>{paymentHisory.length}</p>
                    <p><strong>Total TK: </strong> {totalTk} tk</p>
                </div>

                </div>
        </div>
    )
}

export default PaymentHistory
import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {CSVLink} from "react-csv";


const PaymentList = () => {

    let date = new Date()

    let currentMonth = date.toString().toLowerCase().slice(4,7)
    let currentYear = date.toString().slice(11,15)
    console.log(currentMonth, currentYear)

    const navigate = useNavigate()
    let username = localStorage.getItem('username')

    let [students, setStudents] = useState([])

    useEffect(()=>{
        getStudents()
    }, [])

    let getStudents = async () => {
        let response = await fetch('https://saaddev.pythonanywhere.com/mms/payments/')
        let data = await response.json()
        setStudents(data)

    }

    console.log(students)




    let currentDateFilter = students.filter((student)=>student.month.slice(0,3).toLowerCase()===currentMonth.toLowerCase()
                                                        && student.get_date.slice(7,11).includes(currentYear)
                                                        )
    console.log(currentDateFilter)
    let [src, setSrc] = useState("")
    let [searchFilter, setSearchFilter] = useState([])

    useEffect(()=>{
        onSearch()
    }, [src])

    let onSearch = () => {
        let filterItems = students.filter((student)=>student.username.toLowerCase().includes(src))
        setSearchFilter(filterItems)
    }

    let [year, setYear] = useState([])
    let [month, setMonth] = useState([])
    let [filterYear, setFilterYear] = useState([])


    useEffect(()=>{
        yearFilter()
        monthFilter()
    }, [year, month])

    let yearFilter = () => {
        setFilterYear(students.filter((student)=>student.get_date.slice(7,11)===year))
    }



    let [filterMonth, setFilterMonth] = useState([])

    useEffect(()=>{
        yearFilter()
        monthFilter()

    }, [month, year])



    let monthFilter = (e) => {
        setFilterMonth(filterYear.filter((student)=> student.month.toLowerCase()===month.toLowerCase()))
    }

    let messName = localStorage.getItem('mess')


    // total calculation
    let paid = students.filter((student)=>student.is_paid.toString()==="true")
    let paidTk = 0
    paid.map((p)=>paidTk+=p.tk)

    let unpaid = students.filter((student)=>student.is_paid.toString()==="false")
    let unpaidTk = 0
    unpaid.map((up)=>unpaidTk+=up.tk)

    let totalTk = 0
    students.map((student)=> totalTk+=student.tk)

    // filter month according year
    let filterMonthPaid = filterMonth.filter((student)=>student.is_paid.toString()==="true")
    let filterMonthPaidTk = 0
    filterMonthPaid.map((p)=>filterMonthPaidTk+=p.tk)

    let filterMonthUnPaid = filterMonth.filter((student)=>student.is_paid.toString()==="false")
    let filterMonthUnPaidTk = 0
    filterMonthUnPaid.map((up)=>filterMonthUnPaidTk+=up.tk)

    let filterMonthTotalTk = 0
    filterMonth.map((student)=> filterMonthTotalTk+=student.tk)

    // currentDate Calculation
    let currentPaid = currentDateFilter.filter((student)=>student.is_paid.toString()==="true")
    let currentPaidTk = 0
    currentPaid.map((p)=>currentPaidTk+=p.tk)

    let currentUnpaid = currentDateFilter.filter((student)=>student.is_paid.toString()==="false")
    let currentUnpaidTk = 0
    currentUnpaid.map((up)=>currentUnpaidTk+=up.tk)

    let currentTotalTk = 0
    currentDateFilter.map((student)=> currentTotalTk+=student.tk)

    // search calculation
    let searchPaid = searchFilter.filter((student)=>student.is_paid.toString()==="true")
    let searchPaidTk = 0
    searchPaid.map((p)=>searchPaidTk+=p.tk)

    let searchUnpaid = searchFilter.filter((student)=>student.is_paid.toString()==="false")
    let searchUnpaidTk = 0
    searchUnpaid.map((up)=>searchUnpaidTk+=up.tk)

    let searchTotalTk = 0
    searchFilter.map((student)=> searchTotalTk+=student.tk)

    return(
        <div>
            <h3 style={{textAlign:'center', marginTop: 50}}>Paid List</h3>

            <div style={{backgroundColor:'#eeeeee', padding:20, borderRadius: 7}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {
                        src.length===0 ?
                            month.length===0?

                                <h4>Total: {currentDateFilter.length}</h4>
                                    :
                                    <h4>Total: {filterMonth.length}</h4>
                                    :
                                    <h4>Total: {src.length}</h4>
                    }
                    <form>
                        <input type='text' placeholder='search' name='search'
                            onChange={(e)=>setSrc(e.target.value)}
                        />
                    </form>
                        <div>
                            <select onChange={(e)=>setMonth(e.target.value)}>
                                <option value={currentMonth}>{currentMonth}</option>
                                <option value='january'>Jan</option>
                                <option value='february'>Feb</option>
                                <option value='march'>Mar</option>
                                <option value='april'>Apr</option>
                                <option value='may'>May</option>
                                <option value='june'>Jun</option>
                                <option value='july'>Jul</option>
                                <option value='august'>Aug</option>
                                <option value='september'>Sep</option>
                                <option value='october'>Oct</option>
                                <option value='november'>Nov</option>
                                <option value='december'>Dec</option>
                            </select>
                            <select onChange={(e)=>setYear(e.target.value)}>
                        <option>{currentYear}</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                        <option>2033</option>
                        <option>2034</option>
                    </select>
                            <div className='csv_download'>
                                {
                                    src.length === 0 ?
                                        month.length === 0 ?

                                            <CSVLink data={currentDateFilter} className='csv'
                                                     filename={`Report ${messName} month ${currentMonth} year ${currentYear}`}>

                                                <svg className="icon icon-tabler icon-tabler-download" width="24"
                                                     height="24" viewBox="0 0 24 24" stroke-width="2"
                                                     stroke="currentColor" fill="none" stroke-linecap="round"
                                                     stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/>
                                                    <path d="M7 11l5 5l5 -5"/>
                                                    <path d="M12 4l0 12"/>
                                                </svg>CSV
                                            </CSVLink>
                                            :
                                            <CSVLink data={filterMonth} className='csv'
                                                     filename={`Report ${messName} month ${currentMonth} year ${currentYear}`}>
                                                <svg className="icon icon-tabler icon-tabler-download" width="24"
                                                     height="24" viewBox="0 0 24 24" stroke-width="2"
                                                     stroke="currentColor" fill="none" stroke-linecap="round"
                                                     stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/>
                                                    <path d="M7 11l5 5l5 -5"/>
                                                    <path d="M12 4l0 12"/>
                                                </svg>CSV
                                            </CSVLink>
                                        :
                                            <CSVLink data={src} className='csv'
                                                     filename={`Report ${messName} month ${currentMonth} year ${currentYear}`}>
                                                <svg className="icon icon-tabler icon-tabler-download" width="24"
                                                     height="24" viewBox="0 0 24 24" stroke-width="2"
                                                     stroke="currentColor" fill="none" stroke-linecap="round"
                                                     stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/>
                                                    <path d="M7 11l5 5l5 -5"/>
                                                    <path d="M12 4l0 12"/>
                                                </svg>CSV
                                            </CSVLink>
                                }
                            </div>
                        </div>
                </div>

              <div className='payment_confirmation'>
                  <div>
                    <h4>Name</h4>
                    <h4>Room Number</h4>
                    <h4>Tk</h4>
                    <h4>Month</h4>
                    <h4>Time</h4>
                    <h4>Status</h4>
                  </div>
              </div>
                <div className='payment_confirmation' style={{overflowY:"auto", height:250}}>

                  {
                      src.length===0 ?
                          month.length===0?

                               currentDateFilter.map((student)=>(
                            <div>
                                <p>{student.username}</p>
                                <p>{student.room_num}</p>
                                <p>{student.tk} tk</p>
                                <p>{student.month}</p>
                                <p>{student.get_date} {student.get_time}</p>
                                <p style={{display:"flex", justifyContent:"center"}}>
                                    {student.is_paid.toString() === "true" ?
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
                            </div>
                        )):
                              filterMonth.map((student)=>(
                            <div>
                                <p>{student.username}</p>
                                <p>{student.room_num}</p>
                                <p>{student.tk} tk</p>
                                <p>{student.month}</p>
                                <p>{student.get_date} {student.get_time}</p>
                                <p style={{display:"flex", justifyContent:"center"}}>
                                    {student.is_paid.toString() === "true" ?
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
                            </div>
                        )):

                            searchFilter.length === 0 ?
                                <p>Not Found</p>
                                :
                              searchFilter.map((student)=>(
                            <div>
                                <p>{student.username}</p>
                                <p>{student.room_num}</p>
                                <p>{student.tk} tk</p>
                                <p>{student.month}</p>
                                <p>{student.get_date} {student.get_time}</p>
                                <p style={{display:"flex", justifyContent:"center"}}>
                                    {student.is_paid.toString() === "true" ?
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
                            </div>
                        ))

                  }

                </div>
                <div className='payment_count' style={{marginTop:20, marginBottom:20}}>
                    {
                        src.length === 0 ?
                            month.length === 0 ?
                                <div>
                                    <p><strong>Total Payment: </strong>{currentDateFilter.length}</p>
                                    <p><strong>Paid: </strong>{currentPaid.length}</p>
                                    <p><strong>Unpaid: </strong>{currentUnpaid.length}</p>
                                    <p><strong>Paid Tk: </strong>{currentPaidTk}</p>
                                    <p><strong>Unpaid Tk: </strong>{currentUnpaidTk}</p>
                                    <p><strong>Total TK: </strong> {currentTotalTk} tk</p>
                                </div>
                                :
                                <div>
                                    <p><strong>Total Payment: </strong>{filterMonth.length}</p>
                                    <p><strong>Paid: </strong>{filterMonthPaid.length}</p>
                                    <p><strong>Unpaid: </strong>{filterMonthUnPaid.length}</p>
                                    <p><strong>Paid Tk: </strong>{filterMonthPaidTk}</p>
                                    <p><strong>Unpaid Tk: </strong>{filterMonthUnPaidTk}</p>
                                    <p><strong>Total TK: </strong> {filterMonthTotalTk} tk</p>
                                </div>
                            :
                            <div>
                                <p><strong>Total Payment: </strong>{searchFilter.length}</p>
                                <p><strong>Paid: </strong>{searchPaid.length}</p>
                                <p><strong>Unpaid: </strong>{searchUnpaid.length}</p>
                                <p><strong>Paid Tk: </strong>{searchPaidTk}</p>
                                <p><strong>Unpaid Tk: </strong>{searchUnpaidTk}</p>
                                <p><strong>Total TK: </strong> {searchTotalTk} tk</p>
                            </div>
                    }

                </div>
            </div>
      </div>
    )
}

export default PaymentList
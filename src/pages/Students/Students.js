import React, {useContext, useEffect, useState} from 'react'
import StudentContext from '../../Context/StudentContext'


const Students = () => {

  let date = new Date()
  let today = date.toString().slice(8,10)


  let {students, getstudents} = useContext(StudentContext)

  useEffect(()=>{
    getstudents()
  }, [])

  let [searchFilter, setSearchFilter] = useState([])
  let [search, setSearch] = useState("")

  useEffect(()=>{
    onSearch()
  },[search])

  let onSearch = () => {
    let filter_students = students.filter((student)=>
        student.username.toLowerCase().includes(search.toLowerCase()) ||
        student.dept.toLowerCase().includes(search.toLowerCase()) ||
        student.district.toLowerCase().includes(search.toLowerCase())
    )
    setSearchFilter(filter_students)
  }

  let active_student = students.filter((student)=>(
      student.sts==="active"
  ))

   let leaving_student = students.filter((student)=>(
      student.sts==="leaving"
  ))

   let exit_student = students.filter((student)=>(
      student.sts==="exit"
  ))

  let [filterStatus, setFilterStatus] = useState([])

  let statusHandle = (e) => {
    setFilterStatus(students.filter((student)=>(
        student.sts.toLowerCase().includes(e.toLowerCase()))))
  }



  return (
    <div className='wrapper '>
      <form>
        <input type='text' name='search' placeholder='Search Students'
          onChange={(e)=>setSearch(e.target.value)}
        />
      </form>
      <div>
        <select onChange={(e)=>statusHandle(e.target.value)}>
          <option value='all'>All</option>
          <option value='active'>Active</option>
          <option value='leaving'>Leaving</option>
          <option value='exit'>Exit</option>
        </select>
      </div>
      <div style={{backgroundColor:'#eeeeee', padding:20, borderRadius: 7}}>
        <div className='payment_confirmation'>
          <div>
            <h5>Name</h5>
            <h5>Phone</h5>
            <h5>Room Number</h5>
            <h5>Department</h5>
            <h5>District</h5>
            <h5>Status</h5>
          </div>
        </div>
        <div className='payment_confirmation' style={{overflowY:"auto", height:300}}>
        {search.length === 0 ?
            filterStatus.length === 0 ?

                students.map((student)=>(
                  <div>
                    <p>{student.username}</p>
                    <p>{student.phone}</p>
                    <p>{student.room_num}</p>
                    <p>{student.dept}</p>
                    <p>{student.district}</p>
                    <p style={{display: 'flex', justifyContent: 'center'}}>{student.sts === "active" ? <div className='active_student'></div> :
                        student.sts === "leaving" ? <div className='leaving_student'>{30-(today-student.get_date_updated.slice(0,2))}</div>:
                        student.sts === "exit" ? <div className='exit_student'></div> : <></>

                    }</p>
             </div>
                ))
                      :
                      filterStatus.map((student)=>(
                  <div>
                    <p>{student.username}</p>
                    <p>{student.phone}</p>
                    <p>{student.room_num}</p>
                    <p>{student.dept}</p>
                    <p>{student.district}</p>
                    <p style={{display: 'flex', justifyContent: 'center'}}>{student.sts === "active" ? <div className='active_student'></div> :
                        student.sts === "leaving" ? <div className='leaving_student'>{30-(today-student.get_date_updated.slice(0,2))}</div>:
                        student.sts === "exit" ? <div className='exit_student'></div> : <></>

                    }</p>
             </div>
                ))
                  :
            searchFilter.length===0 ?
                <p>Not Found</p>
                :
              searchFilter.map((student)=>(
                  <div>
                    <p>{student.username}</p>
                    <p>{student.phone}</p>
                    <p>{student.room_num}</p>
                    <p>{student.dept}</p>
                    <p>{student.district}</p>
                    <p style={{display: 'flex', justifyContent: 'center'}}>
                      {student.sts === "active" ? <div className='active_student'></div> :
                        student.sts === "leaving" ?<><div className='leaving_student'>{30-(today-student.get_date_updated.slice(0,2))}</div></> :
                        student.sts === "exit" ? <div className='exit_student'></div> : <></>

                    }
                    </p>
                  </div>
              ))
        }
        </div>
        <div className='student_quantity'>
          <p><strong>Current Student: </strong>{active_student.length}</p>
          <p><strong>Leaving Student: </strong>{leaving_student.length}</p>
          <p><strong>Exit Student: </strong>{exit_student.length}</p>
          <p><strong>Total Student: </strong>{students.length}</p>
        </div>

      </div>
    </div>
  )
}

export default Students
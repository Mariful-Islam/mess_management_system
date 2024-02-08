import React, {useContext, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Room from "../../components/Room";



const Home = () => {

    let mess = localStorage.getItem('mess')

    const navigate = useNavigate()

    let username = localStorage.getItem('username')
 
    let [rooms, setRooms] = useState([])

    let removeDuplicate = (data) => {
        return data.filter((value, index) => data.indexOf(value) === index)
    }

    useEffect(()=>{
        getRooms()
    },[])

    let getRooms = async () => {
        let res = await fetch('http://saaddev.pythonanywhere.com/mms/rooms/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"mess": mess})
        })
        let data = await res.json()

        setRooms(removeDuplicate(data))
    }


  return (
    <div >
      {!username ?
      <div className='mms_home'>
        <h2>Mess Management System MMS</h2>
        <svg onClick={()=>navigate('/login/')} width="32" height="32" id='left_icon' viewBox="0 0 32 32" fill="#000000"><g>
         <path d="M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 21.7,17.71l-6.486,6.486 c-0.39,0.39-1.024,0.39-1.414,0c-0.39-0.39-0.39-1.024,0-1.414L 19.582,17L 13.8,11.218c-0.39-0.39-0.39-1.024,0-1.414 c 0.39-0.39, 1.024-0.39, 1.414,0l 6.486,6.486c 0.196,0.196, 0.294,0.454, 0.292,0.71C 21.992,17.258, 21.896,17.514, 21.7,17.71z">
         </path></g></svg>
      </div> :
        <div className='wrapper'>
            <h3 style={{textAlign:"center"}}>Room</h3>
            <div className='rooms'>
                {rooms.map((room, index)=>(
                   <Room room={room} key={index}/>
                ))}

            </div>
        </div>

     }
    </div>
  )
}

export default Home
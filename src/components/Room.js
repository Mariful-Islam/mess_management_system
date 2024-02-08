import React, {useEffect, useState} from "react";

const Room = ({room}) => {
    let [rooms, setRooms] = useState([])

    useEffect(()=>{
        getRooms()
    },[])

    let getRooms = async () => {
        let res = await fetch(`http://saaddev.pythonanywhere.com/mms/room/${room}/`)
        let data = await res.json()
        setRooms(data)
    }


    return (
        <div>
            <div className='room'>
                <h4>{room}</h4>
                <div className='room_students'>
                    {rooms.map((student)=>(
                        student.sts === "leaving" ?
                            <div className='student blue'>
                                {student.username}
                            </div>
                            :
                            <div className='student'>
                                {student.username}
                            </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Room
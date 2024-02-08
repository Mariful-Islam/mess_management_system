import React, { createContext, useState, useEffect } from "react";

let RoomContext = createContext()
export default RoomContext




export const RoomProvider = ({children}) => {
    
    let [rooms, setrooms] = useState([])

    useEffect(()=>{
        getrooms()
    }, [])

    let getrooms = async() => {
        let response = await fetch('http://saaddev.pythonanywhere.com/mms/rooms/')
        let data = await response.json()
        setrooms(data)
    }

    let data = {
        rooms: rooms,
        getrooms: getrooms
    }

  return (
    <div>
        <RoomContext.Provider value={data}>
            {children}
        </RoomContext.Provider>
    </div>
  )
}

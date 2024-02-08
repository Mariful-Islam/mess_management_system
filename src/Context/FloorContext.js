import React, { createContext, useEffect, useState } from 'react'



let FloorContext = createContext()
export default FloorContext

export const FloorProvider = ({children}) => {

    let [floors, setFloors] = useState([])

    useEffect(()=>{
        getFloors()
    }, [])

    let getFloors = async() => {
        let response = await fetch('http://saaddev.pythonanywhere.com/mms/floors/')
        let data = await response.json()
        setFloors(data)
    }

    let data = {
        floors: floors,
        getFloors: getFloors
    }

  return (
    <div>
        <FloorContext.Provider value={data}>
            {children}
        </FloorContext.Provider>
    </div>
  )
}

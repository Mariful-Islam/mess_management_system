import React, {createContext, useEffect, useState} from "react";

let MessContext = createContext()
export default MessContext

export let MessProvider = ({children}) =>{


    let [messes, setMesses] = useState([])

    useEffect(()=>{
        getMesses()
    }, [])


    let getMesses = async () => {
        let res = await fetch('http://saaddev.pythonanywhere.com/mess/get_messes')
        let data = await res.json()
        setMesses(data)
    }

    let data = {
        getMesses: getMesses,
        messes: messes
    }

    return(
        <MessContext.Provider value={data}>
            {children}
        </MessContext.Provider>
    )
}
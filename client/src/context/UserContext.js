import React, {useEffect,useState,createContext} from 'react'
import axios from 'axios'

export const myUser = createContext({});

export const Context = (props) => {
    const [userObject,setUserObject] = useState();
    // const [loading,setLoading] = useState(true);
    
    useEffect(() => {
        axios.get("http://localhost:3001/api/auth/getUser",{withCredentials: true})
        .then(user => {
            if (user.data) {
                setUserObject(user.data)
            }
        })
        .catch(err => console.log("ERROR: ",err))
    },[])

    return (
        <div>
            <myUser.Provider value={userObject}>
                {props.children}
            </myUser.Provider>
        </div>
    )
}
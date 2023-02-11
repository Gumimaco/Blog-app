import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import {createPortal} from 'react-dom'
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
const image = require("../images/react_log.png")
const addImage = require('../images/addIcon.png')

export const Navbar = ({user}) => {

    let navigate = useNavigate();
    const [loginModal,setLoginModal] = useState(false)
    const [registerModal,setRegisterModal] = useState(false)
    const [imageURL,setImageURL] = useState(null)
    const [userID,setUserID] = useState(null)
    const logout = () => {
        axios.delete('http://localhost:3001/api/auth/logout',{withCredentials: true}).then(data => console.log("DONE"))
    }
    
    const createOrRetrieve = async () => {
        let id;
        await axios.get('http://localhost:3001/api/blog/last-draft',{withCredentials: true})
        .then(data => {id = data.data})
        .catch(err => console.log("ERROR",err))
        navigate(`${id}/edit-post`)
    }

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:3001/api/image/url/${user.profile_picture}`,{withCredentials: true})
            .then(data => {setImageURL(data.data)})
            .catch(err => console.log("ERROR GETTING URL"))
            setUserID(user._id)
        }
        
    },[user])

    console.log("Navbar user",user)
    return (
        <nav className="navbar border-b border-blue-300 h-12 flex justify-between items-center">
            <div className="px-2">
                <a className="navbar-brand" href="/">
                    <div>RANDOM ASS TEXT</div>
                </a>
            </div>
            {
                !user ?

                <div className="px-2">
                    <button onClick={() => setLoginModal(true)} className="bg-white text-black rounded-sm py-1 px-3">
                        Login
                    </button>
                    { loginModal && createPortal(<LoginModal logModal={setLoginModal} regModal={setRegisterModal}/>,document.getElementById("overlay"))}
                    { registerModal && createPortal(<RegisterModal logModal={setLoginModal} regModal={setRegisterModal}/>,document.getElementById("overlay"))}
                </div> 
                
                :
                <div className="flex">
                    <div onClick={createOrRetrieve}>
                        <button className="text-black p-1 mr-2 rounded-md border-blue-300 border hover:bg-blue-300 hover:text-white">Create Post</button>
                    </div>
                    {/* <div className="mx-2">
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6.43994V9.76994" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
                        <path d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
                        <path d="M15.33 18.8201C15.33 20.6501 13.83 22.1501 12 22.1501C11.09 22.1501 10.25 21.7701 9.65004 21.1701C9.05004 20.5701 8.67004 19.7301 8.67004 18.8201" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10"/>
                        </svg>
                    </div> */}
                    <button onClick={() => {
                        logout();
                        if (window.location.pathname === "/") {
                            navigate(0);
                        } else {
                            navigate('/')
                            navigate(0)
                        }
                    }}>Logout</button>
                    <a href={`http://localhost:3000/user/${userID}`}>
                        { imageURL ? <img className="profile-picture ml-2 max-h-10" src={imageURL}></img> : null }
                    </a>
                </div>
            }
        </nav>
    )
}

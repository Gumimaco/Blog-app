import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import {createPortal} from 'react-dom'
import LoginModal from '../login/LoginModal';
import RegisterModal from '../login/RegisterModal';
const image = require("../images/react_log.png")

export const Navbar = (props) => {

    let navigate = useNavigate();
    const [loginModal,setLoginModal] = useState(false)
    const [registerModal,setRegisterModal] = useState(false)


    const logout = () => {
        axios.get('http://localhost:3001/api/auth/logout',{withCredentials: true})
    }

    const {user} = props
    console.log("Navbar user",user)
    return (
        <nav className="bg-black text-white h-16 flex justify-between items-center">
            <div className="px-2">
                <a className="navbar-brand" href="/">
                    <img src={image} className="h-12"></img>
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
                </div> :
                <div>
                    <button onClick={() => {
                        logout();
                        if (window.location.pathname === "/") {
                            navigate(0);
                        } else {
                            navigate('/')
                            navigate(0)
                        }
                    }}>Logout</button>
                </div>
            }
        </nav>
    )
}

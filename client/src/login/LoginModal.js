import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

function LoginModal(props) {
    const { logModal, regModal } = props
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault();
        console.log("Login submited data:",email,password)

        axios.post('http://localhost:3001/api/auth/login',{email,password},{withCredentials: true})
        .then(something => {
            if (window.location.pathname === "/") {
                navigate(0); 
            } else {
                navigate('/')
            }
            logModal(false)})
        .catch(error => console.log("NASTAV CERVENE INPUT BOXY :)"))

    }
    return (
        <div className="overlay">
            <div className="modalContainer rounded-md transition-shadow bg-gray-300 flex-col w-1/2 h-1/2">
                <div className="self-end">
                    <button onClick={() => logModal(false)}>X</button>
                </div>
                <div className="login">
                    <h1>Login</h1>
                </div>
                <GoogleAuth/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type="submit" className="bg-white text-black">Login</button>
                </form>
                <div>
                </div>
                <div className="footer">
                    New blogger? <a onClick={() => {logModal(false);regModal(true)}}>Create account</a>
                </div>  
            </div>
        </div>
    )
}

export default LoginModal


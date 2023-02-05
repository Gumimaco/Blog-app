import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router';

function RegisterModal(props) {
    const { logModal, regModal } = props
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Register submited data:",email,password)
        axios.post('http://localhost:3001/api/auth/register',{email,password},{withCredentials: true})
        .then(something => {
            console.log("Registration succesfull",something)
            if (window.location.pathname === "/") {
                navigate(0); 
            } else {
                navigate('/')
            }
            regModal(false)})
        .catch(error => console.log("NASTAV CERVENE INPUT BOXY :)"))
    }

    return (
        <div className="overlay">
            <div className="modalContainer rounded-md transition-shadow bg-gray-300 flex-col w-1/2 h-1/2">
                <div className="">
                    <button onClick={() => regModal(false)}>X</button>
                </div>
                <div className="login">
                    <h1>Register</h1>
                </div>
                <div>
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
                    <button type="submit" className="bg-white text-black">Register</button>
                </form>
                </div>
                <div className="footer">
                    Already blogger? <a onClick={() => {regModal(false);logModal(true)}}>Register</a>
                </div>  
            </div>
        </div>
    )
}

export default RegisterModal


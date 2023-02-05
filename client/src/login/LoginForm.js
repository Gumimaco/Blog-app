import axios from 'axios';
import React,{useState} from 'react'

export const LoginForm = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        console.log(email,password)
        axios.post('http://localhost:3001/api/auth/login',{email,password},{withCredentials: true})
        .then(something => console.log(something))
        .catch(error => console.log("ERROR: ",error))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

import React,{useState} from 'react'
const axios = require('axios')

export const RegisterForm = () => {
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = event => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };
    
    const handleSubmit = event => {
        event.preventDefault();
    
        const { username, email, password } = formData;
    
        console.log(username, email, password)
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="emailR">Email:</label>
                    <input
                    type="email"
                    id="emailR"
                    name="emailR"
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="passwordR">Password:</label>
                    <input
                    type="password"
                    id="passwordR"
                    name="passwordR"
                    value={formData.password}
                    onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

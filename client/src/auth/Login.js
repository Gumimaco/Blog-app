import React,{useState} from 'react'
import {RegisterForm} from './RegisterForm'
import {LoginForm} from './LoginForm'

const axios = require('axios')

export function Login() {
    return (
        <div className="flex">
            <div>
                <div>Sign Up</div>
                <RegisterForm/>
            </div>
            <div>
                <div>Sign In</div>
                <LoginForm/>
            </div>
        </div>
    )
}
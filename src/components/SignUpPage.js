import React, { useState } from "react"
import "./Login&SignUpPage.css";


export default function SignUp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="auth-form-container">
            <h1>Sign Up</h1>
            <form className="signUp-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input type="name" id="name" name="name"
                   value={name} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" 
                   value={email} onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" 
                   value={password} onChange={(e) => setPassword(e.target.value)}/>

                <label htmlFor="conPass">Confirm Password</label>
                <input type="password" id="password" name="password"
                    value={password} />
            
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Sign in here</button>
        </div>
    )
}
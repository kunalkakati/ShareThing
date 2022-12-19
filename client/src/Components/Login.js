import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContex from '../Context/blogs/AlertContext';
import "./CSS/auth_form.css"

function Login() {
    const [authStr, setAuthStr] = useState({ email: '', Password: '' });
    const navigate = useNavigate();
    const alertState = useContext(AlertContex);
    const {giveAlert} = alertState;

    const onChange =  (e) => {
        setAuthStr({ ...authStr, [e.target.name]: e.target.value });
    }

    const LoginBtn = async (e) => {
        e.preventDefault();
        const { email, Password } = authStr;
        // console.log(email);
        // console.log(Password);
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, Password }),
        });

        const json = await response.json();

        if(json.success){
            window.localStorage.setItem('Token',json.Token);
            navigate("/", {replace: true});
            giveAlert("success", "Successfully Login.");
        }else{
            giveAlert("danger", "Login with wrong credential.");
        }

    }

    return (
        <div className='From_body'>            
            <div className="Rcontainer">
                <div className="title">Log in</div>
                <div className="content">
                    <form onSubmit={LoginBtn}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="email" onChange={onChange} id="email" name="email" value={authStr.email} placeholder="Enter your name" minLength={2} required />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input type="password" onChange={onChange} id="Password" name='Password' value={authStr.Password} placeholder="Enter your email" minLength={4} required />
                            </div>
                        </div>
                        <p>Dont have an account? Contact to your college.</p>
                        <div className="button">
                            <button type="submit">Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
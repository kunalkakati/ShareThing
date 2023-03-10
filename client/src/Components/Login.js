import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AlertContex from '../Context/blogs/AlertContext';
import "./CSS/auth_form.css"
import Progress from "./Progress";


function Login() {
    const [authStr, setAuthStr] = useState({ email: '', Password: '' });
    const [progress, setProgress] = useState(false);
    const [forgotPassVisibilityState, setForgotPassVisibilityState] = useState('none');
    const navigate = useNavigate();
    const alertState = useContext(AlertContex);
    const {giveAlert} = alertState;

    const onChange =  (e) => {
        setAuthStr({ ...authStr, [e.target.name]: e.target.value });
    }

    const LoginBtn = async (e) => {
        setProgress(true);
        e.preventDefault();
        const { email, Password } = authStr;
        // console.log(email);
        // console.log(Password);
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, Password }),
        });

        const json = await response.json();
        setProgress(false);
        if(json.success){
            window.localStorage.setItem('Token',json.Token);
            navigate("/", {replace: true});
            giveAlert("success", "Successfully Login.");
        }else{
            giveAlert("error", "Login with wrong credential.");
            setForgotPassVisibilityState('block');
        }

    }

    return (
        <>
        <Progress state={progress}/>
        <div className='From_body'>            
            <div className="Rcontainer">
                <div className="title">Log in</div>
                <div className="content">
                    <form onSubmit={LoginBtn}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="email" onChange={onChange} id="email" name="email" value={authStr.email} placeholder="Enter your email" minLength={2} autoComplete="on" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input type="password" onChange={onChange} id="Password" name='Password' value={authStr.Password} placeholder="Enter your password" minLength={3} autoComplete="on" required />
                            </div>
                        </div>
                        <p>Dont have an account? Contact to your college.</p>
                        <div className="button">
                            <button type="submit">Log in</button>
                        </div>
                    </form>
                    <p style={{'display': `${forgotPassVisibilityState}`}}>Don't worry! if you forgot your password <Link to=".">Click here</Link> to reset</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login
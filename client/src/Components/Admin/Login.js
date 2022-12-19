import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import "../CSS/auth_form.css"
import AlertContex from '../../Context/blogs/AlertContext';


function Login() {
    
    // const Admin = {
    //     username: 'Admin@tihucollege',
    //     Password: 'college@123'
    // }
    const [authStr, setAuthStr] = useState({ email: '', Password: '' });
    const navigate = useNavigate();
    const alertState = useContext(AlertContex);
    const {giveAlert} = alertState;


    const onChange = (e) => {
        setAuthStr({ ...authStr, [e.target.name]: e.target.value });
    }

    const LogThisAdmin = async(e) => {
        e.preventDefault();
        console.log(authStr);
        const { email, Password } = authStr;
        const response = await fetch(`http://localhost:5000/api/admin/login`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, Password }),
        });

        const json = await response.json();

        if(json.success){
            window.localStorage.setItem('AdminToken',json.Token);
            navigate("/", {replace: true});
            giveAlert("success", "Successfully Login.");
        }else{
            giveAlert("danger", "Login with wrong credential." + json.error);
        }

    }

    return (
        <div className='From_body' >
            <div className="Rcontainer">
                <div className="title"> Admin Log in</div>
                <div className="content">
                    <form onSubmit={LogThisAdmin}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="email" onChange={onChange} id="email" name="email" value={authStr.email} placeholder="Enter your email" minLength={2} required />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input type="password" onChange={onChange} id="Password" name='Password' value={authStr.Password} placeholder="Enter your email" minLength={4} required />
                            </div>
                        </div>
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
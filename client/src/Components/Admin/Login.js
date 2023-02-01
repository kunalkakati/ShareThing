import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../CSS/auth_form.css"
import AlertContex from '../../Context/blogs/AlertContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Progress from '../Progress';


function Login() {
    
    // const Admin = {
    //     username: 'Admin@tihucollege',
    //     Password: 'college@123'
    // }
    const [authStr, setAuthStr] = useState({ email: '', Password: '',collage_id: '' });
    const [progress, setProgress] = useState(false);
    const navigate = useNavigate();
    const alertState = useContext(AlertContex);
    const {giveAlert} = alertState;


    const onChange = (e) => {
        setAuthStr({ ...authStr, [e.target.name]: e.target.value });
    }

    const LogThisAdmin = async(e) => {
        e.preventDefault();
        // console.log(authStr);
        setProgress(true);
        const { email, Password,collage_id } = authStr;
        const response = await fetch(`http://localhost:3000/api/admin/login`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, Password,collage_id }),
        });

        const json = await response.json();
        setProgress(false);
        if(json.success){
            window.localStorage.setItem('AdminToken',json.Token);
            navigate("/", {replace: true});
            giveAlert("success", "Successfully Login.");
        }else{
            giveAlert("error", "Login with wrong credential. " + json.error);
        }

    }

    return (
        <>
        <Progress state={progress}/>
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
                                <span className="details">College Id</span>
                                <input type="text" onChange={onChange} id="collage_id" name="collage_id" value={authStr.collage_id} placeholder="Enter college id" minLength={2} required />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input type="password" onChange={onChange} id="Password" name='Password' value={authStr.Password} placeholder="Enter your password" minLength={4} required />
                            </div>
                        </div>
                        <div className="button">
                            <button type="submit">Log in</button>
                        </div>
                    </form>
                    <Link to='/admin/dashboard'><ArrowBackIcon/></Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login
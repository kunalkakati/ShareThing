import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import AlertContext from "../../Context/blogs/AlertContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Register() {
  const [userData, setUserData] = useState({ Username: '', email: '', Password: '' });
  const [PasswordState, setPasswordState] = useState(true);
  const AlertState  = useContext(AlertContext);

  const {giveAlert} = AlertState;

  // const navigate = useNavigate();
  const UserInputData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const CheckPass = (e)=>{
    if(userData.Password !== e.target.value){ 
      setPasswordState(true);
    }else{
      setPasswordState(false);
    }
  }

  const ResisterThisUser = async(e) => {
    e.preventDefault();
    const {Username,Password,email} = userData;
    const responce = await fetch('http://localhost:5000/api/admin/create', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Username,Password,email}),
    });

    const json = await responce.json();
    
    if(json.success){
      window.localStorage.setItem('AdminToken',json.Token);
      // navigate("/admin/dashboard", {replace: true});
      giveAlert('success', 'Admin successfully registred.');
      setUserData({ Username: '', email: '', Password: '' });

    }else{
      alert("Register with wrong credential.place try again " + json.error);
    }
  }

  return (
    <div className='From_body'>
      <div className="Rcontainer">
          <div className="title">Registration for new Admin</div>
          <div className="content">
          <form onSubmit={ResisterThisUser}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Full Name</span>
                  <input type="text" onChange={UserInputData} id="Username" name='Username'  placeholder="Enter your name" minLength={3} required />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input type="text" onChange={UserInputData} id="email" name='email'  placeholder="Enter your email" minLength={3} required />
                </div>
                <div className="input-box">
                  <span className="details">Password</span>
                  <input type="password" onChange={UserInputData} id="Password" name='Password'  placeholder="Enter your password" required />
                </div>
                <div className="input-box">
                  <span className="details"> Reenter Password</span>
                  <input type="password" onChange={CheckPass} id="Password-1" name='Password'  placeholder="Enter your password again" required />
                  {userData.Password === '' ? '' : PasswordState ? '*Password not match' : '*Password match.'}
                </div>
              </div>
                {/* <p>Already have account? <Link className="nav-link" to="/login" role="button"><i style={{color: "blue"}}>Login here </i></Link></p> */}
              <div className="button">
                {/* <input type="submit" value="Register" /> */}
                <button type="submit" disabled={PasswordState}>Register</button>
              </div>
            </form>
                <Link to='/admin/dashboard'><ArrowBackIcon/></Link>
          </div>
        </div>
    </div>
  )
}

export default Register

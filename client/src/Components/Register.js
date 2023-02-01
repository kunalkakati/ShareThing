import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Register() {
  const [userData, setUserData] = useState({ Username: '', email: '', Password: '' });
  const [PasswordState, setPasswordState] = useState(true);

  const navigate = useNavigate();
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
    const {Username,Password,department,email} = userData;
    const responce = await fetch(`${process.env.REACT_APP_HOST}/api/auth/createuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Username,Password,department,email}),
    });

    const json = await responce.json();
    
    if(json.success){
      // window.localStorage.setItem('Token',json.Token);
      navigate("/admin/dashboard", {replace: true});
    }else{
      alert("Register with wrong credential.place try again");
    }
  }

  return (
    <div className='From_body'>
      <div className="Rcontainer">
          <div className="title">Registration for new Student</div>
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
                  <span className="details">department</span>
                  <input type="text" onChange={UserInputData} id="department" name='department'  placeholder="Enter your Department" minLength={3} required />
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

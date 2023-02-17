import { Button } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react'
import AlertContex from '../Context/blogs/AlertContext';
import UserContext from '../Context/user/UserContext';
import './CSS/Update_password.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';


function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passState, setPassState] = useState(true);
  const [loginBtnState, setLoginBtnState] = useState(false);
  // Alert Contsext
  const alertState = useContext(AlertContex);
  const { giveAlert } = alertState;
  // User Context
  const UserState = useContext(UserContext);
  const { currentUser, getCurrentUserDetails, UpdateUserPassword } = UserState;
  const { _id } = currentUser;

  const checkPassword = (e) => {
    if (newPassword !== e.target.value) {
      setPassState(true);
    } else {
      setPassState(false);
    }
  }
  useEffect(() => {
    getCurrentUserDetails();
    giveAlert('info', "Remmember your Password.");
    // eslint-disable-next-line
  }, [])

  const changePassword = async (e) => {
    e.preventDefault();
    const confrimation = await UpdateUserPassword(_id, newPassword, oldPassword);
    confrimation ? giveAlert('success', 'Password successfully Updated') : giveAlert('error', "Incorrect Password! Please enter valid password.");
    confrimation && setLoginBtnState(true);
  }

  const navigate = useNavigate();
  const UserLogout = () => {
    window.localStorage.removeItem("Token");
    navigate("/login", { replace: true });
  }
  const style = {
    'color': 'red'
  }
  return (
    <div className='update-pass'>
      <div className="update-pass-container">
        <h3>Reset Password</h3>
        <form onSubmit={changePassword}>
          <p>Old Password<span style={style}>*</span></p>
          <input type="password" onChange={(e) => { setOldPassword(e.target.value) }} value={oldPassword} autoComplete="on" />
          <p>New Password<span style={style}>*</span></p>
          <input type="password" onChange={(e) => { setNewPassword(e.target.value) }} value={newPassword} autoComplete="on" />
          <p>Confrim Password<span style={style}>*</span></p>
          <input type="password" onChange={checkPassword} autoComplete="on" />
          <button className="update-pass-btn" disabled={passState}>RESET</button>
        </form>
        {newPassword === '' ? '' : !passState ? <p style={{ color: 'green', textAlign: 'left' }}>*Password matched</p> : <p style={{ color: 'red', textAlign: 'left' }}>*Password not Matched</p>}
        {loginBtnState && <Button className='my-3' variant="outlined" color='error' startIcon={<LogoutIcon />} onClick={UserLogout} >Logout</Button>}
      </div>
    </div>
  )
}

export default UpdatePassword
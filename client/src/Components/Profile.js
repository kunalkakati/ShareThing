import React, { useContext, useEffect } from 'react'
import UserContext from '../Context/user/UserContext';
import "./CSS/Profile.css";
import { useNavigate } from "react-router-dom";
import { Button} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';


function Profile() {
    const UserState = useContext(UserContext);
    const { currentUser, getCurrentUser } = UserState;
    const { Username, email, department } = currentUser;

    useEffect(() => {
        getCurrentUser();
        // eslint-disable-next-line
    }, [])
    const navigate = useNavigate();
    const UserLogout = () => {
        if (window.localStorage.getItem("Token")) {
            window.localStorage.removeItem("Token");
            navigate("/login", { replace: true });
        }
        else {
            if (window.localStorage.getItem("AdminToken")) {
                window.localStorage.removeItem("AdminToken");
                navigate("/admin", { replace: true });
            }
        }
    }

    return (
        <>
            <div className='profile'>
                <div className="profile-content">
                    <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image.png" alt="profile avatar" />
                    <div className="user-info">
                        <h3 className='card-title'>{Username}</h3>
                        <p className='card-subtitle'><EmailIcon /> {email}</p>
                        <p className='card-text'><SchoolIcon /> Department of {department}</p>
                    </div>
                </div>
                <Button variant="outlined" color='warning' startIcon={<LogoutIcon />} onClick={UserLogout} >Logout</Button>
            </div>
            <hr />
        </>
    )
}

export default Profile
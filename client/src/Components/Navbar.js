import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./CSS/NavBar.css";
import LoginIcon from '@mui/icons-material/Login';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import UserContext from '../Context/user/UserContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';



const theme = createTheme({
    palette: {
        secondary: {
            main: '#EB455F',
        },
    },
})


function Navbar() {

    let location = useLocation();
    const navigate = useNavigate();
    const UserState = useContext(UserContext);
    const { currentUser, getCurrentUser } = UserState;
    const { Username } = currentUser;

    useEffect(() => {
        getCurrentUser();
        // eslint-disable-next-line
    }, [])

    const giveFirstName = ()=>{
        let fn = Username.split(' ');
        return fn[0];
    }

    const AdminLogout = () => {
            window.localStorage.removeItem("AdminToken");
            navigate("/admin", { replace: true });
    }

    const col = {
        'color': '#EB455F'
    }

    return (
        <>
            <div className="nevigation c-s">
                <Link to='/' className="logo"><i className="fas fa-spa"></i>ShareThing</Link>

                <div className="nav-btn">
                    <ul className="nav-list">
                        <li >
                            <Link className="nav_link" style={location.pathname === '/' ? col : {}} aria-current="page" to="/">Home</Link>
                        </li>

                        <li >
                            <Link className="nav_link" style={location.pathname === '/about' ? col : {}}  to="/about">About</Link>
                        </li>

                        {!window.localStorage.getItem('Token') || <li >
                            <Link className="nav_link" style={location.pathname === '/compose' ? col : {}}  to="/compose">Compose</Link>
                        </li>}
                    </ul>
                    <ThemeProvider theme={theme}>
                        <div className="singin-singup">
                            {!window.localStorage.getItem('Token') && !window.localStorage.getItem('AdminToken') ? <form className="d-flex" role="search">
                                <Link to="/login" role="button"><Button variant="contained" startIcon={<LoginIcon />}>Login</Button></Link>
                            </form> : !window.localStorage.getItem('AdminToken') ? <Link to='/profile'><Button color='secondary' variant="contained" startIcon={<AccountCircleIcon />}>{giveFirstName()}</Button></Link> : <Button variant="contained" startIcon={<LogoutIcon />} onClick={AdminLogout}>Logout</Button>
                            }
                        </div>
                    </ThemeProvider>
                </div>
                <button className='humburger'>Bum</button>
            </div>


        </>
    )
}

export default Navbar

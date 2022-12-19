import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./CSS/NavBar.css";

function Navbar() {

    let location = useLocation();
    // useEffect(() => {
    // }, [location]);
    const navigate = useNavigate();
    const UserLogout = () => {
        // window.localStorage.removeItem('Token') || window.localStorage.removeItem('AdminToken');
        // navigate("/", { replace: true });

        if(window.localStorage.getItem("Token")){
            window.localStorage.removeItem("Token");
            navigate("/login", {replace: true});
        }
        else{
            if(window.localStorage.getItem("AdminToken")){
                window.localStorage.removeItem("AdminToken");
                navigate("/admin", {replace: true});
            }
        }
    }

    return (
        <>
            <div className="nevigation c-s">
                <p className="logo"><i className="fas fa-spa"></i>ShareThing</p>

                <div className="nav-btn">
                    <ul className="nav-list">
                        <li >
                           <Link className={`nav_link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>

                        { !window.localStorage.getItem('Token') && <li >
                            <Link className={`nav_link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>}

                        {!window.localStorage.getItem('Token') ||<li >
                            <Link className={`nav_link ${location.pathname === '/compose' ? "active" : ""}`} to="/compose">Compose</Link>
                        </li>}

                        {!window.localStorage.getItem('Token') || <li >
                            <Link className={`nav_link ${location.pathname === '/myblogs' ? "active" : ""}`} to="/myblogs">Myblogs</Link>
                        </li>}

                        {!window.localStorage.getItem('Token') || <li >
                            <Link className={`nav_link ${location.pathname === '/profile' ? "active" : ""}`} to="/profile">Profile</Link>
                        </li>}
                    </ul>
                <div className="singin-singup">
                    {!window.localStorage.getItem('Token') && !window.localStorage.getItem('AdminToken') ? <form className="d-flex" role="search">
                        <Link className="singin" to="/login" role="button">Login</Link>
                        {/* <Link className="singup" to="/admin" role="button">Admin</Link> */}
                    </form> : <button className="singin" onClick={UserLogout} >Logout</button>
                    }
                </div>
                </div>
                <button className='humburger'>Bum</button>
            </div>


        </>
    )
}

export default Navbar
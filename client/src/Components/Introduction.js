import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../image/Secret.svg";
import "./CSS/Introduction.css";

function Introduction() {
    return (
        <>
            <div className="Intro-container">
                <div className="Intro-content">
                    <h1>Share your thoughts</h1>
                    <h2> With your friends.</h2>
                    <p>ShareThing is a blogging platform for college students. Where students can share their stories, poetry, notifications, latest events, etc.</p>
                    <Link to="/login" className='get-start'>Get started</Link>
                </div>
                <div className="image">
                    <img src={Logo} alt="" />
                </div>
            </div>
        </>
    )
}

export default Introduction
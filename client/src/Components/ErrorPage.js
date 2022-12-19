import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/Error_page.css'

function ErrorPage({type,typeString,msg,path}) {
    return (
        <div className='erroe-page'>
            <div id="error-page">
                <div className="content">
                    <h2 className="header" data-text={type}>
                        {type}
                    </h2>
                    <h4 data-text={typeString}>
                        {typeString}
                    </h4>
                    <p>
                        {msg}
                    </p>
                    <div className="btns">
                        {/* <a href="https://www.codingnepalweb.com/">Log in</a> */}
                        <Link to={path} >Redirect</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
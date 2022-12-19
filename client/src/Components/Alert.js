import React from 'react'
import "./CSS/Alert.css";

 function Alert(props) {
    const capitalize = (str)=>{
        const lower = str.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        props.alrt && <div className='custom_css'>
            <div className={`alert alert-${props.alrt.type} alert-dismissible fade show`} role="alert">
             {capitalize(props.alrt.meg)}
            </div>
        </div>
    )
}

export default Alert;
import { Alert } from '@mui/material';
import React from 'react'
import "./CSS/Alert.css";


 function Notificaton(props) {
    const capitalize = (str)=>{
        const lower = str.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        props.alrt && <div className='custom_css'>
            {/* <div className={`alert alert-${props.alrt.type} alert-dismissible fade show`} role="alert">
             {capitalize(props.alrt.meg)}
            </div> */}
            <Alert severity={props.alrt.type}>{capitalize(props.alrt.meg)}</Alert>
        </div>
    )
}

export default Notificaton;
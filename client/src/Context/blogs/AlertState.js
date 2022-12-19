import React, {useState } from 'react'
import AlertContex from './AlertContext';


const AlertState = (props) => {
    const [alert, setAlert] = useState(null);

    const giveAlert = (type, meg) => {
        setAlert({
          meg: meg,
          type: type
        });
        setTimeout(() => {
          setAlert(null)
        }, 3000);
      }

  return (
    <AlertContex.Provider value={{alert, giveAlert}}>
        {props.children}
    </AlertContex.Provider>
  )
}

export default AlertState;
import React, { useContext, useEffect } from 'react'
import UserContext from '../Context/user/UserContext';
import "./CSS/Profile.css";
import { Link} from "react-router-dom";
import { Button, createTheme, ThemeProvider } from '@mui/material';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const theme = createTheme({
    palette: {
        primary: {
          main: '#35D0BA',
        //   main: '#0dcaf0',
        },
        secondary: {
          main: '#EB455F',
        },
      },
})


function Profile() {
    const UserState = useContext(UserContext);
    const { getSingleUser, singleUser } = UserState;
    const { Username, email, department } = singleUser;

    useEffect(() => {
        getSingleUser();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='profile'>
            <div class="card mb-3 pr-card" style={{maxWidth: "60vw"}}>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="http://www.butte.edu/_resources/img/home/campus-center.jpg" class="img-fluid rounded-start" alt="..." />
                    </div>
                    <div class="col-md-8 card-col">
                        <div class="card-body">
                            <h1 class="card-title">{Username}</h1>
                            <p class="card-title">Department of {department}</p>
                            <p class="card-text">{email}</p>
                            <ThemeProvider theme={theme}>
                            <Link to='/update_password' ><Button color='primary' variant="contained" startIcon={<UpgradeIcon />}>Update password</Button></Link>
                            <Link to='/delete20%account' className='mx-2' ><Button  color='error' variant="contained" startIcon={<DeleteSweepIcon />}>Delete account</Button></Link>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
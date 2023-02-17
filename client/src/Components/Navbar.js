import * as React from 'react';
import { Link } from "react-router-dom";
import "./CSS/NavBar.css";
import NavBtnsRight from './NavBtnsRight';
import "./CSS/humburger.css"
import MenuIcon from '@mui/icons-material/Menu';
import NavFlotingMenu from './NavFlotingMenu';


function Navbar() {

    const [menu_state, setMenuState] = React.useState('close');
    const [clicked, setClicked] = React.useState(false);

    const ClickedBtn = ()=>{
        if(!clicked){
            setMenuState('open');
        }else{
            setMenuState('close');
        }
        setClicked(!clicked);
    }
    
    return (
        <>
            <div className="nevigation c-s">
                <Link to='/' className="logo"><i className="fas fa-spa"></i>ShareThing</Link>
                <NavBtnsRight />
                <div className="hamburger" onClick={ClickedBtn}>
                    <MenuIcon fontSize='large' />
                </div>
            </div>
            <div className={`menu ${menu_state}`}>
                <NavFlotingMenu clicked={ClickedBtn} />
            </div>
        </>
    )
}

export default Navbar

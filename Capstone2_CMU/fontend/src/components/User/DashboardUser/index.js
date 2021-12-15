import React, { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';

function User(props) {

    const {history} = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const handleLogout = () =>{
    //     alert('ok')
    //     // localStorage.removeItem('userInfo');
    //     // history.push('/login')
    // }
    return (
        <li className="header_navbar--item">
            <div
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="header_info header_info--user"
                style={{ right: '45px' }}
            >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                style={{ color:"white"}}
                >
                    <AccountCircle />
                </IconButton>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem><NavLink to='/user/billcomplete'>Hóa đơn  </NavLink></MenuItem>
                <MenuItem > <div  style={{color: "#1890ff"}}>Logout</div> </MenuItem>
            </Menu>
        </li>
    );
}

export default User;
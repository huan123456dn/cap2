import React, { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';

function User() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="header-info_left">
            <div
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <p className="title_name">Ngô Khắc Tiến</p>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                style={{ color:"white" , padding : 0}}
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
                {/* <MenuItem ><NavLink to='/manager'>Manager </NavLink></MenuItem>
                <MenuItem ><NavLink to='/nhanvien'>Staff </NavLink></MenuItem> */}
                <MenuItem ><NavLink to='/login'>Logout </NavLink></MenuItem>
            </Menu>
        </div>
    );
}

export default User;
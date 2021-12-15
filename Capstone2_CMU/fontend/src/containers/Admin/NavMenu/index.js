import React from 'react';
import { NavLink } from 'react-router-dom';

function NavMenu() {

    return (
        <div className="menu__left l-2">
            <div className="sidebar">
                <header>Admin</header>
                <ul className="list__menu">
                    {/* <NavLink className="list__menu--item" to="#" activeStyle={{ borderLeft: "3px solid #b93632", color: "#b93632" }} > */}
                    <li className="list__menu--item">
                        <div className="menu_item--inner">
                            <i className="fas fa-dollar-sign"></i>
                            <span>Thống kê doanh thu</span>
                        </div>
                    </li>
                    {/* </NavLink> */}
                    <NavLink className="list__menu--item" to="/admin/branchmanagement" activeStyle={{ borderLeft: "3px solid #b93632", color: "#b93632" }} >
                        <li>
                            <div className="menu_item--inner">
                                {/* <i className="fas fa-prescription-bottle-alt"></i> */}
                                <i class="fas fa-home"></i>
                                <span>Quản lí chi nhánh</span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink className="list__menu--item" to="/admin/accountmanager" activeStyle={{ borderLeft: "3px solid #b93632", color: "#b93632" }} >
                        <li>
                            <div className='menu_item--inner'>
                                <i className="fas fa-users"></i>
                                <span>Quản lý tài khoản</span>
                            </div>
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div >
    )
}
export default NavMenu;

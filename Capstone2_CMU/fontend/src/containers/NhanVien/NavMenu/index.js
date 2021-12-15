import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

function NavMenu() {

    const [addClass, setAddClass] = useState(false);

    const addclass = (value) => {
        localStorage.setItem('openNavbar', JSON.stringify(value))
        setAddClass(value)
    }

    useEffect(() => {
        setAddClass(Boolean(JSON.parse(localStorage.getItem('openNavbar'))))
    }, [addClass])

    return (
        <div className="menu__left l-2">
            <div className="sidebar">
                <header>NHÂN VIÊN</header>
                <ul className="list__menu">
                    <NavLink onClick={() => addclass(false)} className="list__menu--item" to="/staff/sell" activeStyle={{ borderLeft: "3px solid #b93632", color: "#b93632" }} >
                        <li >
                            <div className="menu_item--inner">
                                <i className="fas fa-dollar-sign"></i>
                                <span>Bán thuốc</span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink onClick={() => addclass(false)} className="list__menu--item" to="/staff/offbilllist" activeStyle={{ borderLeft: "3px solid #b93632", color: "#b93632" }} >
                        <li >
                            <div className="menu_item--inner">
                                <i class="fas fa-file-invoice"></i>
                                <span>Hóa đơn tại quầy</span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink onClick={() => addclass(false)} className="list__menu--item" to="/staff/onlinebilllist" activeStyle={{ borderLeft: "3px solid #b93632", color: "#b93632" }} >
                        <li >
                            <div className="menu_item--inner">
                                <i class="fas fa-file-invoice"></i>
                                <span>Hóa đơn điện tử</span>
                            </div>
                        </li>
                    </NavLink>
                    <li className={addClass ? 'list__menu--item active_lits' : 'list__menu--item'}>
                        <div className="menu_item--inner">
                        <i className="fas fa-prescription-bottle-alt"></i>
                            <span>Hàng hóa</span>
                        </div>
                        <ul className="list__menu--child">
                            <NavLink onClick={() => addclass(true)} className="menu--child--item" to="/staff/druglist" activeStyle={{ color: "#b93632" }} >
                                <li className='menu__child--item' >Danh sách thuốc </li>
                            </NavLink>
                            <NavLink onClick={() => addclass(true)} className="menu--child--item" to="/staff/thuocsaphethang" activeStyle={{ color: "#b93632" }} >
                                <li className='menu__child--item' >Thuốc sắp hết hàng</li>
                            </NavLink>
                            <NavLink onClick={() => addclass(true)} className="menu--child--item" to="/staff/thuosaphethan" activeStyle={{ color: "#b93632" }} >
                                <li className='menu__child--item'>Thuốc sắp hết hạn</li>
                            </NavLink>
                        </ul>
                    </li>
                </ul>
            </div>
        </div >
    )
}
export default NavMenu;

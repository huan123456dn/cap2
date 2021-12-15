import React, { useState , useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';

function NavMenu(props) {

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
                <header>QUẢN LÝ</header>
                <ul className="list__menu">
                    <NavLink onClick={() => addclass(false)} className="list__menu--item" to="/manager/offbilllist" activeStyle={{ borderLeft: "3px solid #b93632", color: "#b93632" }} >
                        <li >
                            <div className="menu_item--inner">
                            <i class="fas fa-file-invoice"></i>
                                <span>Hóa đơn tại quầy</span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink onClick={() => addclass(false)} className="list__menu--item" to="/manager/onlinebilllist" activeStyle={{ borderLeft: "3px solid #b93632", color: "#b93632" }} >
                        <li >
                            <div className="menu_item--inner">
                            <i class="fas fa-file-invoice"></i>
                                <span>Hóa đơn điện tử</span>
                            </div>
                        </li>
                    </NavLink>
                    {/* <li className={addClass ? 'list__menu--item active_lits' : 'list__menu--item'}  >
                        <div className="menu_item--inner">
                            <i className="fas fa-prescription-bottle-alt"></i>
                            <span>Quản lý thuốc</span>
                        </div>
                        <ul className="list__menu--child ">
                            <NavLink onClick={() => addclass(true)} className="menu--child--item" to="/manager/druglist" activeStyle={{ color: "#b93632" }} >
                                <li > Danh sách thuốc </li>
                            </NavLink>
                            <NavLink onClick={() => addclass(true)} className="menu--child--item" to="/manager/medicineinstock" activeStyle={{ color: "#b93632" }} >
                                <li> Quản lý kho thuốc</li>
                            </NavLink>
                        </ul>
                    </li> */}
                    <NavLink onClick={() => addclass(false)} className="list__menu--item" to="/manager/druglist" activeStyle={{ borderLeft: "3px solid #b93632", color: "#b93632" }} >
                        <li >
                            <div className="menu_item--inner">
                                <i className="fas fa-prescription-bottle-alt"></i>
                                <span>Danh sách thuốc</span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink onClick={() => addclass(false)} className="list__menu--item" to="/manager/employeemanager" activeStyle={{ borderLeft: "3px solid #b93632", color: "#b93632" }} >
                        <li >
                            <div className="menu_item--inner">
                                <i className="fas fa-users"></i>
                                <span>Quản lý Nhân viên</span>
                            </div>
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        formStore: state.NavbarReducer.form,
    };
};

const mapDispatchToProps = null;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    // withStyles(styles),
    withConnect
)(NavMenu); 
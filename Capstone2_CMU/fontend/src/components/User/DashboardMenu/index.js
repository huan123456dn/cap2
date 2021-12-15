import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as searchActions from './../../../actions/User/search';

function Menu(props) {

    const removeSearch = () =>{
        let keyword = ''
        const {searchActionCreator} = props;
        const { searchProduct } = searchActionCreator;
        searchProduct(keyword);
    }

    return (
        <div className="header_menu">
            <ul className="header_menu--list p-x-45">
                <li className="header_menu--item menu_item--hover">
                    <NavLink
                        className="menu_list" 
                        to="/user/functionalfoods"
                        activeStyle={{
                            borderBottom: '2px solid var(--color_origin)'
                        }}
                        onClick={ removeSearch }
                    >
                        <p className="menu_list--name mr-10">THỰC PHẨM CHỨC NĂNG</p>
                        <i className="fas fa-angle-down"></i>
                    </NavLink>
                </li>
                <li className="header_menu--item menu_item--hover">
                    <NavLink
                        className="menu_list"
                        to="/user/cosmetics"
                        activeStyle={{
                            borderBottom: '2px solid var(--color_origin)'
                        }}
                        onClick={ removeSearch }
                    >
                        <p className="menu_list--name mr-10">DƯỢC MỸ PHẨM</p>
                        <i className="fas fa-angle-down"></i>
                    </NavLink>
                </li>
                <li className="header_menu--item menu_item--hover">
                    <NavLink
                        className="menu_list"
                        to="/user/personalcare"
                        activeStyle={{
                            borderBottom: '2px solid var(--color_origin)'
                        }}
                        onClick={ removeSearch }
                    >
                        <p className="menu_list--name mr-10">CHĂM SÓC CÁ NHÂN</p>
                        <i className="fas fa-angle-down"></i>
                    </NavLink>
                </li>
                <li className="header_menu--item menu_item--hover">
                    <NavLink
                        className="menu_list"
                        to="/user/medicalequipment"
                        activeStyle={{
                            borderBottom: '2px solid var(--color_origin)'
                        }}
                        onClick={ removeSearch }
                    >
                        <p className="menu_list--name mr-10">THIẾT BỊ Y TẾ</p>
                        <i className="fas fa-angle-down"></i>
                    </NavLink>
                </li>
                <li className="header_menu--item menu_item--nochild">
                    <NavLink
                        className="menu_list"
                        to="/user/healthcorner"
                        activeStyle={{
                            borderBottom: '2px solid var(--color_origin)'
                        }}
                        onClick={ removeSearch }
                    >
                        <p className="menu_list--name menu_list--link  m-0">GÓC SỨC KHỎE</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    searchActionCreator: bindActionCreators(searchActions, dispatch),
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    // withReduxForm,
)(Menu);
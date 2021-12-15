import React  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import Menu from './../../../components/User/DashboardMenu';
import Search from './../../../components/User/DashboardSearch';
import Card from './../DashboardCart';
import User from './../../../components/User/DashboardUser';

import * as searchActions from './../../../actions/User/search';

function Dashboard(props) {

    // const {history} = props;
    
    const onSearch = (keyword) =>{
        const {searchActionCreator} = props;
        const { searchProduct } = searchActionCreator;
        searchProduct(keyword);
    } 

    return (
        <div className="header__user ">
            <div className="header__content p-y-10 p-x-45">
                <nav className="header_navbar">
                    <ul className="header_navbar-list header--logo">
                        <li className="header_navbar-item">
                            <i className="fas fa-heartbeat heart"></i>
                        </li>
                        <li className="header_navbar-item title">
                            <p>Nhà thuốc 4.0 </p>
                        </li>
                    </ul>
                    <Search onSearch = {onSearch} />
                    <ul className="header_navbar-list header--info">
                        <li className="header_navbar--item">
                            <div className="header_info header_info--phone">
                                <i className="fas fa-phone "></i>
                                <div className="header_info--title">
                                    <a href="tel:1800 6928" className="info_title--phone">12381283</a>
                                    <p className="info_title--text">Tư vấn miễn phí</p>
                                </div>
                            </div>
                        </li>
                        <Card />
                        <User />
                    </ul>
                </nav>
            </div>
            <Menu />
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
)(Dashboard);
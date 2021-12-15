import React from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { compose } from 'redux';
import Dashboard from './../Dashboard';
import NavMenu from './../NavMenu';
import { NHANVIEN_ROUTES } from './../../../router';

function Employee(props) {
    const { formStore } = props;
    // menu
    const formNavbar = () => {
        const html = formStore ? <NavMenu /> : '';
        return html;
    }
    const rederNhanvienroutes = () => {
        let xhtml = null;
        xhtml = (
            xhtml = NHANVIEN_ROUTES.map(route => {
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                        name={route.name}
                    />
                );
            })
        );
        return xhtml;
    }

    return (
        <div className="grid">
            <Dashboard />
            <div className='body'>
                {
                    formNavbar()
                }
                <div className={formStore ? ' w_l content__table' : 'content__table'}>
                    {
                        rederNhanvienroutes()
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        formStore: state.NavbarReducer.form,
    };
};

const withConnect = connect(mapStateToProps, null);

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
)(Employee);

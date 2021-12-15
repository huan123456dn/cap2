import React from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { compose } from 'redux';
import Dashboard from './../Dashboard';
import Footer from './../Footer';
import { User_ROUTES } from './../../../router';

function User(props) {

    const {history} = props;

    const rederUsersroutes = () => {
        let xhtml = null;
        xhtml = (
            xhtml = User_ROUTES.map(route => {
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
            <Dashboard history={history}/>
            <div className='body'>
                {
                    rederUsersroutes()
                }
            </div>
            <Footer />
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
)(User);

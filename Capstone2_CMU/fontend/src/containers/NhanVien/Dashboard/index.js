import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as formAction from './../../../actions/';
import User from './../../../components/Nhanvien/DashboardUser';

function Dashboard(props) {
    const showMenu = () => {
        const { formActionsCreator } = props;
        const { showForm } = formActionsCreator;
        showForm()
    }

    return (
        <div className="header">
            <div className="header--content p-y-10 p-x-30">
                <nav className="header_navbar">
                    {/* <!-- header-logo --> */}
                    <ul className="header_navbar-list header--logo">
                        <li className="header_navbar-item">
                            <i className="fas fa-heartbeat heart"></i>
                        </li>
                        <li className="header_navbar-item title">
                            <p className="name_web">Nhà thuốc 4.0 </p>
                        </li>
                        <li className="header_navbar-item">
                            <input type="checkbox" id="check" />
                            <div className="btn_narbar">
                                <button
                                    onClick={showMenu}
                                    className="fas fa-bars icon_menu open"
                                ></button>
                            </div>
                        </li>
                    </ul>
                    <User/>
                </nav>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        formStore: state.NavbarReducer.form,
        // initialValues: {   // của redux-from ( initialValues api ) để lấy data đổ vào form
        //     title: state.task.taskEditting ? state.task.taskEditting.title : '',
        //     description: state.task.taskEditting ? state.task.taskEditting.description : '',
        //     status: state.task.taskEditting ? state.task.taskEditting.status : ''
        // }
    };
};

const mapDispatchToProps = dispatch => ({
    formActionsCreator: bindActionCreators(formAction, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
    // withStyles(styles),
    withConnect
)(Dashboard);

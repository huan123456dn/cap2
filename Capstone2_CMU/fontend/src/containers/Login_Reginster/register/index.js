import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from './../../../components/formHelper'

import validate from './../../../commons/Validate/validateReginter';
import { NavLink } from 'react-router-dom';
import Header from '../header';

import * as addAccountApi from './../../../apis/login_Register/register';
import {toastSuccess} from './../../../helpers';
import Button from '@mui/material/Button';

function Register(props) {

    const { handleSubmit , history } = props;

    const [eye, setEye] = useState(true);
    const [error, setError] = useState(true);

    const handleEye = () => {
        setEye(!eye);
    }

    const handleSubmitForm = async data => {
        await addAccountApi.postAccountUser(data).then(res =>{
            const {data} = res;
            setError(data.error);
            if(!res.data.error){
                setTimeout(
                    () =>{
                        toastSuccess('Đăng ký tài khoản thành công !!!')
                        history.push('/login')
                    }
                    ,1000
                )
            }
        })
    }

    return (
        <div className="login" >
            <div className="login_content pt-30">
                <Header />
                <form onSubmit={handleSubmit(handleSubmitForm)} className="form col l-6 l-o-3">
                    <div className="register-form ">
                        <div className="register_form--title ">
                            <div className="form_inner grid">
                                <div className="form__content l-12 form__client">
                                    <h1 className="mb-10">Đăng kí tài khoản</h1>
                                    <div className="form_input--error">
                                        <div className="form_input--icon">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </div>
                                        <div className="form_input--text">
                                            <Field
                                                className='input_control'
                                                name="userName"
                                                component={renderTextField}
                                                placeholder="Tài khoản (ví dụ) : ngokhactien"
                                            />
                                        </div>
                                    </div>
                                    <div className="error" >{error}</div>
                                    <div className="form_input">
                                        <div className="form_input--icon">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </div>
                                        <div className="form_input--text">
                                            <Field
                                                className='input_control'
                                                name="fullName"
                                                component={renderTextField}
                                                placeholder="Đại diện (ví dụ): Ngô Khắc Tiến"
                                            />
                                        </div>
                                    </div>
                                    <div className="form_input">
                                        <div className="form_input--icon">
                                            <i className="fa fa-phone" aria-hidden="true"></i>
                                        </div>
                                        <div className="form_input--text">
                                            <Field
                                                className='input_control'
                                                name="phoneNumber"
                                                component={renderTextField}
                                                placeholder="Số điện thoại"
                                            /></div>
                                    </div>
                                    <div className="form_input">
                                        <div className="form_input--icon">
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                        </div>
                                        <div className="form_input--text">
                                            <Field
                                                className='input_control'
                                                name="address"
                                                component={renderTextField}
                                                placeholder="Địa chỉ"
                                            /></div>
                                    </div>
                                    <div className="form_input">
                                        <div className="form_input--icon">
                                            <i className="fa fa-lock" aria-hidden="true"></i>
                                        </div>
                                        <div className="form_input--text form__MK">
                                            <Field
                                                className='input_control'
                                                name="password"
                                                component={renderTextField}
                                                placeholder="Mật khẩu"
                                                type={eye ? "password" : "text"}
                                            />
                                            <span onClick={handleEye} >
                                                <i className={eye ? "fas fa-eye-slash" : ' fas fa-eye'}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="register_submit">
                                        <Button style={{width : "100%" , marginBottom: "10px"}}  type="submit" variant="contained">Đăng kí</Button>
                                        <NavLink to='/login'>
                                            <button className="return_btn mb-20">Bạn đã có tài khoản? Kích để đăng nhập !</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


// const mapDispatchToProps = dispatch => ({
//     addAccountUserActionsCreator: bindActionCreators(addAccountActions, dispatch),
// });


const withConnect = connect(null, null);

const FORM_NAME = 'USER_REGISTER';

const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate,
})

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    withReduxForm,
)(Register);


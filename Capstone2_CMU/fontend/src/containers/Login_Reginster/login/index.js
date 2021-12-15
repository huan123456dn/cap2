import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from './../../../components/formHelper'

import validate from './../../../commons/Validate/validateLogin';
import { NavLink } from 'react-router-dom';
import * as userRequestApi from './../../../apis/login_Register/login';
import Button from '@mui/material/Button';

import Header from './../header'

function Login(props) {

    const { handleSubmit, history } = props;

    const [eye, setEye] = useState(true);
    const [error, setError] = useState('');


    const handleEye = () => {
        setEye(!eye);
    }

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    const handleSubmitForm = data => {
        userRequestApi.postUserRequest(data).then(res => {
            const { data } = res;
            if (!data.error) {
                setCookie('token', data.token, 1)
                history.push('/user')
            }else{
                setError(data.error);
            }
            // localStorage.removeItem('userInfo');
            // localStorage.setItem('userInfo' ,JSON.stringify( data.userId) );
            // console.log(data);
        });
    }


    return (
        <div className="login" >
            <div className="login_content pt-30">
                <Header />
                <form onSubmit={handleSubmit(handleSubmitForm)} className="form col l-4 l-o-4">
                    <div className="login-form p-x-30 ">
                        <h1> Đăng Nhập</h1>
                        <div className="form_input">
                            <div className="form_input--icon">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </div>
                            <div className="form_input--text">
                                <Field
                                    className='input_control'
                                    name="userName"
                                    component={renderTextField}
                                    placeholder="Nhập tài khoản"
                                />
                            </div>
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
                                    placeholder="Mật Khẩu"
                                    type={eye ? "password" : "text"}
                                />
                                <span onClick={handleEye} >
                                    <i className={eye ? "fas fa-eye-slash" : ' fas fa-eye'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="login--error">{error}</div>
                        <div className="submit pb-16 pt-12">
                            <div className="l-6 login-btn">
                                <Button type="submit" variant="contained">Đăng Nhập</Button>
                            </div>
                            <NavLink to='/register' className="login_link l-6" >
                                <button className="btn_link">Đăng ký tài khoản</button>
                            </NavLink>
                        </div>
                        <NavLink to='/forgotpassword'  >
                            <div className="forgotPassword">Quên tài khoản</div>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

const withConnect = connect(null, null);

const FORM_NAME = 'USER_LOGGIN';

const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate,
})

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    withReduxForm,
)(Login);
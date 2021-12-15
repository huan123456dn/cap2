import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from './../../../components/formHelper'

import validate from './../../../commons/Validate/validateLogin';
import { NavLink } from 'react-router-dom';
import * as userRequestApi from './../../../apis/login_Register/forgotPassword';
import Button from '@mui/material/Button';
import { toastSuccess  }  from './../../../helpers'

import Header from './../header'

function ForgetPassword(props) {

    const { handleSubmit , history } = props;

    const [eye, setEye] = useState(true);
    const [error, setError] = useState('');
    const [captcha, setCaptcha] = useState('');

    const [valueRandom, setValueRandom] = useState(null);


    const handleEye = () => {
        setEye(!eye);
    }
    useEffect(() => {
        setValueRandom(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5))
    }, [])

    const handleSubmitForm = data => {

        if (valueRandom === captcha.toLocaleLowerCase() ) {
            userRequestApi.putUserRequest(data).then(res =>{
                const {data} = res;
                if(!data.error && data.message){
                    history.push('/login');
                    setError('');
                    toastSuccess( data.message);
                }else{
                    setError(data.error);
                }
            });
            setError("")
        } else {
            setError("Captcha không đúng !!!")
        }
    }

    const onclickCaptcha = () => {
        setValueRandom(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5))
    }

    const captchaValue = (e) => {
        setCaptcha(e.target.value)
    }

    return (
        <div className="login" >
            <div className="login_content pt-30">
                <Header />
                <form onSubmit={handleSubmit(handleSubmitForm)} className="form col l-4 l-o-4">
                    <div className="login-form p-x-30 ">
                        <h1> Quên mật khẩu</h1>
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
                                    placeholder="Nhập mật khẩu mới"
                                    type={eye ? "password" : "text"}
                                />
                                <span onClick={handleEye} >
                                    <i className={eye ? "fas fa-eye-slash" : ' fas fa-eye'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="form_input--captach">
                            <div className='input__captcha' style={{ width: "24%" }}>
                                <input name="captcha" maxlength="5" value={captcha} onChange={captchaValue} />
                            </div>
                            <Button style={{ marginLeft: "20px" }} variant="contained" disabled>
                                {valueRandom}
                            </Button>
                            <div className="syns" onClick={onclickCaptcha} ><i class="fas fa-sync"></i></div>
                        </div>
                        <div className="login--error">{error}</div>
                        <div className="submit pb-16 pt-12">
                            <div className="l-6 login-btn">
                                <Button type="submit" variant="contained">Tiếp theo</Button>
                            </div>
                            <NavLink to='/login' className="login_link l-6" >
                                <button className="btn_link">Quay lại đăng nhập</button>
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const withConnect = connect(null, null);

const FORM_NAME = 'USER_FORGETPASSWORD';

const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate,
})

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    withReduxForm,
)(ForgetPassword);
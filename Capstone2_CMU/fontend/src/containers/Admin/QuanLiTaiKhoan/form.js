import React from 'react';
import { Modal } from 'antd';
import { Field } from 'redux-form';
import { renderTextField } from './../../../components/formHelper';
import Button from '@mui/material/Button';
import { toastError1 } from './../../../helpers/index';

function FormModal(props) {
    const { isModalVisible, handleCancel, handleSubmit, formTask, history, title, reset } = props;

    const handleSubmitForm = async (data) => {
        if (data.userName) {
            await handleCancel(false);
            await formTask({
                ...data,
                role :"manager"
            });
            reset();
            await setTimeout(
                history.go()
            )
        } else {
            toastError1('Vui lòng điền thông tin !!!')
        }
    }

    const handleCancelBtn = () => {
        handleCancel(false);
        reset()
    };

    const renderForm = () => {
        return (
            <div className='from__content grid'>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Tài khoản :</div>
                        <Field
                            className='input l-12'
                            name="userName"
                            component={renderTextField}
                            placeholder="Tài khoản"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Tên nhân viên :</div>
                        <Field
                            className='input l-12'
                            name="fullName"
                            component={renderTextField}
                            placeholder="Tên nhân viên"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Ngày Sinh :</div>
                        <Field
                            className='input l-12'
                            name="dateOfBirth"
                            component={renderTextField}
                            type="date"
                            placeholder="Ngày Sinh"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Ngày bắt đầu làm :</div>
                        <Field
                            className='input l-12'
                            name="dateStart"
                            component={renderTextField}
                            type="date"
                            placeholder="Ngày bắt đầu làm"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Số điện thoại</div>
                        <Field
                            className='input l-12'
                            name="phoneNumber"
                            component={renderTextField}
                            type="text "
                            placeholder="Số điện thoại"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Mật khẩu</div>
                        <Field
                            className='input l-12'
                            name="password"
                            component={renderTextField}
                            type="text"
                            placeholder="mật khẩu"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Gmail :</div>
                        <Field
                            className='input l-12'
                            name="email"
                            component={renderTextField}
                            type="text "
                            placeholder="Gmail"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Địa chỉ :</div>
                        <Field
                            className='input l-12'
                            name="address"
                            component={renderTextField}
                            type="text "
                            placeholder="Địa chỉ"
                        />
                    </div>
                </div>
            </div>
        )
    }


    return (
        <Modal
            title={title} visible={isModalVisible} onCancel={handleCancel}
            width={600}
            footer={null}
        >
            <div >
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    {
                        renderForm()
                    }
                    <div className='form_submit'>
                        <Button variant="outlined" onClick={handleCancelBtn} >Cancel</Button>
                        <Button variant="contained" type='submit' > OK</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default FormModal;
import React from 'react';
import { Modal } from 'antd';
import { Field } from 'redux-form';
import { renderTextField, renderSelectField } from './../../../components/formHelper';
import Button from '@mui/material/Button';
import { toastError1 } from './../../../helpers/index';

function FormModal(props) {
    const { isModalVisible, handleCancel, handleSubmit, formTask, history, title, reset } = props;

    const handleSubmitForm = async (data) => {
        if (data.pharmacyName) {
            await handleCancel(false);
            await formTask({
                ...data,
                role : "manager"
            });
            reset()
            await setTimeout(
                history.go()
            )
        } else {
            toastError1('Vui lòng điền thông tin !!!')
        }
    }

    const handleCancelBtn = () => {
        handleCancel(false);
        reset();
    };

    const renderForm = () => {
        return (
            <div className='from__content grid'>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Tên nhà thuốc :</div>
                        <Field
                            className='input l-12'
                            name="pharmacyName"
                            component={renderTextField}
                            placeholder="Tên nhà thuốc"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Trạng thái :</div>
                        <Field
                            className='select__typle input l-12'
                            name="action"
                            component={renderSelectField}
                            placeholder="Trạng thái"
                        >
                            <option></option>
                            <option value='Online'>Online</option>
                            <option value='Off'>Off</option>
                        </Field>
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Tên quản lí :</div>
                        <Field
                            className='input l-12'
                            name="managerName"
                            component={renderTextField}
                            placeholder="Tên quản lí"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Số điện thoại :</div>
                        <Field
                            className='input l-12'
                            name="phoneNumber"
                            component={renderTextField}
                            placeholder="Số điện thoại"
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
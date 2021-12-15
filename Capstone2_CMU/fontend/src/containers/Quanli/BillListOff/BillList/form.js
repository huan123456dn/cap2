import React from 'react';
import { Modal } from 'antd';
import { Field } from 'redux-form';
import { renderTextField } from '../../../../components/formHelper';
import Button from '@mui/material/Button';

const loadHttp = '/manager/offbilllist';

function FormModal(props) {
    const { isModalVisible, handleCancel, handleSubmit, title, formTask, history } = props;

    const handleSubmitForm = async (data) => {
        // console.log( data.dateBuy , data);
        await formTask(data);
        await handleCancel(false);
        await setTimeout(
            history.go(loadHttp)
        )
    }

    const handleCancelBtn = () => {
        handleCancel(false);
    };

    const renderForm = () => {
        return (
            <div className='from__content grid'>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Tên khách hàng :</div>
                        <Field
                            className='input l-12'
                            name="fullName"
                            component={renderTextField}
                            placeholder="Tên khách hàng"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Ngày bán :</div>
                        <Field
                            className='input l-12'
                            name="dateBuy"
                            component={renderTextField}
                            type="date"
                            placeholder="Ngày bán"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Số điện thoại :</div>
                        <Field
                            className='input l-12'
                            name="phoneNumber"
                            component={renderTextField}
                            type="text"
                            placeholder="Trạng thái"
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
import React from 'react';
import { Modal } from 'antd';
import { Field } from 'redux-form';
import { renderSelectField, renderTextField } from './../../../../components/formHelper';
import Button from '@mui/material/Button';
import { toastError1 } from './../../../../helpers/index';

function FormModal(props) {
    const { isModalVisible, handleCancel, handleSubmit, formTask, title, reset , history } = props;

    const valueSelect = ['', 'Bánh', 'Bịch', 'Bình', 'Bộ', 'Bơm tiêm', 'cái', 'Can', 'Cặp', 'Chai', 'Chiếc', 'Cóc', 'Cuộn', 'Dây', 'Công cụ', 'Đôi', 'Gói', 'Gram', 'Hộp', 'Hoàn', 'Hộp to', 'Hộp nhỏ', 'Hũ', 'kg', 'Kiện', 'Kim tiêm', 'Kit', 'Liều', 'Lít', 'Lọ', 'Lốc', 'Mci', 'Miếng', 'Ống', 'Que cấy', 'Thanh cấy', 'Túi', 'Tiếp', 'Vỉ', 'Vòng', 'Viên', 'Xy lanh']

    const handleSubmitForm = async (data) => {
        await handleCancel(false);
        await formTask(data);
        reset()
        await setTimeout(
            history.go()
        )
    }

    const handleCancelBtn = () => {
        handleCancel(false);
        reset()
    };

    const rederSelect = () => {
        const result = [];
        for (let i = 0; i < valueSelect.length; i++) {
            result.push(<option value={valueSelect[i]}>{valueSelect[i]}</option>)
        }
        return result;
    }

    const renderForm = () => {
        return (
            <div className='from__content grid'>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Tên thuốc :</div>
                        <Field
                            className='input l-12'
                            name="productName"
                            component={renderTextField}
                            placeholder="Tên thuốc"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Mã thuốc :</div>
                        <Field
                            className=' select__typle input l-12'
                            name="drugCode"
                            component={renderTextField}
                            placeholder="Mã thuốc"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Số lượng :</div>
                        <Field
                            className='input l-12'
                            name="quantityBuy"
                            component={renderTextField}
                            placeholder="Số lượng"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>ĐVT(bán) :</div>
                        <Field
                            className=' select__typle input l-12'
                            name="dvt"
                            component={renderSelectField}
                            placeholder="ĐVT(bán)"
                        >
                            {
                                rederSelect()
                            }
                        </Field>
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Giá bán :</div>
                        <Field
                            className='input l-12'
                            name="price"
                            component={renderTextField}
                            placeholder="Giá bán"
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


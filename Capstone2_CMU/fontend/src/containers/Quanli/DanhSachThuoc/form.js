import React, { useState } from 'react';
import { Modal } from 'antd';
import { Field } from 'redux-form';
import { renderTextField, renderSelectField } from './../../../components/formHelper';
import Button from '@mui/material/Button';
import {toastError1} from './../../../helpers/index';

function FormModal(props) {
    const { isModalVisible, handleCancel, title, handleSubmit, formTask, reset, history  } = props;

    const valueSelect = ['', 'Bánh', 'Bịch', 'Bình', 'Bộ', 'Bơm tiêm', 'Cái', 'Can', 'Cặp', 'Chai', 'Chiếc', 'Cóc', 'Cuộn', 'Dây', 'Công cụ', 'Đôi', 'Gói', 'Gram', 'Hộp', 'Hoàn', 'Hộp to', 'Hộp nhỏ', 'Hũ', 'kg', 'Kiện', 'Kim tiêm', 'Kit', 'Liều', 'Lít', 'Lọ', 'Lốc', 'Mci', 'Miếng', 'Ống', 'Que cấy', 'Thanh cấy', 'Túi', 'Tiếp', 'Vỉ', 'Vòng', 'Viên', 'Xy lanh']
    const [image, setImage] = useState('')

    const rederSelect = () => {
        const result = [];
        for (let i = 0; i < valueSelect.length; i++) {
            result.push(<option value={valueSelect[i]}>{valueSelect[i]}</option>)
        }
        return result;
    }

    const handleSubmitForm = async (data) => {
        if (data.productName) {
            var formdata = new FormData();
            formdata.append('image', image);
            formdata.append('username', 'Chris');
            await formTask({
                ...data,
                status: Number(data.status),
                quantity: Number(data.quantity),
                importPrices: Number(data.importPrices),
                price: Number(data.price),
                rating: Number(data.rating),
                // img: formdata
            });
            await handleCancel(false);
            await setTimeout(
                history.go()
            )
            reset();
        }else{
            toastError1('Vui lòng điền thông tin !!!')
            
        }
    }

    const handleCancelBtn = () => {
        handleCancel(false);
        reset();
    };

    // const onImageChange = event => {
    //     if (event.target.files && event.target.files[0]) {
    //         var formdata = new FormData();
    //         // setImage( formdata.appendevent.target.files[0]);
    //         console.log(event.target.files[0]);
    //         formdata.append('image', event.target.files[0]);
    //         console.log(formdata); //
    //     }
    // };

    const renderForm = () => {
        return (
            <div className='from__content grid'>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Tên Thuốc :</div>
                        <Field
                            className='input l-12'
                            name="productName"
                            component={renderTextField}
                            placeholder="Tên Thuốc"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Mã Thuốc :</div>
                        <Field
                            className='input l-12'
                            name="drugCode"
                            component={renderTextField}
                            placeholder="Mã Thuốc"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Nhóm Thuốc :</div>
                        <Field
                            className='select__typle input'
                            name="status"
                            component={renderSelectField}
                            placeholder="Nhóm Thuốc"
                        >
                            <option value='0'></option>
                            <option value='1'>THỰC PHẨM CHỨC NĂNG</option>
                            <option value='2'>DƯỢC MỸ PHẨM</option>
                            <option value='3'>CHĂM SÓC CÁ NHÂN</option>
                            <option value='4'>THIẾT BỊ Y TẾ</option>
                        </Field>
                    </div>
                    <div className="row2 handle__form">
                        <div className='mleft-5'>Đánh giá :</div>
                        <Field
                            className='select__typle input'
                            name="rating"
                            component={renderSelectField}
                            placeholder="Đánh giá"
                        >
                            <option value='0'></option>
                            <option value='1'>1 sao</option>
                            <option value='2'>2 sao</option>
                            <option value='3'>3 sao</option>
                            <option value='4'>4 sao</option>
                            <option value='5'>5 sao</option>
                        </Field>
                    </div>

                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Hình Ảnh :</div>
                        <Field
                            className='select__typle input'
                            name="img"
                            component={renderTextField}
                            placeholder="Dán link ảnh vào đây ..."
                        >
                        </Field>
                        {/* <input
                            name="img"
                            className='input__img l-12'
                            onChange={onImageChange}
                            type="input"
                        ></input> */}
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Đơn Vị Bán:</div>
                        <Field
                            className='select__typle'
                            name="dvt"
                            component={renderSelectField}
                        >
                            {
                                rederSelect()
                            }
                        </Field>
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Giá Nhập  :</div>
                        <Field
                            className='input l-12'
                            name="importPrices"
                            component={renderTextField}
                            placeholder="Giá Nhập"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Giá Bán :</div>
                        <Field
                            className='input l-12'
                            name="price"
                            component={renderTextField}
                            placeholder="Giá Bán"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Quy Cách Đóng Gói :</div>
                        <Field
                            className='input l-12'
                            name="pack"
                            component={renderTextField}
                            placeholder="Hộp 10 vỉ 10 viên"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Hàm Lượng  :</div>
                        <Field
                            className='input l-12'
                            name="content"
                            component={renderTextField}
                            placeholder="500g"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Số Lượng :</div>
                        <Field
                            className='input l-12'
                            name="quantity"
                            component={renderTextField}
                            placeholder="1"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Hạn Sử Dụng :</div>
                        <Field
                            className='input l-12'
                            name="expiryDate"
                            component={renderTextField}
                            type="date"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Nước Sản Xuất :</div>
                        <Field
                            className='input l-12'
                            name="countrySX"
                            component={renderTextField}
                            placeholder="Nước sản xuất"
                        />
                    </div>
                    <div className="row2 handle__form ">
                        <div className='mleft-5'>Nhà Sản xuất :</div>
                        <Field
                            className='input l-12'
                            name="homeSX"
                            component={renderTextField}
                            placeholder="Nhà sản xuất"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Thành Phần Chính :</div>
                        <Field
                            className='input l-12'
                            name="element"
                            component={renderTextField}
                            placeholder="Thành phần chính"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Hỗ Trợ:</div>
                        <Field
                            className='input l-12'
                            name="support"
                            component={renderTextField}
                            placeholder="Hỗ Trợ"
                        />
                    </div>
                </div>
                <div className='from__content--line row '>
                    <div className="row1 handle__form">
                        <div className='mleft-5'>Công Dụng:</div>
                        <Field
                            className='input l-12'
                            name="uses"
                            component={renderTextField}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Modal
            title={title} visible={isModalVisible} onCancel={handleCancel}
            width={800}
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
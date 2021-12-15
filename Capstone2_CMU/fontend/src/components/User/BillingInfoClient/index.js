import React from 'react';
import { Field } from 'redux-form';
import { renderTextField } from './../../formHelper';


function FormInfoClient(props) {
    
    let infoUser =  JSON.parse(localStorage.getItem('userInfo'))
    
    return (
        <div>
            <div className="form_info">
                <div className="form_info--name--stt p-y-8 row">
                    <div className="input_ho_ten col l-6">
                        <Field
                            name="fullName"
                            component={renderTextField}
                            type="text"
                            placeholder="Nhập họ và tên"
                        />
                    </div>
                    <div className="input_sđt col l-6">
                        <Field
                            name="phoneNumber"
                            component={renderTextField}
                            type="text"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                </div>
                <div className="form_info--gmail">
                    <div className="input_gmail l-12">
                        <Field
                            className="w-100" 
                            name="address"
                            component={renderTextField}
                            type="text"
                            placeholder="Nhập địa chỉ"
                        />
                    </div>
                </div>
                <span className="pt-24">Chọn hình thức nhận hàng</span>
                <div className="field_hinh_thuc_nhan_hang p-y-8">
                    <label htmlFor="radio_1" className="radio_hinh_thuc_nhan_hang  mr-20">
                        <Field
                            className="mr-10"
                            id='radio_1'
                            name="payments"
                            component="input"
                            type="radio"
                            value="Nhận tại nhà thuốc"
                        />
                        Nhận tại nhà thuốc
                    </label>
                    <label htmlFor="radio_2" className="radio_hinh_thuc_nhan_hang">
                        <Field
                            className="mr-10"
                            id='radio_2'
                            name="payments"
                            component="input"
                            type="radio"
                            value="Giao hàng tận nơi"
                        />
                        Giao hàng tận nơi
                    </label>
                </div>
            </div>
        </div>
    )
}

export default FormInfoClient;

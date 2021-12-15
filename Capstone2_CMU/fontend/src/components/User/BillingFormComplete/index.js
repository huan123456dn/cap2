import React from 'react';
import { formatCash } from './../../../commons/VND';
import Button from '@mui/material/Button';

function FormComplete(props) {
    const { totalCart, 
        invalid, submitting , 
        // completeProduct, 
        // completeTime 
    } = props;

    const totalCartProduct = (totalCart) => {
        let html = 0;
        if (totalCart.length >= 1) {
            for (var i = 0; i < totalCart.length; i++) {
                html += totalCart[i].price * totalCart[i].quantityBuy;
            }
            return html;
        }
        return html;
    }

    // // clock
    // function formatHour(){
    //     const date = new Date();
    //     const hours = `0${date.getHours()}`.slice(-2);
    //     const minutes = `0${date.getMinutes()}`.slice(-2);
    //     const seconds = `0${date.getSeconds()}`.slice(-2);
    //     return `${hours}:${minutes}:${seconds}`;
    // }

    // function formatDate(){
    //     const date = new Date();
    //     return ` ${date.getDay()}/${date.getMonth() +1}/${date.getFullYear()}`
    // }

    // // hoàn thành đặt hàng
    // const onComplete = () => {
    //     completeTime(formatHour() ,  formatDate() );
    //     // localStorage.setItem('hour' ,JSON.stringify( formatHour()) );
    //     // localStorage.setItem('date' ,JSON.stringify( formatDate()) );
    //     completeProduct();
    // }

    return (
        <div className="l-4 col form_hd--right">
            <div className="inner_form--right">
                <div className="header_info--hoadon p-12">
                    <div className="info_hoadon--cart">
                        <i className="fas fa-shopping-cart shopping-cart"></i>
                    </div>
                    <span className="info_hoadon--title">
                        THÔNG TIN ĐƠN HÀNG
                    </span>
                </div>
                <div className="cart--total p-12">
                    <div className=" cart--total--alike">
                        <span className="total_money--left left_1">Tổng tiền</span>
                        <span className="total_money--right right_1">
                            {
                                formatCash(String(totalCartProduct(totalCart)))
                            }
                            <p>đ</p>
                        </span>
                    </div>
                    <div className=" cart--total--alike">
                        <span className="phigiaohangdukien--left left_1">
                            Phí giao hàng dự kiến
                        </span>
                        <span className="phigiaohangdukien--right right_1">
                            0
                            <p>đ</p>
                        </span>
                    </div>
                    <div className=" cart--total--alike ">
                        <span className="canthanhtoan--left left_1">Cần thanh toán</span>
                        <span className="canthanhtoan--right  right_1">
                            {
                                formatCash(String(totalCartProduct(totalCart)))
                            }
                            <p>đ</p>
                        </span>
                    </div>
                </div>
                {/* to='/user/billcomplete' */}
                <div className="link_complete" >
                    <div className="btn__hd--buy p-12">
                        <Button
                            variant="contained" 
                            disabled={invalid || submitting}
                            type='submit'
                            // onClick={onComplete}
                        >
                            HOÀN TẤT ĐẶT HÀNG
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormComplete;

import React, { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import { renderTextField } from './../../../components/formHelper';
import { Button } from '@mui/material';
import { formatCash } from './../../../commons/VND';
import { createDate } from './../../../commons/CreateDate';
import { toastError1 } from './../../../helpers'

const loadHttp = '/staff/sell'
function SellNVFormInfo(props) {

    const { handleSubmit, history, submitSell, dataTotal } = props;
    
    const [onchange, setOnchange] = useState('');
    const [total , setTotal] = useState('');
    const [totalNumber , setTotalNumber] = useState('');
    
    const handleSubmitForm = async (data) => {
        let list_product = JSON.parse( localStorage.getItem('sellProduct'))
        if(list_product){
            await submitSell({
                ...data,
                dateBuy : createDate,
                listProduct :list_product
            });
            localStorage.removeItem('sellProduct')
            setTimeout(
                history.go(loadHttp)
            )
        }else{
            toastError1("Chưa có sản phẩm nào !!!")
        }
    }

    useEffect(() => {
        let result = 0;
        if (dataTotal.length) {
            dataTotal.map(value => result += Number(value.quantityBuy) * Number(value.price))
        }
        setTotal(formatCash(String(result)));
        setTotalNumber(result);
    }, [dataTotal])

    const tiendu = () =>{
        if(Number(onchange) !== 0 && totalNumber !== 0 ){
            return formatCash(String(Number(onchange) - totalNumber))
        }
        return 0;
    }

    return (
        <div className="content__right l-4">
            <div className="content__right--table">
            <span>Bán theo đơn</span>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="info__name info__client">
                    <span>Khách hàng :</span>
                    <div className="Sell_input">
                        <Field
                            name="fullName"
                            component={renderTextField}
                            placeholder="Tên khách hàng"
                        />
                    </div>
                </div>
                <div className="info__client">
                    <span>Số điện thoại :</span>
                    <Field
                        name="phoneNumber"
                        component={renderTextField}
                        placeholder="Số điện thoại"
                    />
                </div>
                <div className="info__address info__client">
                    <span>Địa chỉ :</span>
                    <Field
                        name="address"
                        component={renderTextField}
                        placeholder="Địa chỉ"
                    />
                </div>
                <div className="info__client">
                    <span>Tổng Tiền</span>
                    <span>{total} đ</span>
                </div>
                <div className="info__client">
                    <span>Khách đưa :</span>
                    <Field
                        name="clientTaskBuy"
                        component={renderTextField}
                        placeholder="Khách đưa"
                        onChange={(e) => {
                            const val = e.target.value
                            setOnchange(val)
                        }}
                    />
                </div>
                <div className="info__tiendu info__client">
                    <span>Tiền dư :</span>
                    <span>{
                        tiendu() 
                    } đ</span>
                </div>
                {/* <div className="nfo__date info__client">
                    <span>Ngày bán</span>
                    <Field
                        name="dateBuy"
                        component={renderTextField}
                        type="date"
                    />
                </div> */}
                <div className="info__submit">
                    <Button type="submit" variant="contained" className="save">
                        <i className="fas fa-save mr-10"></i>
                        Lưu
                    </Button>
                    <Button variant="contained" color="success" type="submit" >
                        <i className="fas fa-print mr-10"></i>
                        Lưu và in
                    </Button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default SellNVFormInfo;

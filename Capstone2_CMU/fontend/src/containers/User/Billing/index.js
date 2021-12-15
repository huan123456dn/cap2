import React, { useEffect } from 'react';
import FormComplete from './../../../components/User/BillingFormComplete';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as cartActions from './../../../actions/User/cart';
import * as hideCartActions from './../../../actions/User/hidecart';
import * as completeProductActions from './../../../actions/User/billProduct';
import { reduxForm } from 'redux-form';
import validate from './../../../commons/Validate/validateUserInfo';
import BillingProduct from '../../../components/User/BillingProduct';
import BillingInfoClient from '../../../components/User/BillingInfoClient';
import * as postSellApi from './../../../apis/QuanLi/billListOnline';
import * as addBillApi from './../../../apis/User/bill';
import { toastSuccess, toastError1 } from './../../../helpers'
import { createDate , createHours} from './../../../commons/CreateDate';

let id_user = "213123123";

function Billing(props) {
    
    const { cartStore, history, hideCartActionsCreator, handleSubmit, invalid, submitting } = props;
    
    const { hideCartProductCart } = hideCartActionsCreator;


    useEffect(() => {
        const stopTimeout = setTimeout(() => {
            hideCartProductCart(true)
        }, 0)
        return () => {
            hideCartProductCart(false)
            clearTimeout(stopTimeout);
        }
    }, [])

    // delete product cart 
    const handleDeteteProductCart = (id) => {
        const { deleteCartActionsCreator } = props;
        const { DeleteProductCartRequest } = deleteCartActionsCreator;
        DeleteProductCartRequest(id);
    }

    // uodate product cart 
    const handleUpdateProductCart = (product, quantity) => {
        const { updateCartActionsCreator } = props;
        const { updateProductCartRequest } = updateCartActionsCreator;
        updateProductCartRequest(product, quantity);
    }

    // return 
    const goback = () => {
        history.goBack();
    }

    // hoàn thành đặt hàng
    const completeProduct = () => {
        const { completeProductActionsCreator } = props;
        const { completeBillProductRequest } = completeProductActionsCreator;
        completeBillProductRequest()
    }

    // const completeTime = (hour, date) => {
    //     const { completeTimeActionsCreator } = props;
    //     const { timeBill } = completeTimeActionsCreator;
    //     timeBill(hour, date)
    // }

    // console.log(hours.getHours() + ':' +hours.getMinutes() +':'+hours.getSeconds());

    // submit 
    const handleSubmitForm = async (data) => {
        let listProduct = await JSON.parse(localStorage.getItem('product'));
        let productBuy = []
        if (listProduct !== null) {
            await postSellApi.postBill(
                {
                    ...data,
                    id_user : id_user,
                    dateBuy: createDate,
                    listProduct
                }
            );
            for (var i = 0; i < listProduct.length; i++) {
                productBuy.push(
                    {
                        ...listProduct[i],
                        dateBuy : `${createDate.trim().split('-').reverse().join('/')} ${createHours}`
                    }
                )
            }
            await addBillApi.postBillProductCart(
                {
                    id_user : id_user,
                    listProduct : productBuy
                }
            )
            localStorage.removeItem('product');
            toastSuccess('Hoàn Tất Đặt Hàng');
            setTimeout(
                history.push('/user/billcomplete'),
                4000
            );
            const { completeDeleteCartActionsCreator } = props;
            const { completeDeleteCart } = completeDeleteCartActionsCreator;
            completeDeleteCart()
        } else {
            toastError1('Chưa Có Sản Phẩm !!!')
        }
    }

    return (
        <div className="hd_content grid p-y-10 p-x-45">
            <div className="content_mh--header ">
                <div className="content_mh--item1 l-12 p-y-12">
                    <div onClick={goback} className="content_mh--link"> Tiếp tục mua hàng </div>
                </div>
            </div>
            <div className="content_hoadon ">
                <form onSubmit={handleSubmit(handleSubmitForm)} className="row form_hd" >
                    <div className="l-8 col form_hd--left">
                        <div className="inner_form">
                            <BillingProduct
                                cart={cartStore}
                                handleDeteteProductCart={handleDeteteProductCart}
                                handleUpdateProductCart={handleUpdateProductCart}
                            />
                            <BillingInfoClient />
                        </div>
                    </div>
                    <FormComplete
                        completeProduct={completeProduct}
                        // completeTime={completeTime}
                        totalCart={cartStore}
                        invalid={invalid}
                        submitting={submitting}
                    />
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartStore: state.cartReducer,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteCartActionsCreator: bindActionCreators(cartActions, dispatch),
    updateCartActionsCreator: bindActionCreators(cartActions, dispatch),
    completeDeleteCartActionsCreator: bindActionCreators(cartActions, dispatch),
    hideCartActionsCreator: bindActionCreators(hideCartActions, dispatch),
    completeProductActionsCreator: bindActionCreators(completeProductActions, dispatch),
    // completeTimeActionsCreator: bindActionCreators(completeProductActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = 'TASK_INFO_USER';

const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate
})

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    withReduxForm,
)(Billing);
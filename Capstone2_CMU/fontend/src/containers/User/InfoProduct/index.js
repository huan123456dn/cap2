import React, { useEffect, useState } from 'react';
import CartItem from '../../../components/User/InfoProductItem';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import * as cartActions from './../../../actions/User/cart';

function InfoProductItem(props) {

    const { history } = props;

    const [productCart, setProductCart] = useState('')

    useEffect(() => {
        let productCart = JSON.parse(localStorage.getItem('productCart'));
        const newProduct = {
            ...productCart,
            quantitybuy: 1
        }
        setProductCart(newProduct)
    }, [])

    // them san pham vao gio hang
    const onAddToCart = (productCart) => {
        const { addToCartActionCreator } = props;
        const { AddProductCartRequest } = addToCartActionCreator;
        AddProductCartRequest(productCart, productCart.quantitybuy);
    }

    // //uodate product cart 
    const handleUpdateProductCart = (quantitybuy) => {
        setProductCart({
            ...productCart,
            quantitybuy
        });
    }

    // return 
    const goback = () => {
        history.goBack();
    }

    return (
        <div className="content_muahang">
            <div className="content_mh--header p-x-45">
                <div className="content_mh--item1 l-12 p-y-12">
                    <div onClick={goback} className="content_mh--linkcard" >Tiếp tục mua hàng</div>
                </div>
            </div>

            <CartItem
                // key={index}
                productCart={productCart}
                onAddToCart={onAddToCart}
                handleUpdateProductCart={handleUpdateProductCart}
            />
        </div>
    )
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
    addToCartActionCreator: bindActionCreators(cartActions, dispatch),

});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    // withReduxForm,
)(InfoProductItem);

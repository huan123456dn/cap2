import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { compose, bindActionCreators } from 'redux';
import no_cart from './../../../assets/img/no_cartitem.jpg';
import CartItem from '../../../components/User/DashboardCart';
import * as cartActions from './../../../actions/User/cart';
import {formatCash} from './../../../commons/VND'

function DashboardCart(props) {

    const { cart, hideCartStore } = props;
    useEffect(() => {
        const { cartActionsCreator } = props;
        const { fetchLisctCartRequest } = cartActionsCreator;
        fetchLisctCartRequest()
    }, [])

    const card_item = () => {
        let html = '';
        html = (
            cart.map((productItem, index) => {
                return (
                    <CartItem
                        key={index}
                        productItem={productItem}
                        handleProductCart={handleProductCart}
                    />
                )
            })
        )
        return html;
    }


    // delete product cart 
    const handleProductCart = (id) => {
        const { deleteCartActionsCreator } = props;
        const { DeleteProductCartRequest } = deleteCartActionsCreator;
        DeleteProductCartRequest(id);
    }

    const renderTotalCart = () => {
        let html = '';
        var total = 0;
        if (cart.length >= 2) {
            for (var i = 0; i < cart.length; i++) {
                total += cart[i].price * cart[i].quantityBuy;
            }
            return (
                <div className='total_cart'>
                    <span >Tạm Tính :</span>
                    <span >{formatCash(String(total))} đ</span>
                </div>
            )
        }
        return html;
    }

    // hide cart
    const hidaCart = () => {
        let html = '';
        if (hideCartStore === false) {
            return (
                renderCart()
            )
        }
        return html;
    }

    const renderCart = () => {
        let html = (
            <div className="cart_notify ">
                <div className='cart_img' >
                    <div className='no-cart'>
                        <img src={no_cart} alt="no_cart" />
                    </div>
                    <span>Chưa có sản phẩm</span>
                </div>
            </div>
        )
        var text = cart === null ? 0 : cart.length;
        if (text > 0) {
            return (
                <div className="cart_notify ">
                    <ul className="cart_notify--list grid">
                        {
                            card_item()
                        }
                    </ul>
                    {
                        renderTotalCart()
                    }
                    <div className="cart_notify--confirm txt_center mt-8">
                        <NavLink to="/user/buyproduct" className="cart_confirm--button p-x-6">HOÀN TẤT ĐẶT HÀNG</NavLink>
                    </div>
                </div>
            )
        }
        return html;
    }

    // tính tổng số sản phẩm trong giỏ hàng
    const total_quantity = () => {
        let result = null;
        var text = cart === undefined ? 0 : cart.length;
        if (text > 0) {
            return (
                <div className="cart_buy--title">
                    <p>
                        {cart.length}
                    </p>
                </div>
            )
        }
        return result;
    }

    return (
        <li className="header_navbar--item buy_cart">
            <NavLink to='/user/buyproduct' className="link_cart" >
                <div className="header_info header_info--cart ">
                    <i className="fas fa-shopping-cart ">
                        {
                            total_quantity()
                        }
                    </i>
                </div>
            </NavLink>
            {
                hidaCart()
            }
        </li >
    );
}

const mapStateToProps = state => {
    return {
        cart: state.cartReducer,
        hideCartStore: state.hideCartReducer,
    };
};

const mapDispatchToProps = dispatch => ({
    cartActionsCreator: bindActionCreators(cartActions, dispatch),
    deleteCartActionsCreator: bindActionCreators(cartActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
    // withStyles(styles),
    withConnect
)(DashboardCart);
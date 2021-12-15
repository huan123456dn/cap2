import React from 'react';
import { formatCash } from './../../../commons/VND';
import Button from '@mui/material/Button';

function CartProductItem(props) {

    const { productCart, onAddToCart, handleUpdateProductCart } = props;

    // add to cart
    const addToCart = (productCart) => {
        onAddToCart(productCart);
    }

    // update quantity
    const onUpdateQuantity = (quantitybuy) => {
        if (quantitybuy > 0) {
            handleUpdateProductCart(quantitybuy);
        }
    }

    // console.log('a' , productCart.quantitybuy);

    return (
        <div className="muahang grid  p-x-45  pt-30 pb-80">
            <div className="content--CardProduct row">
                <div className="content_price l-6">
                    <div className="price_main">
                        <button className="btn_left btn_img"><i className="fas fa-chevron-left"></i></button>
                        <img src={productCart.img} alt="" />
                        <button className="btn_right btn_img"><i className="fas fa-chevron-right"></i></button>
                    </div>
                    <div className="price_child pt-12 p-x-45">
                        <img src={productCart.img} alt="" />
                        <img src={productCart.img} alt="" />
                        <img src={productCart.img} alt="" />
                        <img src={productCart.img} alt="" />
                    </div>
                </div>
                <div className="content_text l-6">
                    <div className="content_header">
                        <span>{productCart.homeSX}</span>
                        <h1>{productCart.productName}</h1>
                    </div>
                    <div className="content_price_text">
                        <span className="price">{formatCash( String( productCart.price) )}đ</span>
                        <span className="typle pl-8">/{productCart.dvt}</span>
                    </div>
                    <div className="content_inner">
                        <span><b>Quy cách :</b>{productCart.pack}</span>
                        <span><b>Công dụng :</b>{productCart.uses}</span>
                        <span><b>Thành phần :</b> {productCart.element}</span>
                        <span><b>Hỗ trợ điều trị :</b> {productCart.support}</span>
                        <span><b>Nước sản xuất :</b>{productCart.countrySX}</span>
                        <span><b>Nhà sản xuất :</b>{productCart.homeSX}</span>
                    </div>
                    <div className="content_quantity">
                        <span>
                            Chọn số lượng
                        </span>
                        <div className="form_price--btn">
                            <button
                                className={productCart.quantitybuy > 1 ? "btn_reduce" : "btn_reduce active"}
                                onClick={() => { onUpdateQuantity(productCart.quantitybuy - 1) }}
                            >-</button>
                            <div className="form_price--title">{productCart.quantitybuy}</div>
                            <button
                                className="btn_up"
                                onClick={() => { onUpdateQuantity(productCart.quantitybuy + 1) }}
                            >+</button>
                        </div>
                    </div>
                    <div className="content_buy">
                    <Button  className="buy_btn"  onClick={() => addToCart(productCart)}  variant="contained">Chọn mua</Button>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default CartProductItem;

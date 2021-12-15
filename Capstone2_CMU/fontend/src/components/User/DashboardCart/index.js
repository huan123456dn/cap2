import React from "react";
import { NavLink } from "react-router-dom";
import { formatCash } from './../../../commons/VND';

function Card(props) {

    const { productItem, handleProductCart } = props;

    const handleDelete = (id) => {
        handleProductCart(id)
    }

    return (
        <li className="cart_notify--item p-y-12" >
            <div className="cart_notify--link" >
                <NavLink to='/user/buyproduct' className='link'>
                    <img className="cart_notify--img " src={productItem.img} alt="" />
                </NavLink >
                <div className="cart_notify--info">
                    <NavLink to='/user/buyproduct' className='link'>
                        <span>{productItem.productName}</span>
                    </NavLink>
                    <div className="cart_notify--total mt-8">
                        <NavLink to='/user/buyproduct' className='link'>
                            <input className="cart_notify--input txt_center" type="text" disabled=' disabled' value={productItem.quantityBuy} />
                        </NavLink>
                        <div className="cart_notify--buy">
                            <strong className="txt--buy">{formatCash( String( productItem.price) )} đ</strong>
                            <span className="txt--gray p-x-8">|</span>
                            <button onClick={() => handleDelete(productItem._id)} className="txt--button">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default Card;

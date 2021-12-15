import { Button } from "@mui/material";
import React from "react";
import { NavLink } from 'react-router-dom';
import { formatCash } from './../../../commons/VND'

function ThucPhamChucNang(props) {
    const { product, keyitem, onAddToCart } = props;

    const showRatings = (rating) => {
        const result = [];
        for (var i = 1; i <= rating; i++) {
            result.push(<i key={i} className="fas fa-star rating  mr-4"></i>);
        }
        for (var j = 1; j <= (5 - rating); j++) {
            result.push(<i key={j + 5} className="far fa-star rating  mr-4"></i>);
        }
        return result;
    }

    //  CHUYỀN sản phẩm sang trang sản phẩm chi tiết 
    const productItem = (product) => {
        localStorage.removeItem('productCart');
        localStorage.setItem('productCart', JSON.stringify(product));
    }

    const addToCart = (product) => {
        onAddToCart(product);
    }

    return (
        <div className="col l-3">
            <button key={keyitem} onClick={() => productItem(product)} className="home_product--item p-x-12 mb-50 p-y-12" >
                <NavLink to={`/user/infoproduct/${product._id}`} className="product_link" >
                    <img className="home_product--item-img txt_center mb-8" src={product.img}
                        alt="" />
                    <span className="home_product--item-title  mb-8">
                        {product.productName}
                    </span>
                </NavLink>
                <div className='row_Cart_star'>
                    <NavLink to={`/user/infoproduct/${product._id}`} className="product_link" >
                        <div className="home_product--item-star mb-8">
                            {
                                showRatings(product.rating)
                            }
                        </div>
                    </NavLink>
                    <Button
                        className="cart__btn"
                        variant="contained"
                        onClick={() => addToCart(product)}
                    >
                        <i
                            className="fas fa-shopping-cart"
                        ></i>
                    </Button>
                </div>
                <NavLink to={`/user/infoproduct/${product._id}`} className="product_link" >
                    <div className="home_product--price-list mb-8">
                        <span className="home_product--price-item home_product--txt-price mr-4">{formatCash(String(product.price))} đ</span>
                        <span className="home_product--price-item home_product--txt-typle mr-4">/ {product.dvt}</span>
                    </div>
                </NavLink>
            </button>
        </div>
    );
}

export default ThucPhamChucNang;

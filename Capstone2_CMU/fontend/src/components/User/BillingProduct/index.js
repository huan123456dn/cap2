import React from 'react';
import { NavLink } from 'react-router-dom';
import { formatCash } from './../../../commons/VND'

function BillingProduct(props) {

    const { cart, handleDeteteProductCart, handleUpdateProductCart , handleProduct } = props;

    //  CHUYỀN sản phẩm sang trang sản phẩm chi tiết 
    const productItem = (product) => {
        localStorage.removeItem('productCart');
        localStorage.setItem('productCart', JSON.stringify(product));
    }

    //delete
    const handleDelete = (product) => {
        handleDeteteProductCart(product._id);
    }

    // update quantity
    const onUpdateQuantity = (product, quantity) => {
        // console.log(typeof quantity);
        if (quantity > 0) {
            // console.log(quantity);
            handleUpdateProductCart(product, quantity);
        } else {
            quantity = 1;
        }
    }

    const renderProduct = () => {
        let html = null;
        if( cart.length > 0 ){
            html = cart.map((product, index) => {
                // handleProduct(product)
                return (
                    <div className='info_cart' key={index} onClick={() => productItem(product)} >
                        <div className="form_product p-x-12 p-y-12"  >
                            <NavLink className='link__info-cart l-9' to={`/user/infoproduct/${product._id}`}>
                                <div className="form_product--img">
                                    <img src={product.img} alt="" />
                                </div>
                                <div className="form_title l-11 col">
                                    <span>{product.productName}</span>
                                    <div className="form_title--typle">
                                        <span className="don_vi">Đơn vị bán</span>
                                        <span className="typle">{product.dvt}</span>
                                    </div>
                                </div>
                            </NavLink>
                            <div className="form_price col">
                                <div className="form_price--btn">
                                    <div
                                        className={product.quantityBuy > 1 ? "btn_reduce" : "btn_reduce active"}
                                        onClick={() => { onUpdateQuantity(product, product.quantityBuy - 1) }}
                                    >-</div>
                                    <div className="form_price--title">{product.quantityBuy}</div>
                                    <div
                                        className="btn_up btn_reduce"
                                        onClick={() => { onUpdateQuantity(product, product.quantityBuy + 1) }}
                                    >+</div>
                                </div>
                                <div className="form_price--value">
                                    <span>
                                        {formatCash( String( product.price) )} <p> đ</p>
                                    </span>
                                </div>
                                <div className="btn_xoa">
                                    <button
                                        onClick={() => handleDelete(product)}
                                    >Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        return html;
    }

    return (
        <div>
            <span className="form_head p-x-12 p-y-12">
                CÓ {cart.length} SẢN PHẨM TRONG GIỎ HÀNG
            </span>
            {
                renderProduct()
            }
        </div>
    )
}

export default BillingProduct;

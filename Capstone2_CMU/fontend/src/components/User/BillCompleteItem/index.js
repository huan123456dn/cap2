import React from 'react';
import { NavLink } from 'react-router-dom';
import { formatCash } from './../../../commons/VND';

function BillingProduct(props) {

    const { product, handleDelete } = props;

    //  CHUYỀN sản phẩm sang trang sản phẩm chi tiết 
    const productItem = (product) => {
        localStorage.removeItem('productCart');
        localStorage.setItem('productCart', JSON.stringify(product));
    }

    const onDelete = (id) => {
        handleDelete(id);
    }

    return (
        <div  >
            <div className='info_cart' onClick={() => productItem(product)} >
                <div className="form_product p-x-12 p-y-12"  >
                    <NavLink className='link__info-cart l-9' to={`/user/infoproduct/${product._id}`}>
                        <div className="form_product--img">
                            <img src={product.img} alt="" />
                        </div>
                        <div className="form_title l-11 col">
                            <span className="form_title--price" >{product.productName}</span>
                            <div className="form_title--typle form_title--HD">
                                <span className="don_vi">Giá :</span>
                                <span style={{marginBottom : '0px'}}>{formatCash(String(product.price))} đ</span>
                            </div>
                            <div className="form_title--quantity" > X {product.quantityBuy}</div>
                            <div className="form_title--quantity" > Ngày mua :  {product.dateBuy}</div>
                            {/* <div className="form_title--typle form_title--HD">
                                <span className="don_vi">Ngày bán :</span>
                                <span>{product.dvt}</span>
                            </div> */}
                        </div>
                    </NavLink>
                    <div className="form_price col">
                        {/* <div className="wait__complete ticked">
                            <i className="far fa-check-circle"></i>
                            <p>Chờ xác nhận</p>
                        </div> */}
                        <div className="form_price--value">
                            <span>
                                {formatCash(String (product.price * product.quantityBuy))} <p> đ</p>
                            </span>
                        </div>
                        <div className="xoa__HD">
                            <button
                                onClick={() => onDelete(product._id)}
                            >Hủy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillingProduct;

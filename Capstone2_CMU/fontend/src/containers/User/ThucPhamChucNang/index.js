import React, { useEffect, useState } from "react";
import Navbar from '../../../components/User/ListProductNav';
import ProductItem from '../../../components/User/ThucPhamChucNang';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as productActions from './../../../actions/User/product';
import * as cartActions from './../../../actions/User/cart';
import * as STATUS from './../../../contants';
import { removeVietnameseTones } from './../../../commons/vietnam';
import { reduxForm } from "redux-form";
import validate from './../../../commons/Validate/validateUserInfo';

function ThucPhamChucNang(props) {

    const { listProduct, searchProduct, handleSubmit , reset } = props;

    const [productHome, setHome] = useState(null);
    const [productContruy, setCountry] = useState(null);
    const [btnPriceFrom, setBtnPriceFrom] = useState(null);
    const [btnPriceTo, setBtnPriceTo] = useState(null);
    const [toPrice, setToPrice] = useState(null);
    const [fromPrice, setFromPrice] = useState(null);

    useEffect(() => {
        const { productActionCreator } = props;
        const { fetchListProductRequest } = productActionCreator;
        fetchListProductRequest();
    }, [])

    // them san pham vao gio hang
    const onAddToCart = (product, quantity = 1) => {
        const { addToCartActionCreator } = props;
        const { AddProductCartRequest } = addToCartActionCreator;
        AddProductCartRequest(product, quantity);
    }

    const renderProducts = () => {
        let html = null;
        let taskNavbarProduct = null;
        const taskFiltered = listProduct.filter(task => task.status === STATUS.task_TPCN);

        // hãng sản xuất , nước sản xuất
        if( productHome === 'Tất cả' && productContruy === 'Tất cả' && !btnPriceFrom && !toPrice && taskFiltered){
            taskNavbarProduct = taskFiltered
        }else if ( productHome !== 'Tất cả' && productContruy === 'Tất cả' && !btnPriceFrom  && !toPrice && taskFiltered) {
            taskNavbarProduct = taskFiltered.filter(task =>  task.producer=== productHome );
        }else if ( productHome === 'Tất cả' && productContruy !== 'Tất cả' && !btnPriceFrom  && !toPrice  && taskFiltered) {
            taskNavbarProduct = taskFiltered.filter(task => task.countrySX === productContruy);
        }
        else if ( productHome !== 'Tất cả' && productContruy !== 'Tất cả' && !btnPriceFrom  && !toPrice && taskFiltered) {
            taskNavbarProduct = taskFiltered.filter(task => task.producer=== productHome && task.countrySX === productContruy  );
        }

         // hãng sản xuất , nước sản xuất , button giá
        if( productHome === 'Tất cả' && productContruy === 'Tất cả' && btnPriceFrom  && !toPrice && taskFiltered){
            taskNavbarProduct = taskFiltered.filter(task =>  task.price >= btnPriceFrom &&  task.price <= btnPriceTo );
        }else if ( productHome !== 'Tất cả' && productContruy === 'Tất cả' && btnPriceFrom  && !toPrice && taskFiltered) {
            taskNavbarProduct = taskFiltered.filter(task =>  task.producer=== productHome &&  task.price >= btnPriceFrom &&  task.price <= btnPriceTo  );
        }else if ( productHome === 'Tất cả' && productContruy !== 'Tất cả' && btnPriceFrom  && !toPrice  && taskFiltered) {
            taskNavbarProduct = taskFiltered.filter(task => task.countrySX === productContruy &&  task.price >= btnPriceFrom &&  task.price <= btnPriceTo );
        }else if ( productHome !== 'Tất cả' && productContruy !== 'Tất cả' && btnPriceFrom  && !toPrice && taskFiltered) {
            taskNavbarProduct = taskFiltered.filter(task => task.producer=== productHome && task.countrySX === productContruy &&  task.price >= btnPriceFrom &&  task.price <= btnPriceTo );
        }

        // ap dụng
        if( productHome === 'Tất cả' && productContruy === 'Tất cả' && !btnPriceFrom && toPrice && taskFiltered){
            taskNavbarProduct = taskFiltered.filter(task => task.price >= fromPrice &&  task.price <= toPrice );
        }else if ( productHome !== 'Tất cả' && productContruy === 'Tất cả' && !btnPriceFrom  && toPrice && taskFiltered) {
            taskNavbarProduct = taskFiltered.filter(task =>  task.producer=== productHome &&  task.price >= fromPrice &&  task.price <= toPrice );
        }else if ( productHome === 'Tất cả' && productContruy !== 'Tất cả' && !btnPriceFrom  && toPrice  && taskFiltered) {
            taskNavbarProduct = taskFiltered.filter(task => task.countrySX === productContruy &&  task.price >= fromPrice &&  task.price <= toPrice);
        }else if ( productHome !== 'Tất cả' && productContruy !== 'Tất cả' && !btnPriceFrom  && toPrice && taskFiltered) {
            taskNavbarProduct = taskFiltered.filter(task => task.producer=== productHome && task.countrySX === productContruy &&  task.price >= fromPrice &&  task.price <= toPrice  );
        }

        if (taskNavbarProduct) {
            html = (
                <div className="home_product row">
                    {
                        taskNavbarProduct.map((product, index) => {
                            let a = removeVietnameseTones(product.productName.toLowerCase())
                            let b = removeVietnameseTones(searchProduct.toLowerCase())
                            if (searchProduct !== '') {
                                if (a.indexOf(b) !== -1) {
                                    return (
                                        <ProductItem
                                            key={index}
                                            keyitem={index}
                                            product={product}
                                            onAddToCart={onAddToCart}
                                        />
                                    )
                                }
                            } else {
                                return (
                                    <ProductItem
                                        key={index}
                                        keyitem={index}
                                        product={product}
                                        onAddToCart={onAddToCart}
                                    />
                                )
                            }
                        })
                    }
                </div>
            );
        } else {
            html = (
                <div className="home_product row">
                    {
                        taskFiltered.map((product, index) => {
                            let a = removeVietnameseTones(product.productName.toLowerCase())
                            let b = removeVietnameseTones(searchProduct.toLowerCase())
                            if (searchProduct !== '') {
                                if (a.indexOf(b) !== -1) {
                                    return (
                                        <ProductItem
                                            key={index}
                                            keyitem={index}
                                            product={product}
                                            onAddToCart={onAddToCart}
                                        />
                                    )
                                }
                            } else {
                                return (
                                    <ProductItem
                                        key={index}
                                        keyitem={index}
                                        product={product}
                                        onAddToCart={onAddToCart}
                                    />
                                )
                            }
                        })
                    }
                </div>
            );
        }
        return html;
    }

    let handleSearch = (data) => {
        setHome(data.productHome)
        setCountry(data.productContruy)
        setBtnPriceFrom(data.btnPriceFrom)
        setBtnPriceTo(data.btnPriceTo)
        setToPrice(data.toPrice)
        setFromPrice(data.fromPrice)
    }

    return (
        <div className="product_page grid p-x-45">
            <div className="product_header l-12">
                <div className="content_benh--item1 l-12 p-y-12">
                    <a className="content_benh--link block" href="/user">
                        Trang Chủ
                    </a>
                    <span className="block">Dược mỹ phẩm</span>
                </div>
            </div>
            <div className="product_content grid">
                <Navbar
                     reset={reset}
                    handleSearch={handleSearch}
                    handleSubmit={handleSubmit}
                />
                <div className="width_100">
                    <span className="header_porduct--user">Dược Mỹ Phẩm</span>
                    {
                        renderProducts()
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        listProduct: state.product.listProduct,
        searchProduct: state.searchReducer,
    };
};

const mapDispatchToProps = dispatch => ({
    productActionCreator: bindActionCreators(productActions, dispatch),
    addToCartActionCreator: bindActionCreators(cartActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = 'TASK_LIST_PRODUCT';

const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate
})

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    withReduxForm,
)(ThucPhamChucNang);


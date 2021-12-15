import React, { useEffect, useState } from 'react';
import Product from './../../../components/User/HomeProductList';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as productActions from './../../../actions/User/product';
import * as cartActions from './../../../actions/User/cart';
import * as listProductApi from './../../../apis/User/product';

import { removeVietnameseTones } from './../../../commons/vietnam';
import ReactPaginate from 'react-paginate';
import {loading} from './../../../commons/Loading'
import ClipLoader from "react-spinners/ClipLoader";

let limit = 20;

function Trangchu(props) {

    const { listProduct, match, searchProduct } = props;

    const [pageCount, setpageCount] = useState(0);
    // const [players, setPlayers] = useState([]);
    const [pagination, setPagination] = useState('');
    let [loadinga, setLoading] = useState('');

    //  // show data
    useEffect( () => {
        let page = 1;
        listProductApi.getShowProduct().then(res => {
            const { data } = res;
            if(data){
                setpageCount(Math.ceil(data.length / limit));
                setPagination(data.length)
            }
        })
        setLoading(true)
        const { productActionCreator } = props;
        const { fetchListProductRequest } = productActionCreator;
        fetchListProductRequest(page)
    }, []);

    // them san pham vao gio hang
    const onAddToCart = (product, quantity = 1) => {
        const { addToCartActionCreator } = props;
        const { AddProductCartRequest } = addToCartActionCreator;
        AddProductCartRequest(product, quantity);
    }

    // panination 
    const handlePageClick = (data) => {
        const { productActionCreator } = props;
        const { fetchListProductRequest } = productActionCreator;
        fetchListProductRequest(data.selected + 1)
    };

    const renderProducts = () => {
        let html = null;
        html = (
            <div className="home_product row">
                {
                    listProduct.map((product, index) => {
                        let a = removeVietnameseTones(product.productName.toLowerCase())
                        let b = removeVietnameseTones(searchProduct.toLowerCase())
                        if (searchProduct !== '') {
                            if (a.indexOf(b) !== -1) {
                                return (
                                    <Product
                                        key={index}
                                        keyitem={index}
                                        product={product}
                                        match={match}
                                        onAddToCart={onAddToCart}
                                    />
                                )
                            }
                        } else {
                            return (
                                <Product
                                    key={index}
                                    keyitem={index}
                                    product={product}
                                    match={match}
                                    onAddToCart={onAddToCart}
                                />
                            )
                        }
                    })
                }
            </div>
        );
        return html;
    }

    return (
        <div style={{ width: '100%' }}>
            {/* {
                loading(loadinga)
            } */}
            <div className="content-home pb-40">
                <div className="home_product--DM grid p-x-45 p-y-16">
                    <strong className="home_product--title txt_center l-12 p-y-10">Danh Mục Nổi Bật</strong>
                    <div style={{zIndex : "1000"}} >
                        <ClipLoader color={"#ffffff"} loading={false} size={150} />
                    </div>
                    {
                        renderProducts()
                    }
                </div>
            </div>
            {
                pagination > 20 ?
                    (<ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"home__pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                    )
                    : ''
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        listProduct: state.product.listProduct,
        searchProduct: state.searchReducer
    };
};

const mapDispatchToProps = dispatch => ({
    productActionCreator: bindActionCreators(productActions, dispatch),
    addToCartActionCreator: bindActionCreators(cartActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    // withReduxForm,
)(Trangchu);

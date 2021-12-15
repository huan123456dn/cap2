import React, { useEffect , useState } from 'react';
import BillCompleteItem from './../../../components/User/BillCompleteItem'
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as cartActions from './../../../actions/User/billProduct';
import no_cart from './../../../assets/img/no_cartitem.jpg';
import ReactPaginate from 'react-paginate';
import * as listBillApi  from './../../../apis/User/bill'

const limit = 10;

let id_user = "213123123";

function BillComplete(props) {

    const { listProduct } = props;
    const [pagination, setPagination] = useState('');
    const [pageCount, setpageCount] = useState(0);

    useEffect(() => {
        let page = 1;
        listBillApi.getBillProduct(id_user).then(res => {
            const { data } = res;
            if(data.listProduc){
                setpageCount(Math.ceil(data.listProduct.length / limit))
                setPagination(data.listProduct.length)
            }
        })
        const { fetchProductActionsCreator } = props;
        const { fetchBillProductRequest } = fetchProductActionsCreator;
        fetchBillProductRequest(page);
    }, [])

    // panination 
    const handlePageClick = data => {
        const { fetchProductActionsCreator } = props;
        const { fetchBillProductRequest } = fetchProductActionsCreator;
        fetchBillProductRequest(data.selected + 1);
    };

    const renderProduct = () => {
        let html = null;
        if (listProduct !== null && listProduct.length > 0) {
            html = (
                <div>
                    {
                        listProduct.map((product, index) => {
                            return (
                                <div>
                                    <BillCompleteItem
                                        key={index}
                                        product={product}
                                        handleDelete={handleDelete}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            html = (
                <div className='cart_img' >
                    <div className='no-cart'>
                        <img src={no_cart} alt="no_cart" />
                    </div>
                </div>
            )
        }
        return html;
    }


    // huy product
    const handleDelete = id => {
        const { putProductActionsCreator } = props;
        const { putBillProductRequest } = putProductActionsCreator;
        putBillProductRequest(id)
    }

    return (
        <div className="content-billcomplete grid   ">
            <a className="content_benh--link block" style={{ padding: '10px 46px', fontZize: '12px' }} href="/user">
                Trang Chủ
            </a>
            <div className='inside__BP '  >
                {
                    renderProduct()
                }
            </div>
            {
                pagination > 10 ?
                    (<ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
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
        listProduct: state.billProductReducer,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchProductActionsCreator: bindActionCreators(cartActions, dispatch),
    putProductActionsCreator: bindActionCreators(cartActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    // withReduxForm,
)(BillComplete);
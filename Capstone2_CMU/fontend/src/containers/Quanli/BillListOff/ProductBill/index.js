import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { removeVietnameseTones } from '../../../../commons/vietnam';
import * as billProductListActions from '../../../../actions/QuanLi/BillListOff/productBill';
// import * as billProductListApi from '../../../../apis/QuanLi/billListOff';
import { NavLink } from 'react-router-dom';
import { formatCash } from '../../../../commons/VND';
import { Button } from '@mui/material';
import { Input, Modal } from 'antd';
import FormModal from './form';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { reduxForm } from 'redux-form';
import validate from './../../../../commons/Validate/validateBill';
const { confirm } = Modal;

// const http = "http://localhost:8080/danhsachhoadon";
// const loadHttp = '/manager/offbilllist';

function ProductBillManager(props) {

    const { history, showInfoClient ,showProduct, productSearch, handleSubmit, match, reset } = props;

    const [pageCount, setpageCount] = useState(0);
    const [playerSearch, setPlayerSearch] = useState([]);
    const [q, setQ] = useState('');
    const [pagination, setPagination] = useState('');
    const [dataCSV, setDataCSV] = useState('');
    const [title, setTitle] = useState('');

    let limit = 10;

    // form add
    const [isModalVisible, setIsModalVisible] = useState(false);

    // show data
    useEffect(() => {
        let page = 1 ;
        if(productSearch){
            setpageCount(Math.ceil(productSearch.length / limit));
            setPagination(productSearch.length)
        }
        const { showBillListActionsCreator , BillListSearchActionsCreator} = props;

        const { fetchProcutBillRequest } = showBillListActionsCreator;
        fetchProcutBillRequest( match.params.id , page)
        
        const {BillProductSearch} = BillListSearchActionsCreator;
        BillProductSearch();
    }, []);

    // panination 
    const handlePageClick = async (data) => {
        const { showBillListActionsCreator } = props;
        const { fetchProcutBillRequest } = showBillListActionsCreator;
        fetchProcutBillRequest(match.params.id  , data.selected + 1)
    };

    // lấy value để search
    useEffect(() => {

    }, [])

    // close  form modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // open button edit 
    const showModalEdit = data => {
        const { edditBillProductActionsCreator } = props;
        const { editProduct } = edditBillProductActionsCreator;
        editProduct(data);
        setTitle(`Sửa thuốc`)
        setIsModalVisible(true)
    }

    // handle submit form 
    const formTask = (data) => {
        const { editProductActionsCreator } = props;
        const { editProductRequest } = editProductActionsCreator;
        editProductRequest(showInfoClient._id , data);
    }

    // xác nhận xóa
    function showDeleteConfirm(id) {
        const { deleteBillProductActionsCreator } = props;
        const { deleteBillProductRequest } = deleteBillProductActionsCreator;
        confirm({
            title: 'Are you sure delete this?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteBillProductRequest(showInfoClient._id, id)
                setTimeout(
                    history.go(), 1000
                )
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // table product
    const CustomerRow = (customer, index) => {
        return (
            <tr key={index} className='even'>
                <td className='table__center'> {index + 1} </td>
                <td> {customer.productName} </td>
                <td> {customer.drugCode} </td>
                <td> {customer.dvt} </td>
                <td className='table__end'>{customer.quantityBuy}</td>
                <td className='table__end'>{formatCash(String(customer.price))}đ</td>
                <td className='table__end'>{formatCash(String(Number(customer.quantityBuy) * Number(customer.price)))}đ</td>
                <td className='table__center'>
                    <div className='table__handle'>
                        <Button onClick={() => showModalEdit(customer)} variant="contained" color="success">
                            <i class="fas fa-edit"></i>
                        </Button>
                        <Button onClick={() => showDeleteConfirm(customer._id)} variant="contained" color="error">
                            <i class="fas fa-trash-alt"></i>
                        </Button>
                    </div>
                </td>
            </tr>
        )
    }

    // table product
    const CustomerTable = () => {
        if (q !== '') {
            let value = (typeof productSearch !== 'undefined') ? productSearch.filter(row =>
                // String(row.id).trim().indexOf(q.trim()) > -1 ||
                removeVietnameseTones(row.productName).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                row.drugCode.toLowerCase().trim().indexOf(q.toLowerCase().trim()) > -1 ||
                removeVietnameseTones(row.dvt).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                String(row.quantityBuy).trim().indexOf(q.trim()) > -1 ||
                String(row.price).trim().indexOf(q.trim()) > -1 ||
                String(Number(row.quantityBuy) * Number(row.price)).trim().indexOf(q.trim()) > -1
            ) : '';
            return value.map((cust, index) => CustomerRow(cust, index));
        } else if (typeof showProduct !== 'undefined') {
            return showProduct.map((cust, index) => CustomerRow(cust, index));
        }
    }

    // info product
    const tableHeader = <thead className='bgvi'>
        <tr>
            <th className='table__center'>#</th>
            <th className='table__center'>Tên thuốc</th>
            <th className='table__center'>Mã thuốc</th>
            <th className='table__center'>ĐVT(bán)</th>
            <th className='table__center'>Số lượng</th>
            <th className='table__center'>Giá bán</th>
            <th className='table__center'>Tổng tiền</th>
            <th className='table__center'>Tùy chọn</th>
        </tr>
    </thead>

    // info product
    const tableHeaderClient = <thead className='bgvi'>
        <tr>
            <th className='table__center'>Mã hóa đơn</th>
            <th className='table__center'>Tên khách hàng</th>
            <th className='table__center'>Số điện thoại</th>
            <th className='table__center'>Địa chỉ</th>
            <th className='table__center'>Ngày bán</th>
            <th className='table__center'>Tổng tiền</th>
        </tr>
    </thead>

    // tinh tong tien san pham
    const handleTotalPrice = (total, value) => {
        if (value) {
            value.map((money) => {
                total += money.quantityBuy * money.price
            })
        }
        return total;
    }

    // row table client
    const CustomerRowClinet = () => {
        let total = 0;
        return (
            <tr key={showInfoClient._id} className='even'>
                <td> {showInfoClient._id} </td>
                <td> {showInfoClient.fullName} </td>
                <td> {showInfoClient.phoneNumber} </td>
                <td>{showInfoClient.address}</td>
                <td className='table__end'>{(typeof showInfoClient.dateBuy) !== 'undefined' ? showInfoClient.dateBuy.trim().split('-').reverse().join('/') : ''}</td>
                <td className='table__end'>{formatCash(String(handleTotalPrice(total, showInfoClient.listProduct)))}đ</td>
            </tr>
        )
    }

    return (
        <div>
            <div className="p-x-30">
                <div className="header_content">
                    <NavLink className="return__link" to="/manager/offbilllist" >Quay lại</NavLink>
                </div>
            </div>
            <div className="content p-y-10 p-x-30">
                <div className="handle__task">
                    <div className="search__input">
                        <Input value={q} onChange={(e) => setQ(e.target.value)} className="input" name="search_thuoc" type="text" placeholder="Nhập từ khóa cần tìm" />
                    </div>
                </div>
                <div className="table__Info--client">
                    <Table striped bordered hover>
                        {tableHeaderClient}
                        <tbody>
                            {CustomerRowClinet()}
                        </tbody>
                    </Table>
                </div>
                <div className="pt-22 pb-40">
                    <div className="table__inner">
                        <div className="header__table">
                            <i className="fas fa-bars"></i>
                            <span>Danh sách thuốc</span>
                        </div>
                        <FormModal
                            isModalVisible={isModalVisible}
                            handleCancel={handleCancel}
                            handleSubmit={handleSubmit}
                            formTask={formTask}
                            history={history}
                            title={title}
                            reset={reset}
                        />
                        <div className="table__content">
                            <Table striped bordered hover>
                                {tableHeader}
                                <tbody>
                                    {CustomerTable()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                {
                    pagination > 9 ?
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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        showInfoClient: state.manageProductBillOffReducer.billProduct,
        showProduct: state.manageProductBillOffReducer.billProductPagination,
        productSearch: state.manageProductBillOffReducer.billProductSearch,
        initialValues: state.manageProductBillOffReducer.taskEditting
    };
};

const mapDispatchToProps = dispatch => ({
    showBillListActionsCreator: bindActionCreators(billProductListActions, dispatch),
    BillListSearchActionsCreator: bindActionCreators(billProductListActions, dispatch),
    deleteBillProductActionsCreator: bindActionCreators(billProductListActions, dispatch),
    editProductActionsCreator: bindActionCreators(billProductListActions, dispatch),
    edditBillProductActionsCreator: bindActionCreators(billProductListActions, dispatch),
});

const FORM_NAME = 'TASK_BILL_MANAGER';

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate,
    enableReinitialize: true // dùng để xóa initialize của từng Field khi đóng form
})

export default compose(
    withConnect,  // phải trước Redux-Form
    withReduxForm
)(ProductBillManager);


import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { removeVietnameseTones } from '../../../../commons/vietnam';
import { Input, Modal } from 'antd';
import * as billProductListActions from '../../../../actions/QuanLi/BillListOnline/productBill';
import * as billProductListApi from '../../../../apis/QuanLi/billListOff';
import { NavLink } from 'react-router-dom';
import { formatCash } from '../../../../commons/VND';
import { Button } from '@mui/material';
import { reduxForm } from 'redux-form';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import FormModal from './form';
import validate from './../../../../commons/Validate/validateBill';
const { confirm } = Modal;

const http = "http://localhost:8080/billlistonline";

function ProductBillManager(props) {
    const { history,showInfoClient, showProduct ,productSearch , handleSubmit , match ,reset} = props;

    const [pageCount, setpageCount] = useState(0);
    const [playerSearch, setPlayerSearch] = useState([]);
    const [q, setQ] = useState('');
    const [pagination, setPagination] = useState('');
    const [dataCSV, setDataCSV] = useState('');
    const [title, setTitle] = useState('');

    // form add
    const [isModalVisible, setIsModalVisible] = useState(false);

    let limit = 10;
    // show data
    useEffect(() => {
        let page = 1 ;
        billProductListApi.getBill().then(res => {
            const { data } = res;
            if(data){
                setpageCount(Math.ceil(data.length / limit));
                setPagination(data.length)
            }
        });
        const { showBillListActionsCreator , BillListSearchActionsCreator } = props;

        const { fetchProcutBillRequest } = showBillListActionsCreator;
        fetchProcutBillRequest(match.params.id , page)
        
        const {BillProductSearch} = BillListSearchActionsCreator;
        BillProductSearch();
    }, []);

    // panination 
    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        const { showPaginationActionsCreator } = props;
        const { showPagination } = showPaginationActionsCreator;
        showPagination(currentPage);
    };

    // close  form modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // open button edit 
    const showModalEdit = ( data) => {
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
        editProductRequest(showInfoClient._id ,data);
    }


    // xác nhận xóa
    function showDeleteConfirm(id_user , id_product) {
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
                deleteBillProductRequest(id_user , id_product)    
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
        let totalPrice = Number(customer.quantityBuy) * Number(customer.price);
        return (
            <tr key={index} className='even'>
                <td className='table__center'> {index + 1} </td>
                <td> {customer.productName} </td>
                <td> {customer.drugCode} </td>
                <td> {customer.dvt} </td>
                <td className='table__end'>{customer.quantityBuy}</td>
                <td className='table__end'>{formatCash(String(customer.price))}đ</td>
                <td className='table__end'>{formatCash(String(totalPrice))}đ</td>
                <td className='table__center'>
                    <div className='table__handle'>
                        <Button onClick={() => showModalEdit( customer)} variant="contained" color="success">
                            <i class="fas fa-edit"></i>
                        </Button>
                        <Button onClick={() => showDeleteConfirm(showInfoClient._id , customer._id)} variant="contained" color="error">
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
                String(row.price).trim().indexOf(q.trim()) > -1 ||
                String(row.quantityBuy).trim().indexOf(q.trim()) > -1 ||
                String(Number(row.quantityBuy) * Number(row.price)).trim().indexOf(q.trim()) > -1
            ) : ' ';
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
        if(value){
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
                    <NavLink className="return__link" to="/manager/onlinebilllist" >Quay lại</NavLink>
                </div>
            </div>
            <div className="content p-y-10 p-x-30">
                <div className="handle__task">
                    <div className="search__input">
                        <Input value={q} onChange={(e) => setQ(e.target.value)} className="input" name="search_thuoc" type="text" placeholder="Nhập từ khóa cần tìm" />
                    </div>
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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        showInfoClient: state.manageProductBillOnlineReducer.billProduct,
        showProduct: state.manageProductBillOnlineReducer.billProductPagination,
        productSearch: state.manageProductBillOnlineReducer.billProductSearch,
        initialValues: state.manageProductBillOnlineReducer.taskEditting
    };
};

const mapDispatchToProps = dispatch => ({
    showBillListActionsCreator: bindActionCreators(billProductListActions, dispatch),
    BillListSearchActionsCreator: bindActionCreators(billProductListActions, dispatch),
    editProductActionsCreator: bindActionCreators(billProductListActions, dispatch),
    edditBillProductActionsCreator: bindActionCreators(billProductListActions, dispatch),
    deleteBillProductActionsCreator: bindActionCreators(billProductListActions, dispatch),
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



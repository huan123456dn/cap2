import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { removeVietnameseTones } from '../../../commons/vietnam';
import { Input } from 'antd';
import * as listProductActions from '../../../actions/NhanVien/BillListOnline/productBill';
import { NavLink } from 'react-router-dom';
import { formatCash } from '../../../commons/VND';

function ProductBillOnl(props) {
    const { showProduct } = props;

    const [pageCount, setpageCount] = useState(0);
    const [playerSearch, setPlayerSearch] = useState([]);
    const [q, setQ] = useState('');
    const [pagination, setPagination] = useState('');

    let limit = 10;

    let newData = JSON.parse(localStorage.getItem('showBillProductOnline'));

    // show data
    useEffect(() => {
        let page = 1;
        if(newData.listProduct){
            setPlayerSearch(newData.listProduct)
            setpageCount(Math.ceil(newData.listProduct.length / limit));
            setPagination(newData.listProduct.length)
        }
        const { showBillListActionsCreator } = props;
        const { fetchProductLBillRequest } = showBillListActionsCreator;
        fetchProductLBillRequest(page)
    }, []);

    //  panination 
    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        const { showBillListActionsCreator } = props;
        const { fetchProductLBillRequest } = showBillListActionsCreator;
        fetchProductLBillRequest(currentPage)
    };

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
            </tr>
        )
    }

    // table product
    const CustomerTable = () => {
        if (q !== '') {
            let value = (typeof playerSearch !== 'undefined') ? playerSearch.filter(row =>
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
        value.map((money) => total += money.quantityBuy * money.price)
        return total;
    }

    // row table client
    const CustomerRowClinet = () => {
        let infoClient = JSON.parse(localStorage.getItem('showBillProductOnline'));
        let total = 0;
        return (
            <tr key={infoClient._id} className='even'>
                <td> {infoClient._id} </td>
                <td> {infoClient.fullName} </td>
                <td> {infoClient.phoneNumber} </td>
                <td>{infoClient.address}</td>
                <td className='table__end'>{infoClient.dateBuy.trim().split('-').reverse().join('/')}</td>
                <td className='table__end'>{formatCash(String(handleTotalPrice(total, infoClient.listProduct)))}đ</td>
            </tr>
        )
    }

    return (
        <div>
            <div className="p-x-30">
                <div className="header_content">
                    <NavLink className="return__link" to="/staff/onlinebilllist" >Quay lại</NavLink>
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
        showProduct: state.staffProductBillOnlineReducer.billProduct,
    };
};

const mapDispatchToProps = dispatch => ({
    showBillListActionsCreator: bindActionCreators(listProductActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withConnect,
)(ProductBillOnl);



import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { removeVietnameseTones } from '../../../commons/vietnam';
import { Input } from 'antd';
import * as listProductActions from '../../../actions/NhanVien/BillListOff/productBill';
import { NavLink } from 'react-router-dom';
import { formatCash } from '../../../commons/VND';

function ProductBillOff(props) {
    const { showProduct } = props;

    const [pageCount, setpageCount] = useState(0);
    const [playerSearch, setPlayerSearch] = useState([]);
    const [q, setQ] = useState('');
    const [pagination, setPagination] = useState('');

    let limit = 10;

    let newData = JSON.parse(localStorage.getItem('showBillProductOff'));

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
        const { showBillListActionsCreator } = props;
        const { fetchProductLBillRequest } = showBillListActionsCreator;
        fetchProductLBillRequest(data.selected + 1)
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
                <td className='table__end'>{formatCash(String(customer.price))}??</td>
                <td className='table__end'>{formatCash(String(Number(customer.quantityBuy) * Number(customer.price)))}??</td>
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
            <th className='table__center'>T??n thu???c</th>
            <th className='table__center'>M?? thu???c</th>
            <th className='table__center'>??VT(b??n)</th>
            <th className='table__center'>S??? l?????ng</th>
            <th className='table__center'>Gi?? b??n</th>
            <th className='table__center'>T???ng ti???n</th>
        </tr>
    </thead>

    // info product
    const tableHeaderClient = <thead className='bgvi'>
        <tr>
            <th className='table__center'>M?? h??a ????n</th>
            <th className='table__center'>T??n kh??ch h??ng</th>
            <th className='table__center'>S??? ??i???n tho???i</th>
            <th className='table__center'>?????a ch???</th>
            <th className='table__center'>Ng??y b??n</th>
            <th className='table__center'>T???ng ti???n</th>
        </tr>
    </thead>

    // tinh tong tien san pham
    const handleTotalPrice = (total, value) => {
        value.map(money => total += money.quantityBuy * money.price)
        return total;
    }

    // row table client
    const CustomerRowClinet = () => {
        let infoClient = JSON.parse(localStorage.getItem('showBillProductOff'));
        let total = 0;
        return (
            <tr key={infoClient._id} className='even'>
                <td> {infoClient._id} </td>
                <td> {infoClient.fullName} </td>
                <td> {infoClient.phoneNumber} </td>
                <td>{infoClient.address}</td>
                <td className='table__end'>{infoClient.dateBuy.trim().split('-').reverse().join('/')}</td>
                <td className='table__end'>{formatCash(String(handleTotalPrice(total, infoClient.listProduct)))}??</td>
            </tr>
        )
    }

    return (
        <div>
            <div className="p-x-30">
                <div className="header_content">
                    <NavLink className="return__link" to="/staff/offbilllist" >Quay l???i</NavLink>
                </div>
            </div>
            <div className="content p-y-10 p-x-30">
                <div className="handle__task">
                    <div className="search__input">
                        <Input value={q} onChange={(e) => setQ(e.target.value)} className="input" name="search_thuoc" type="text" placeholder="Nh???p t??? kh??a c???n t??m" />
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
                            <span>Danh s??ch thu???c</span>
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
        showProduct: state.staffProductBillOffReducer.billProduct,
    };
};

const mapDispatchToProps = dispatch => ({
    showBillListActionsCreator: bindActionCreators(listProductActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withConnect,  // ph???i tr?????c Redux-Form
)(ProductBillOff);



import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { removeVietnameseTones } from '../../../commons/vietnam';
import { Input } from 'antd';
import * as listProductActions from '../../../actions/NhanVien/BillListOff/BillList';
import * as listProductApi from './../../../apis/NhanVien/billListOff';
import { formatCash } from '../../../commons/VND';

const http = "http://localhost:8080/api/staff/offbilllist";
const returnHttp = '/staff/';

function BillListOff(props) {
    const { history, showProduct } = props;

    const [pageCount, setpageCount] = useState(0);
    const [playerSearch, setPlayerSearch] = useState([]);
    const [q, setQ] = useState('');
    const [pagination, setPagination] = useState('');

    let limit = 10;
    
    // show data
    useEffect(() => {
        let page = 1;
        listProductApi.getProduct().then(res => {
            const { data } = res;
            if(data){
                setpageCount(Math.ceil(data.length / limit));
                setPagination(data.length)
            }
        })
        const { showBillListActionsCreator } = props;
        const { fetchBillRequest } = showBillListActionsCreator;
        fetchBillRequest(page)
    }, []);

    const handleBillProduct = listProduct => {
        localStorage.removeItem("showBillProductOff")
        localStorage.setItem("showBillProductOff", JSON.stringify(listProduct));
        history.push(`/staff/offbilllist/${listProduct._id}`)
    }

    // tinh tong tien san pham
    const handleTotalPrice = ( total , value) => {
        value.map((money) => {
            total +=   money.quantityBuy * money.price
        })
        return total;
    }

    const CustomerRow = (customer, index) => {
        let total = 0 ;
        return (
            <tr key={index} className='even'>
                <td className='table__center'> {index + 1} </td>
                <td className='product__bill' onClick={() => handleBillProduct(customer)}> {customer._id} </td>
                <td  className='table__center'> 
                    {  customer.listProduct ? customer.listProduct.length : ''} 
                </td>
                <td className='table__center'>{customer.fullName}</td>
                <td className='table__end'>{formatCash(String(handleTotalPrice(total , customer.listProduct)))} ??</td>
                <td className='table__end'>{customer.dateBuy.trim().split('-').reverse().join('/')}</td>
                <td className='table__center'>{customer.staff}</td>
            </tr>
        )
    }

    const tableHeader = <thead className='bgvi'>
        <tr>
            <th className='table__center'>#</th>
            <th className='table__center'>M?? ho?? ????n</th>
            <th className='table__center'>Quantity</th>
            <th className='table__center'>Kh??ch h??ng</th>
            <th className='table__center'>T???ng th??nh ti???n</th>
            <th className='table__center'>Th???i gian</th>
            <th className='table__center'>Nh??n Vi??n</th>
        </tr>
    </thead>

    // panination 
    const handlePageClick = data => {
        const { showBillListActionsCreator } = props;
        const { fetchBillRequest } = showBillListActionsCreator;
        fetchBillRequest(data.selected + 1)
    };

    // l???y value ????? search
    useEffect(() => {
        axios.get(http).then(res => {
            let { data } = res;
            setPlayerSearch(data)
        });
    }, [])

    const CustomerTable = () => {
        let total = 0;
        if (q !== '') {
            let value = playerSearch.filter(row =>
                // String(row._id).trim().indexOf(q.trim()) > -1 ||
                String(row._id).trim().indexOf(q.trim()) > -1 ||
                removeVietnameseTones(row.fullName).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                row.dateBuy.trim().split('-').reverse().join('/').indexOf(q.trim()) > -1 ||
                String(row.listProduct.length).trim().indexOf(q.trim()) > -1 ||
                String(handleTotalPrice(total , row.listProduct)).trim().indexOf(q.trim()) > -1 
                // removeVietnameseTones(row.staff).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 
            );
            return value.map((cust, index) => CustomerRow(cust, index));
        } else if (typeof showProduct !== 'undefined') {
            return showProduct.map((cust, index) => CustomerRow(cust, index));
        }
    }

    // return main
    const onClickLink = () => {
        localStorage.removeItem('openNavbar')
        localStorage.setItem('openNavbar', false)
        history.push(returnHttp)
    }

    return (
        <div>
            <div className="p-x-30">
                <div className="header_content">
                    <div onClick={onClickLink} className="home__link" >Trang ch???</div>
                    <span>Qu???n l?? h??a ????n</span>
                </div>
            </div>
            <div className="content p-y-10 p-x-30">
                <div className="handle__task">
                    <div className="search__input">
                        <Input value={q} onChange={(e) => setQ(e.target.value)} className="input" name="search_thuoc" type="text" placeholder="Nh???p t??? kh??a c???n t??m" />
                    </div>
                </div>
                <div className="pt-22 pb-40">
                    <div className="table__inner">
                        <div className="header__table">
                            <i className="fas fa-bars"></i>
                            <span>Qu???n l?? h??a ????n</span>
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
        showProduct: state.staffBillListOffReducer.billList,
    };
};

const mapDispatchToProps = dispatch => ({
    showBillListActionsCreator: bindActionCreators(listProductActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withConnect,  // ph???i tr?????c Redux-Form
)(BillListOff);



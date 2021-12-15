import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { removeVietnameseTones } from '../../../commons/vietnam';
import { Input } from 'antd';
import * as listProductActions from './../../../actions/NhanVien/listProduct';
import * as listProductApi from './../../../apis/NhanVien/listProduct';
import { formatCash } from './../../../commons/VND';

const http = "http://localhost:8080/api/staff/druglist";
const returnHttp = '/staff/';

function DanhSachThuoc(props) {
    const { history, showProduct } = props;

    const [pageCount, setpageCount] = useState(0);
    const [playerSearch, setPlayerSearch] = useState([]);
    const [q, setQ] = useState('');
    const [pagination, setPagination] = useState('');

    let limit = 10;

    useEffect(() => {
        let page = 1;
        listProductApi.getProduct().then(res => {
            const { data } = res;
            if(data){
                setpageCount(Math.ceil(data.length / limit));
                setPagination(data.length)
            }
        })
        const { showProductActionsCreator } = props;
        const { fetchProductRequest } = showProductActionsCreator;
        fetchProductRequest(page)
    }, []);

    //show table
    const CustomerRow = (customer, index) => {
        return (
            <tr key={index} className='even'>
                <td className='table__center'> {index + 1} </td>
                <td>{customer.productName}</td>
                <td>{customer.drugCode}</td>
                <td>{customer.dvt}</td>
                <td className='table__end'>{formatCash(String(customer.price))}đ</td>
                <td>{customer.pack}</td>
            </tr>
        )
    }

    //show table
    const tableHeader = <thead className='bgvi'>
        <tr>
            <th className='table__center'>#</th>
            <th className='table__center'>Tên thuốc</th>
            <th className='table__center'>Mã Thuốc</th>
            <th className='table__center'>ĐVT(bán)</th>
            <th className='table__center'>Giá Bán</th>
            <th className='table__center'>Đóng gói</th>
        </tr>
    </thead>

    // panination 
    const handlePageClick = data => {
        const { showProductActionsCreator } = props;
        const { fetchProductRequest } = showProductActionsCreator;
        fetchProductRequest(data.selected + 1)
    };

    // lấy value để search
    useEffect(() => {
        axios.get(http).then(res => {
            let { data } = res;
            setPlayerSearch(data)
        });
    }, [])

    //show search table
    const CustomerTable = () => {
        if (q !== '') {
            let value = playerSearch.filter(row =>
                // String(row.id).trim().indexOf(q.trim()) > -1 ||
                removeVietnameseTones(row.productName).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                row.drugCode.toLowerCase().trim().indexOf(q.toLowerCase().trim()) > -1 ||
                removeVietnameseTones(row.dvt).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                String(row.price).trim().indexOf(q.trim()) > -1 ||
                removeVietnameseTones(row.pack).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1
            );
            return value.map((cust, index) => CustomerRow(cust, index));
        } else if (typeof showProduct !== 'undefined') {
            return showProduct.map((cust, index) => CustomerRow(cust, index));
        }
    }

    // return trang chu
    const onClickLink = () => {
        localStorage.removeItem('openNavbar')
        localStorage.setItem('openNavbar', false)
        history.push(returnHttp)
    }


    return (
        <div >
            <div className="p-x-30">
                <div className="header_content">
                    <div onClick={onClickLink} className="home__link" >Trang chủ</div>
                    <span>Danh mục thuốc</span>
                </div>
            </div>
            <div className="content p-y-10 p-x-30">
                <div className="handle__task">
                    <div className="search__input">
                        <Input value={q} onChange={(e) => setQ(e.target.value)} className="input" name="search_thuoc" type="text" placeholder="Nhập từ khóa cần tìm" />
                    </div>
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
        showProduct: state.staffProductListReducer.listProduct,
    };
};

const mapDispatchToProps = dispatch => ({
    showProductActionsCreator: bindActionCreators(listProductActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
)(DanhSachThuoc);



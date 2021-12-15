import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { removeVietnameseTones } from '../../../../commons/vietnam';
import { Input, Modal } from 'antd';
import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';
import * as billListActions from '../../../../actions/QuanLi/BillListOff/billList';
import * as billListApi from '../../../../apis/QuanLi/billListOff';
import { formatCash } from '../../../../commons/VND';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { reduxForm } from 'redux-form';
import FormModal from './form';
import validate from './../../../../commons/Validate/validateBill';
const { confirm } = Modal;

const http = "http://localhost:8080/api/manager/offbilllist";
const returnHttp = '/manager/';
const loadHttp = '/manager/offbilllist';

function BillListManager(props) {
    const { history, handleSubmit, showProduct } = props;

    const [pageCount, setpageCount] = useState(0);
    const [playerSearch, setPlayerSearch] = useState([]);
    const [q, setQ] = useState('');
    const [pagination, setPagination] = useState('');
    const [dataCSV, setDataCSV] = useState('');
    const [title, setTitle] = useState('');

    let limit = 10;

    const fileName = 'Table Danh Sách hóa đơn tại quầy';

    // form add
    const [isModalVisible, setIsModalVisible] = useState(false);

    // show data
    useEffect(() => {
        let page = 1;
        billListApi.getBill().then(res => {
            const { data } = res;
            if(data){
                setpageCount(Math.ceil(data.length / limit));
                setPagination(data.length)
            }
        })
        const { showBillListActionsCreator } = props;
        const { fetchBillListRequest } = showBillListActionsCreator;
        fetchBillListRequest(page)
    }, []);

    const handleBillProduct = listProduct => {
        localStorage.removeItem("showBillProductOff")
        localStorage.setItem("showBillProductOff", JSON.stringify(listProduct));
        history.push(`/manager/offbilllist/${listProduct._id}` ,[listProduct._id])
    }

    // close  form modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // open button edit 
    const showModalEdit = data => {
        const { edditBillActionsCreator } = props;
        const { editBill } = edditBillActionsCreator;
        editBill(data);
        setTitle(`Sửa thuốc`)
        setIsModalVisible(true)
    }

    // handle submit form 
    const formTask = (data) => {
        const { edditBillActionsCreator } = props;
        const { editBillRequest } = edditBillActionsCreator;
        editBillRequest(data);
    }

    // xác nhận xóa
    function showDeleteConfirm(id) {
        const { deleteBillActionsCreator } = props;
        const { deleteBillRequest } = deleteBillActionsCreator;
        confirm({
            title: 'Are you sure delete this?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteBillRequest(id)
                setTimeout(
                    history.go(loadHttp), 1000
                )
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // tinh tong tien san pham
    const handleTotalPrice = (total, value) => {
        value.map( money => {
            total += money.quantityBuy * money.price
        })
        return total;
    }

    const CustomerRow = (customer, index) => {
        let total = 0;
        return (
            <tr key={index} className='even'>
                <td className='table__center'> {index + 1} </td>
                <td className='product__bill' onClick={() => handleBillProduct(customer)}> {customer._id} </td>
                <td className='table__center'>
                    {customer.listProduct ? customer.listProduct.length : ''}
                </td>
                <td className='table__center'>{customer.fullName}</td>
                <td className='table__end'>{formatCash(String(handleTotalPrice(total ,customer.listProduct)))}đ</td>
                <td className='table__end'>{customer.dateBuy.trim().split('-').reverse().join('/')}</td>
                <td className='table__center'>{customer.staff}</td>
                <td>
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

    const tableHeader = <thead className='bgvi'>
        <tr>
            <th className='table__center'>#</th>
            <th className='table__center'>Mã hoá đơn</th>
            <th className='table__center'>Quantity</th>
            <th className='table__center'>Khách hàng</th>
            <th className='table__center'>Tổng thành tiền</th>
            <th className='table__center'>Thời gian</th>
            <th className='table__center'>Nhân viên</th>
            <th className='table__center'>Tùy chọn</th>
        </tr>
    </thead>

    // panination 
    const handlePageClick = data => {
        const { showBillListActionsCreator } = props;
        const { fetchBillListRequest } = showBillListActionsCreator;
        fetchBillListRequest(data.selected + 1)
    };

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

    // export 
    let headers = [
        { label: "Mã thuốc", key: "_id" },
        { label: "Số lượng", key: "Quantity" },
        { label: "Khách hàng", key: "fullName" },
        { label: "Tổng thành tiền", key: "TotalPrice" },
        { label: "Thời gian", key: "dateBuy" },
        { label: "Nhân viên", key: "importPrices" }
    ];

    // // export CSV 
    const handleCSV = data => {
        let newData = [];
        let total = 0;
        for (let value of data) {
            newData.push(
                {
                    ...value,
                    "Quantity": `${value.listProduct.length}`,
                    "TotalPrice": `${formatCash(String(handleTotalPrice(total ,value.listProduct)))}`
                }
            );
        }
        setDataCSV(newData)
    }

        // lấy value để search
        useEffect(() => {
            axios.get(http).then(res => {
                let { data } = res;
                setPlayerSearch(data);
                console.log(data);
                handleCSV(data);
            });
        }, []);


    return (
        <div>
            <div className="p-x-30">
                <div className="header_content">
                    <div onClick={onClickLink} className="home__link" >Trang chủ</div>
                    <span>Quản lí hóa đơn</span>
                </div>
            </div>
            <div className="content p-y-10 p-x-30">
                <div className="handle__task">
                    <div className="search__input">
                        <Input value={q} onChange={(e) => setQ(e.target.value)} className="input" name="search_thuoc" type="text" placeholder="Nhập từ khóa cần tìm" />
                        <Button variant="contained" color="success">
                            <i className="fas fa-file-excel"></i>
                            <CSVLink
                                className='add_excel'
                                data={dataCSV}
                                headers={headers}
                                filename={fileName}>Excel
                            </CSVLink>
                        </Button>
                    </div>
                </div>
                <FormModal
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancel}
                    handleSubmit={handleSubmit}
                    formTask={formTask}
                    history={history}
                    title={title}
                />
                <div className="pt-22 pb-40">
                    <div className="table__inner">
                        <div className="header__table">
                            <i className="fas fa-bars"></i>
                            <span>Quản lí hóa đơn</span>
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
        showProduct: state.manageBillListOffReducer.billList,
        initialValues: state.manageBillListOffReducer.taskEditting
    };
};

const mapDispatchToProps = dispatch => ({
    showBillListActionsCreator: bindActionCreators(billListActions, dispatch),
    deleteBillActionsCreator: bindActionCreators(billListActions, dispatch),
    edditBillActionsCreator: bindActionCreators(billListActions, dispatch),
});

const FORM_NAME = 'TASK_BILL_MANAGER';

const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate,
    enableReinitialize: true // dùng để xóa initialize của từng Field khi đóng form
})

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withConnect,  // phải trước Redux-Form
    withReduxForm
)(BillListManager);



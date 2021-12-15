import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { removeVietnameseTones } from '../../../commons/vietnam';
import { Button } from '@mui/material';
import FormModal from './form';
import { reduxForm } from 'redux-form';
import { Modal, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as listAccountActions from './../../../actions/QuanLi/listAccount';
import * as listAccountApi from './../../../apis/QuanLi/listAccount';
import validate from './../../../commons/Validate/validateFormAccount';

import { CSVLink } from 'react-csv';

const { confirm } = Modal;

const http = "http://localhost:8080/api/manager/employeemanager";
const loadHttp = '/manager/employeemanager';
const returnHttp = '/manager/';

function QuanLiNhanVien(props) {
    const { history, handleSubmit, showAccount , reset } = props;

    const [pageCount, setpageCount] = useState(0);
    const [playerSearch, setPlayerSearch] = useState([]);
    const [q, setQ] = useState('');
    const [title, setTitle] = useState('')
    const [dataCSV, setDataCSV] = useState('');
    const [pagination, setPagination] = useState('');

    const fileName = 'Table Quản lí tài khoản nhân viên';

    const [isModalVisible, setIsModalVisible] = useState(false);

    let limit = 10;

    //  form modal add 
    const showModalAdd = () => {
        const { openFormActionsCreator } = props;
        const { openform } = openFormActionsCreator;
        openform()
        setTitle(`Thêm tài khoản`);
        setIsModalVisible(true);
    };

    // close  form modal
    const handleCancel = () => {
        setIsModalVisible(false);
        reset()
    };

    // show data
    useEffect(() => {
        let page = 1;
        listAccountApi.getAccount().then(res => {
            const { data } = res;
            if(data){
                setpageCount(Math.ceil(data.length / limit));
                setPagination(data.length)
            }
        })
        const { showAccountActionsCreator } = props;
        const { fetchAccountRequest } = showAccountActionsCreator;
        fetchAccountRequest(page)
    }, []);

    // open button edit 
    const showModalEdit = data => {
        const { dataEditTaskActionsCreator } = props;
        const { editAccount } = dataEditTaskActionsCreator;
        editAccount(data);
        setTitle(`Sửa tài khoản`)
        setIsModalVisible(true)
    }

    const CustomerRow = (customer,index) => {
        return (
            <tr key={index} className='even'>
                <td className='table__center'> {index +1} </td>
                <td>{customer.userName}</td>
                <td>{customer.fullName}</td>
                <td className='table__end'>{customer.dateOfBirth.trim().split('-').reverse().join('/')}</td>
                <td className='table__end'>{customer.dateStart.trim().split('-').reverse().join('/')}</td>
                <td >{customer.email}</td>
                <td className='table__end'>{customer.phoneNumber}</td>
                <td>{customer.address}</td>
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
            <th className='table__center'>Tài khoản</th>
            <th className='table__center'>Tên nhân viên</th>
            <th className='table__center'>Ngày sinh</th>
            <th className='table__center'>Ngày bắt đầu</th>
            <th className='table__center'>Email</th>
            <th className='table__center'>Số điện thoại</th>
            <th className='table__center'>Địa chỉ</th>
            <th className='table__center width_small'>Tùy chọn</th>
        </tr>
    </thead>

    // export 
    let headers = [
        { label: "Tài khoản", key: "userName" },
        { label: "Tên nhân viên", key: "fullName" },
        { label: "Ngày sinh", key: "dateOfBirth" },
        { label: "Ngày bắt đầu", key: "dateStart" },
        { label: "Email", key: "email" },
        { label: "Số điện thoại", key: "phoneNumber" },
        { label: "Địa chỉ", key: "address" }
    ];

    // panination 
    const handlePageClick = data => {
        const { showAccountActionsCreator } = props;
        const { fetchAccountRequest } = showAccountActionsCreator;
        fetchAccountRequest(data.selected + 1)
    };

    // lấy value để search
    useEffect(() => {
        axios.get(http).then(res => {
            let { data } = res;
            setPlayerSearch(data);
            setDataCSV(data.reverse());
        });
    }, [])


    // handle submit form 
    const formTask = (data) => {
        if (typeof data._id === 'undefined') {
            const { addAccountActionsCreator } = props;
            const { addListAccountRequest } = addAccountActionsCreator;
            addListAccountRequest(data);
        } else {
            const { editAccountActionsCreator } = props;
            const { editAccountRequest } = editAccountActionsCreator;
            editAccountRequest(data);
        }
    }

    // xác nhận xóa
    function showDeleteConfirm(id) {
        const { deleteAccountActionsCreator } = props;
        const { deleteAccountRequest } = deleteAccountActionsCreator;
        confirm({
            title: 'Are you sure delete this?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteAccountRequest(id)
                setTimeout(
                    history.go(loadHttp), 1000
                )
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    const CustomerTable = () => {
        if (q !== '') {
            let value = playerSearch.filter(row =>
                // String(row.id).trim().indexOf(q.trim()) > -1 ||
                removeVietnameseTones(row.userName).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                removeVietnameseTones(row.fullName).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                row.dateOfBirth.trim().split('-').reverse().join('/').indexOf(q.trim()) > -1 ||
                row.dateStart.trim().split('-').reverse().join('/').indexOf(q.trim()) > -1 ||
                row.email.toLowerCase().trim().indexOf(q.toLowerCase().trim()) > -1 ||
                row.phoneNumber.trim().indexOf(q.trim()) > -1 ||
                removeVietnameseTones(row.address).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1
            );
            return value.map((cust,index) => CustomerRow(cust,index));
        } else if (typeof showAccount !== 'undefined') {
            return showAccount.map((cust,index) => CustomerRow(cust,index));
        }
    }

    // return home
    const onClickLink = () => {
        localStorage.removeItem('openNavbar')
        localStorage.setItem('openNavbar', false)
        history.push(returnHttp)
    }

    return (
        <div>
            <div className="p-x-30">
                <div className="header_content">
                    <div onClick={onClickLink} className="home__link" >Trang chủ</div>
                    <span>Quản lí nhân viên</span>
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
                    <FormModal
                        isModalVisible={isModalVisible}
                        showModal={showModalAdd}
                        handleCancel={handleCancel}
                        handleSubmit={handleSubmit}
                        formTask={formTask}
                        history={history}
                        title={title}
                        reset={reset}
                    />
                    <Button onClick={showModalAdd} className="add__btn" variant="contained" >
                        <i className="fas fa-plus"></i>
                        <p>Thêm tài khoản</p>
                    </Button>
                </div>
                <div className="pt-22 pb-40">
                    <div className="table__inner">
                        <div className="header__table">
                            <i className="fas fa-bars"></i>
                            <span>Quản lí nhân viên</span>
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
        showAccount: state.manageAccountReducer.listAccount,
        initialValues: state.manageAccountReducer.taskEditting
    };
};

const mapDispatchToProps = dispatch => ({
    showAccountActionsCreator: bindActionCreators(listAccountActions, dispatch),
    addAccountActionsCreator: bindActionCreators(listAccountActions, dispatch),
    openFormActionsCreator: bindActionCreators(listAccountActions, dispatch),
    deleteAccountActionsCreator: bindActionCreators(listAccountActions, dispatch),
    editAccountActionsCreator: bindActionCreators(listAccountActions, dispatch),
    dataEditTaskActionsCreator: bindActionCreators(listAccountActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = 'TASK_ACCOUNT_MANAGER';

const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate,
    enableReinitialize: true // dùng để xóa initialize của từng Field khi đóng form
})

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    withReduxForm,
)(QuanLiNhanVien);




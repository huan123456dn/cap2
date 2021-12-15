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
import * as listBranchActions from './../../../actions/Admin/branch';
import * as listBranchApi from './../../../apis/Admin/branch';
import validate from './../../../commons/Validate/validateBranch';

import { CSVLink } from 'react-csv';

const { confirm } = Modal;

const http = "http://localhost:8080/api/admin/branchmanagement";
const loadHttp = '/admin/branchmanagement';
const returnHttp = '/admin/';

function QuanLiChiNhanh(props) {
    const { history, handleSubmit, showBranch , reset } = props;
    const [pageCount, setpageCount] = useState(0);
    const [playerSearch, setPlayerSearch] = useState([]);
    const [q, setQ] = useState('');
    const [dataCSV, setDataCSV] = useState('');
    const [pagination, setPagination] = useState('');

    const [title, setTitle] = useState('')
    const fileName = 'Table Quản lí chi nhánh ';

    const [isModalVisible, setIsModalVisible] = useState(false);

    let limit = 10;

    //  form modal add 
    const showModalAdd = () => {
        const { openFormActionsCreator } = props;
        const { openform } = openFormActionsCreator;
        openform()
        setTitle(`Thêm chi nhánh`)
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
        listBranchApi.getBranch().then(res => {
            const { data } = res;
            if(data){
                setpageCount(Math.ceil(data.length / limit));
                setPagination(data.length)
            }
        })
        const { showBranchActionsCreator } = props;
        const { fetchBranchRequest } = showBranchActionsCreator;
        fetchBranchRequest(page);
    }, []);

    // open button edit 
    const showModalEdit = data => {
        const { dataEditTaskActionsCreator } = props;
        const { editBranch } = dataEditTaskActionsCreator;
        setIsModalVisible(true)
        setTitle(`Sửa chi nhánh`)
        editBranch(data);
    }

    const CustomerRow = (customer ,index) => {
        return (
            <tr key={index} className='even'>
                <td className='table__center'> {index +1} </td>
                <td >{customer.pharmacyName}</td>
                <td >{customer.managerName}</td>
                <td className='table__end'>{customer.phoneNumber}</td>
                <td>{customer.address}</td>
                <td className='table_center--ht'>
                    <div
                        className={customer.action === 'Online' ? 'table_hinhthuc onl' : 'table_hinhthuc off'}
                    >
                        {customer.action}
                    </div>
                </td>
                {/* <td>{customer.action}</td> */}
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
            <th className='table__center' >#</th>
            <th className='table__center' >Tên nhà thuốc</th>
            <th className='table__center' >Tên Quản lí</th>
            <th className='table__center' >Số điện thoại</th>
            <th className='table__center' >Địa chỉ</th>
            <th className='table__center' >Action</th>
            <th className='table__center width_small' >Tùy chọn</th>
        </tr>
    </thead>

    // export 
    let headers = [
        { label: "Tên nhà thuốc", key: "pharmacyName" },
        { label: "Tên quản lí", key: "managerName" },
        { label: "Số điện thoại", key: "phoneNumber" },
        { label: "Địa chỉ", key: "address" },
        { label: "Action", key: "action" },
    ];

    // panination 
    const handlePageClick =  data => {
        const { showBranchActionsCreator } = props;
        const { fetchBranchRequest } = showBranchActionsCreator;
        fetchBranchRequest( data.selected + 1)
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
            const { addBranchActionsCreator } = props;
            const { addListBranchRequest } = addBranchActionsCreator;
            addListBranchRequest(data);
        } else {
            const { editBranchActionsCreator } = props;
            const { editBranchRequest } = editBranchActionsCreator;
            editBranchRequest(data);
        }
    }

    // xác nhận xóa
    function showDeleteConfirm(id) {
        const { deleteBranchActionsCreator } = props;
        const { deleteBranchRequest } = deleteBranchActionsCreator;
        confirm({
            title: 'Are you sure delete this?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteBranchRequest(id)
                setTimeout(
                    history.go(loadHttp), 1000
                )
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // search
    const CustomerTable = () => {
        if (q !== '') {
            let value = playerSearch.filter(row =>
                // String(row.id).trim().indexOf(q.trim()) > -1 ||
                removeVietnameseTones(row.pharmacyName).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                removeVietnameseTones(row.managerName).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                row.phoneNumber.trim().indexOf(q.trim()) > -1 ||
                removeVietnameseTones(row.address).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                row.action.toLowerCase().trim().indexOf(q.toLowerCase().trim()) > -1 
            );
            return value.map((cust , index) => CustomerRow(cust , index));
        } else if (typeof showBranch !== 'undefined') {
            return showBranch.map((cust , index) => CustomerRow(cust , index));
        }
    }

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
                    <span>Quản lí chi nhánh</span>
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
                        <p>Thêm chi nhánh</p>
                    </Button>
                </div>
                <div className="pt-22 pb-40">
                    <div className="table__inner">
                        <div className="header__table">
                            <i className="fas fa-bars"></i>
                            <span>Quản lí chi nhánh</span>
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
        showBranch: state.adminBranchReducer.listBranch,
        initialValues: state.adminBranchReducer.taskEditting
    };
};

const mapDispatchToProps = dispatch => ({
    showBranchActionsCreator: bindActionCreators(listBranchActions, dispatch),
    addBranchActionsCreator: bindActionCreators(listBranchActions, dispatch),
    openFormActionsCreator: bindActionCreators(listBranchActions, dispatch),
    deleteBranchActionsCreator: bindActionCreators(listBranchActions, dispatch),
    editBranchActionsCreator: bindActionCreators(listBranchActions, dispatch),
    dataEditTaskActionsCreator: bindActionCreators(listBranchActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = 'TASK_BRANCH_ADMIN';

const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate,
    enableReinitialize: true // dùng để xóa initialize của từng Field khi đóng form
})

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    withReduxForm,
)(QuanLiChiNhanh);


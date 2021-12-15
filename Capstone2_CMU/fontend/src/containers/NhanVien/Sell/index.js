import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { removeVietnameseTones } from '../../../commons/vietnam';
import { Button } from '@mui/material';
import { Input, Modal } from 'antd';
import { reduxForm } from 'redux-form';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import * as listProductActions from './../../../actions/NhanVien/sell';
import * as sellBillApi from './../../../apis/NhanVien/sell';
import FormModal from './form';
import validate from './../../../commons/Validate/validateSell';
import Sellclient from './sellClient';
import { formatCash } from './../../../commons/VND';
const { confirm } = Modal;

const returnHttp = '/staff/sell';

function Sell(props) {

    const { history, handleSubmit, showProduct, reset } = props;

    const [pageCount, setpageCount] = useState(0);
    const [playerSearch, setPlayerSearch] = useState([]);
    const [q, setQ] = useState('');
    const [title, setTitle] = useState('');
    const [dataCSV, setDataCSV] = useState('');
    const [pagination, setPagination] = useState('');

    // form add
    const [isModalVisible, setIsModalVisible] = useState(false);

    // data total form client
    const [dataTotal, setDataTotal] = useState(0);
    let limit = 10;
    let page = 1;
    const fileName = 'Table Danh Sách bán hàng';

    useEffect(() => {
        let newProduct = JSON.parse(localStorage.getItem('sellProduct'));
        if (newProduct) {
            setpageCount(Math.ceil(newProduct.length / limit));
            setPagination(newProduct.length)
        }
        const { showProductActionsCreator } = props;
        const { fetchProductSell } = showProductActionsCreator;
        fetchProductSell(page)
        localStorage.setItem('openNavbar', false)
    }, []);

    const CustomerRow = (customer) => {
        return (
            <tr key={customer.id} className='even'>
                <td>{customer.productName}</td>
                <td>{customer.drugCode}</td>
                <td>{customer.dvt}</td>
                <td className='table__end'>{customer.quantityBuy}</td>
                <td className='table__end'>{formatCash(String(customer.price))}đ</td>
                <td className='table__end'>{formatCash(String(Number(customer.quantityBuy) * Number(customer.price)))}đ</td>
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
            <th className='table__center'>Tên thuốc</th>
            <th className='table__center'>Mã thuốc</th>
            <th className='table__center'>ĐVT(bán)</th>
            <th className='table__center'>Số lượng</th>
            <th className='table__center'>Giá Bán</th>
            <th className='table__center'>Thành Tiền</th>
            <th className='table__center width_small'>Tùy chọn</th>
        </tr>
    </thead>

    // export 
    let headers = [
        { label: "Tên thuốc", key: "productName" },
        { label: "Mã Thuốc", key: "drugCode" },
        { label: "ĐVT(bán)", key: "dvt" },
        { label: "Số lượng", key: "quantityBuy" },
        { label: "Giá Bán", key: "price" },
        { label: "Thành Tiền", key: "TotalPrice" },
    ];

    // //  form modal add 
    const showModalAdd = () => {
        const { openFormActionsCreator } = props;
        const { openform } = openFormActionsCreator;
        openform()
        setTitle(`Thêm thuốc`)
        setIsModalVisible(true);
    };

    // close  form modal
    const handleCancel = () => {
        setIsModalVisible(false);
        reset()
    };

    // open button edit 
    const showModalEdit = data => {
        const { dataEditTaskActionsCreator } = props;
        const { formEdit } = dataEditTaskActionsCreator;
        formEdit(data);
        setTitle(`Sửa thuốc`);
        setIsModalVisible(true);
    }

    // handle submit form  
    const formTask = data => {
        if (typeof data._id === 'undefined') {
            const { addProductSellActionsCreator } = props;
            const { addListProductSell } = addProductSellActionsCreator;
            addListProductSell(data);
        } else {
            const { editProductActionsCreator } = props;
            const { editProductSell } = editProductActionsCreator;
            editProductSell(data);
        }
    }

    // xác nhận xóa
    function showDeleteConfirm(id) {
        const { deleteProductActionsCreator } = props;
        const { deleteProductSell } = deleteProductActionsCreator;
        confirm({
            title: 'Are you sure delete this?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteProductSell(id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // panination 
    const handlePageClick = async (data) => {
        const { showProductActionsCreator } = props;
        const { fetchProductSell } = showProductActionsCreator;
        fetchProductSell(data.selected + 1)
    };

    // lấy value để search và csv
    useEffect(() => {
        let listProdduct = JSON.parse(localStorage.getItem('sellProduct'));
        if (listProdduct) {
            setPlayerSearch(listProdduct);
            setDataTotal(listProdduct);
            handleCSV(listProdduct);
        }
    }, [showProduct]);

    // export CSV 
    const handleCSV = data =>{
        let newData = [];
        for(let value of data ){
            newData.push(
                {
                    ...value ,
                    "TotalPrice": `${value.price * value.quantityBuy}`
                }
            );
        }
        setDataCSV(newData)
    }

    const CustomerTable = () => {
        if (q !== '') {
            let value = playerSearch.filter(row =>
                removeVietnameseTones(row.productName).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                String(row.quantityBuy).trim().indexOf(q.trim()) > -1 ||
                removeVietnameseTones(row.dvt).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
                String(row.price).trim().indexOf(q.trim()) > -1 ||
                String(row.price * row.quantityBuy).trim().indexOf(q.trim()) > -1
            );
            return value.map((cust) => CustomerRow(cust));
        } else if (typeof showProduct !== 'undefined') {
            return showProduct.map((cust) => CustomerRow(cust));
        }
    }

    const onClickLink = () => {
        localStorage.removeItem('openNavbar')
        localStorage.setItem('openNavbar', false)
        history.go(returnHttp)
    }

    // taskClient form client
    const submitSell = data => {
        sellBillApi.postBill(data)
    }

    return (
        <div>
            <div className="p-x-30">
                <div className="header_content">
                    <div onClick={onClickLink} className="home__link" >Trang chủ</div>
                    <span>Danh mục bán hàng</span>
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
                        handleCancel={handleCancel}
                        handleSubmit={handleSubmit}
                        formTask={formTask}
                        history={history}
                        title={title}
                        reset={reset}
                    />
                    <Button onClick={showModalAdd} className="add__btn" variant="contained" >
                        <i className="fas fa-plus"></i>
                        <p>Thêm thuốc</p>
                    </Button>
                </div>
                <div className="table_sell pt-22">
                    <div className="content_left">
                        <Table striped bordered hover>
                            {tableHeader}
                            <tbody>
                                {CustomerTable()}
                            </tbody>
                        </Table>
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
                    <Sellclient
                        // handleSubmit={handleSubmit}
                        dataTotal={dataTotal}
                        history={history}
                        submitSell={submitSell}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        showProduct: state.staffSellListReducer.listProductSell,
        initialValues: state.staffSellListReducer.taskEditting
    };
};

const mapDispatchToProps = dispatch => ({
    showProductActionsCreator: bindActionCreators(listProductActions, dispatch),
    openFormActionsCreator: bindActionCreators(listProductActions, dispatch),
    addProductSellActionsCreator: bindActionCreators(listProductActions, dispatch),
    deleteProductActionsCreator: bindActionCreators(listProductActions, dispatch),
    editProductActionsCreator: bindActionCreators(listProductActions, dispatch),
    dataEditTaskActionsCreator: bindActionCreators(listProductActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = 'TASK_PRODUCT_NHANVIEN';

const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate,
    enableReinitialize: true // dùng để xóa initialize của từng Field khi đóng form
})

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    withReduxForm,
)(Sell);
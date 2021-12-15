// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators, compose } from 'redux';
// import Table from 'react-bootstrap/Table';
// import ReactPaginate from 'react-paginate';
// import axios from 'axios';
// import { removeVietnameseTones } from '../../../commons/vietnam';
// import { Button } from '@mui/material';
// import FormModal from './form';
// import { Input, Modal } from 'antd';
// import { reduxForm } from 'redux-form';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
// import * as listProductActions from './../../../actions/QuanLi/thuoctrongkho';
// import * as listProductApi from './../../../apis/QuanLi/thuoctrongkho';
// import validate from './../../../commons/Validate/validateFormProduct';
// import { CSVLink } from 'react-csv';
// import { formatCash } from './../../../commons/VND';

// const { confirm } = Modal;

// const http = "http://localhost:8080/api/manager/medicineinstock";
// const loadHttp = '/manager/medicineinstock';
// const returnHttp = '/manager/';

// function ThuocTrongKho(props) {
//     const { history, handleSubmit, showProduct , reset } = props;

//     const [pageCount, setpageCount] = useState(0);
//     const [playerSearch, setPlayerSearch] = useState([]);
//     const [q, setQ] = useState('');
//     const [title, setTitle] = useState('');
//     const [dataCSV, setDataCSV] = useState([]);
//     const [pagination, setPagination] = useState('');

//     const fileName = 'Table Thuốc Trong Kho';
//     let limit = 10;
//     // form add
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     //  form modal add 
//     const showModalAdd = () => {
//         const { openFormActionsCreator } = props;
//         const { openform } = openFormActionsCreator;
//         openform()
//         setTitle(`Thêm thuốc`)
//         setIsModalVisible(true);
//     };

//     // close  form modal
//     const handleCancel = () => {
//         setIsModalVisible(false);
//         reset()
//     };

//     // show data
//     useEffect(() => {
//         let page = 1;
//         listProductApi.getProduct().then(res => {
//             const { data } = res;
//             setpageCount(Math.ceil(data.length / limit));
//             setPagination(data.length)
//         })
//         const { showProductActionsCreator } = props;
//         const { fetchProductRequest } = showProductActionsCreator;
//         fetchProductRequest(page)
//     }, []);

//     // open button edit 
//     const showModalEdit = data => {
//         const { dataEditTaskActionsCreator } = props;
//         const { editProduct } = dataEditTaskActionsCreator;
//         editProduct(data);
//         setTitle(`Sửa Thuốc`)
//         setIsModalVisible(true)
//     }

//     //show table
//     const CustomerRow = (customer, index) => {
//         return (
//             <tr key={index} className='even'>
//                 <td className='table__center'> {index + 1} </td>
//                 <td>{customer.productName}</td>
//                 <td>{customer.drugCode}</td>
//                 <td>{customer.dvt}</td>
//                 <td className='table__end'>{customer.expiryDate.split('-').reverse().join('/')}</td>
//                 <td className='table__end'>{customer.quantity}</td>
//                 <td className='table__end'>{formatCash(String(customer.importPrices))}đ</td>
//                 <td className='table__end'>{formatCash(String(customer.price))}đ</td>
//                 <td className='table__end'>{formatCash(String(Number(customer.importPrices) * Number(customer.quantity)))}đ</td>
//                 <td className='table__end'>{formatCash(String(Number(customer.price) * Number(customer.quantity)))}đ</td>
//                 <td>
//                     <div className='table__handle'>
//                         <Button onClick={() => showModalEdit(customer)} variant="contained" color="success">
//                             <i class="fas fa-edit"></i>
//                         </Button>
//                         <Button onClick={() => showDeleteConfirm(customer._id)} variant="contained" color="error">
//                             <i class="fas fa-trash-alt"></i>
//                         </Button>
//                     </div>
//                 </td>
//             </tr>
//         )
//     }

//     const tableHeader = <thead className='bgvi'>
//         <tr>
//             <th className='table__center'>#</th>
//             <th className='table__center'>Tên thuốc</th>
//             <th className='table__center'>Mã Thuốc</th>
//             <th className='table__center'>ĐVT (bán)</th>
//             <th className='table__center'>Hạn sử dụng</th>
//             <th className='table__center'>Số lượng</th>
//             <th className='table__center'>Giá Nhập</th>
//             <th className='table__center'>Giá Bán</th>
//             <th className='table__center'>Tổng tiền nhập</th>
//             <th className='table__center'>Tổng tiền bán</th>
//             <th className='table__center width_small'>Tùy chọn</th>
//         </tr>
//     </thead>

//     // panination 
//     const handlePageClick = data => {
//         const { showProductActionsCreator } = props;
//         const { fetchProductRequest } = showProductActionsCreator;
//         fetchProductRequest(data.selected + 1)
//     };

//     // lấy value để search
//     useEffect(() => {
//         axios.get(http).then(res => {
//             let { data } = res;
//             setPlayerSearch(data);
//             handleCSV(data);
//         });
//     }, [])

//     // export CSV 
//     const handleCSV = data =>{
//         let newData = [];
//         for(let value of data ){
//             newData.push(
//                 {
//                     ...value ,
//                     "TotalImportPrices": `${value.importPrices * value.quantity}`,
//                     "TotalPrice": `${value.price * value.quantity}`
//                 }
//             );
//         }
//         setDataCSV(newData)
//     }

//     //search table
//     const CustomerTable = () => {
//         if (q !== '') {
//             let value = playerSearch.filter(row =>
//                 // String(row.id).trim().indexOf(q.trim()) > -1 ||
//                 removeVietnameseTones(row.productName).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
//                 row.drugCode.toLowerCase().trim().indexOf(q.toLowerCase().trim()) > -1 ||
//                 String(row.quantity).trim().indexOf(q.trim()) > -1 ||
//                 removeVietnameseTones(row.dvt).toLowerCase().trim().indexOf(removeVietnameseTones(q.toLowerCase().trim())) > -1 ||
//                 row.expiryDate.toLowerCase().trim().indexOf(q.toLowerCase().trim()) > -1 ||
//                 String(row.importPrices).trim().indexOf(q.trim()) > -1 ||
//                 String(row.price).trim().indexOf(q.trim()) > -1 ||
//                 String(row.price * row.quantity).trim().indexOf(q.trim()) > -1 ||
//                 String(row.importPrices * row.quantity).trim().indexOf(q.trim()) > -1
//             );
//             return value.map((cust, index) => CustomerRow(cust, index));
//         } else if (typeof showProduct !== 'undefined') {
//             return showProduct.map((cust, index) => CustomerRow(cust, index));
//         }
//     }

//     // return trang chu
//     const onClickLink = () => {
//         localStorage.removeItem('openNavbar')
//         localStorage.setItem('openNavbar', false)
//         history.push(returnHttp)
//     }

//     // handle submit form 
//     const formTask = (data) => {
//         if (typeof data._id === 'undefined') {
//             const { addProductActionsCreator } = props;
//             const { addListProductRequest } = addProductActionsCreator;
//             addListProductRequest(data);
//         } else {
//             const { editProductActionsCreator } = props;
//             const { editProductRequest } = editProductActionsCreator;
//             editProductRequest(data);
//         }
//     }

//     // xác nhận xóa
//     function showDeleteConfirm(id) {
//         const { deleteProductActionsCreator } = props;
//         const { deleteProductRequest } = deleteProductActionsCreator;
//         confirm({
//             title: 'Are you sure delete this?',
//             icon: <ExclamationCircleOutlined />,
//             content: '',
//             okText: 'Yes',
//             okType: 'danger',
//             cancelText: 'No',
//             onOk() {
//                 deleteProductRequest(id)
//                 setTimeout(
//                     history.go(loadHttp), 1000
//                 )
//             },
//             onCancel() {
//                 console.log('Cancel');
//             },
//         });
//     }

//     // export 
//     let headers = [
//         { label: "Tên thuốc", key: "productName" },
//         { label: "Mã thuốc", key: "drugCode" },
//         { label: "ĐVT(bán)", key: "dvt" },
//         { label: "Hạn sử dụng", key: "expiryDate" },
//         { label: "Số lượng", key: "quantity" },
//         { label: "Giá Nhập", key: "importPrices" },
//         { label: "Giá Bán", key: "price" },
//         { label: "Tổng tiền nhập", key: "TotalImportPrices" },
//         { label: "Tổng tiền bán", key: "TotalPrice" },
//     ];

//     return (
//         <div>
//             <div className="p-x-30">
//                 <div className="header_content">
//                     <div onClick={onClickLink} className="home__link" >Trang chủ</div>
//                     <span>Thuốc trong kho</span>
//                 </div>
//             </div>
//             <div className="content p-y-10 p-x-30">
//                 <div className="handle__task">
//                     <div className="search__input">
//                         <Input value={q} onChange={(e) => setQ(e.target.value)} className="input" name="search_thuoc" type="text" placeholder="Nhập từ khóa cần tìm" />
//                         <Button variant="contained" color="success">
//                             <i className="fas fa-file-excel"></i>
//                             <CSVLink
//                                 className='add_excel'
//                                 data={dataCSV}
//                                 headers={headers}
//                                 filename={fileName}>Excel
//                             </CSVLink>
//                         </Button>
//                     </div>
//                     <FormModal
//                         isModalVisible={isModalVisible}
//                         showModal={showModalAdd}
//                         handleCancel={handleCancel}
//                         handleSubmit={handleSubmit}
//                         formTask={formTask}
//                         history={history}
//                         title={title}
//                         reset={reset}
//                     />
//                     <Button onClick={showModalAdd} className="add__btn" variant="contained" >
//                         <i className="fas fa-plus"></i>
//                         <p>Thêm Thuốc</p>
//                     </Button>
//                 </div>
//                 <div className="pt-22 pb-40">
//                     <div className="table__inner">
//                         <div className="header__table">
//                             <i className="fas fa-bars"></i>
//                             <span>Thuốc trong kho</span>
//                         </div>
//                         <div className="table__content">
//                             <Table striped bordered hover>
//                                 {tableHeader}
//                                 <tbody>
//                                     {CustomerTable()}
//                                 </tbody>
//                             </Table>
//                         </div>
//                     </div>
//                 </div>
//                 {
//                     pagination > 10 ?
//                         (<ReactPaginate
//                             previousLabel={"previous"}
//                             nextLabel={"next"}
//                             breakLabel={"..."}
//                             pageCount={pageCount}
//                             marginPagesDisplayed={2}
//                             pageRangeDisplayed={3}
//                             onPageChange={handlePageClick}
//                             containerClassName={"pagination justify-content-center"}
//                             pageClassName={"page-item"}
//                             pageLinkClassName={"page-link"}
//                             previousClassName={"page-item"}
//                             previousLinkClassName={"page-link"}
//                             nextClassName={"page-item"}
//                             nextLinkClassName={"page-link"}
//                             breakClassName={"page-item"}
//                             breakLinkClassName={"page-link"}
//                             activeClassName={"active"}
//                         />
//                         )
//                         : ''
//                 }
//             </div>
//         </div>
//     )
// }

// const mapStateToProps = state => {
//     return {
//         showProduct: state.manageListProductReducer.listProduct,
//         initialValues: state.manageListProductReducer.taskEditting
//     };
// };

// const mapDispatchToProps = dispatch => ({
//     showProductActionsCreator: bindActionCreators(listProductActions, dispatch),
//     addProductActionsCreator: bindActionCreators(listProductActions, dispatch),
//     openFormActionsCreator: bindActionCreators(listProductActions, dispatch),
//     deleteProductActionsCreator: bindActionCreators(listProductActions, dispatch),
//     editProductActionsCreator: bindActionCreators(listProductActions, dispatch),
//     dataEditTaskActionsCreator: bindActionCreators(listProductActions, dispatch),
// });

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const FORM_NAME = 'TASK_PRODUCT_MANAGER';

// const withReduxForm = reduxForm({
//     form: FORM_NAME,
//     validate,
//     enableReinitialize: true // dùng để xóa initialize của từng Field khi đóng form
// })

// export default compose(
//     // withStyles(styles),
//     withConnect,  // phải trước Redux-Form
//     withReduxForm,
// )(ThuocTrongKho);
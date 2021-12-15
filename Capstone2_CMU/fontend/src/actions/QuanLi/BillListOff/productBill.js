import * as productBillConstants from '../../../contants/QuanLi/billListOff/productBill';
import * as listBillApi from './../../../apis/QuanLi/billListOff';

let perPage = 10;

// load data
export const fetchProcutBillRequest = (id  , page) => { 
	return dispatch => {
		let start = (page - 1) * perPage;
		let end = page * perPage;
		listBillApi.getBillID(id).then( res =>{
			const { data } = res;
			dispatch(BillProductPagination(data.listProduct.slice(start , end)));
			dispatch(fetchBillProductSuccess(data));
			dispatch(BillProductSearch(data.listProduct));
		} )
	}
};

export const fetchBillProductSuccess = (data) => {
	return {
		type: productBillConstants.SHOW_PRODUCT_BILL_OFF_SUCCESS,
		payload: {
			data,
		}
	}
};

export const fetchBillProductFail = error => {
	return {
		type: productBillConstants.SHOW_PRODUCT_BILL_OFF_FAIL,
		payload: {
			error
		}
	}
};

// product pagination
export const BillProductPagination = (data) => {
	return {
		type: productBillConstants.BILL_PRODUCT_PAGINATION,
		payload: {
			data,
		}
	}
};

// value search
export const BillProductSearch = (data) => {
	return {
		type: productBillConstants.BILL_PRODUCT_SEARCH,
		payload: {
			data,
		}
	}
};


// delete product 
export const deleteBillProductRequest = (id_user , id_product) => {
	console.log(id_user , id_product);
	return dispatch => {
        listBillApi.deleteProduct(id_user , id_product)
	}
};

// edit product
export const editProductRequest = (id ,data) => {
	console.log(id , data);
	return dispatch => {
        listBillApi.putBillProduct(id , data);
	}
};

// edit  product push form  
export const editProduct = data => {
	return {
		type: productBillConstants.EDIT_PRODUCT,
		payload: {
			data
		}
	}
};

import * as productConstants from '../../../contants/NhanVien/BillListOnlline/productBill';

let perPage = 10;

// load data
export const fetchProductLBillRequest =  page => { 
	return dispatch => {
		let start = (page - 1) * perPage;
		let end = page * perPage;
		let newData = JSON.parse(localStorage.getItem('showBillProductOnline')) ;
		newData ? dispatch(fetchBillProductSuccess(newData.listProduct.slice(start,end))) : dispatch(fetchBillProductSuccess([]));
	}
};

export const fetchBillProductSuccess = (data) => {
	return {
		type: productConstants.SHOW_PRODUCT_BILL_ONLINE_SUCCESS,
		payload: {
			data,
		}
	}
};

export const fetchBillProductFail = error => {
	return {
		type: productConstants.SHOW_PRODUCT_BILL_ONLINE_FAIL,
		payload: {
			error
		}
	}
};
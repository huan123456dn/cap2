import * as listBillApi from './../../../apis/QuanLi/billListOff';
import * as billConstants from '../../../contants/QuanLi/billListOff/billList';

let perPage = 10;

// load data
export const fetchBillListRequest = page => {
	return dispatch => {
		let start = (page - 1) * perPage;
		let end = page * perPage;
		listBillApi.getBill().then(res => {
			const { data } = res;
			dispatch(fetchBillListSuccess(data.reverse().slice(start, end)));
		}).catch(error => {
			dispatch(fetchBillListFail(error));
		})

	}
};

export const fetchBillListSuccess = (data) => {
	return {
		type: billConstants.SHOW_BILL_LIST_OFF_SUCCESS,
		payload: {
			data,
		}
	}
};

export const fetchBillListFail = error => {
	return {
		type: billConstants.SHOW_BILL_LIST_OFF_FAIL,
		payload: {
			error
		}
	}
};

// delete bill 
export const deleteBillRequest = id => {
	return dispatch => {
		listBillApi.deleteBill(id)
	}
};

// edit Bill
export const editBillRequest = data => {
	return dispatch => {
		listBillApi.editBill(data._id, data)
	}
};

// edit Bill 
export const editBill = data => {
	console.log(data, 'ac');
	return {
		type: billConstants.EDIT_BILL_OFF,
		payload: {
			data
		}
	}
};

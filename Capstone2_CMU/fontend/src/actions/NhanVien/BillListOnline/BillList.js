import * as listProductApi from '../../../apis/NhanVien/billListOnline';
import * as productConstants from '../../../contants/NhanVien/BillListOnlline/billList';

let perPage = 10;

// load data
export const fetchBillRequest = page => {
	return dispatch => {
		let start = (page - 1) * perPage;
		let end = page * perPage;
		listProductApi.getProduct().then(resp => {
			const { data } = resp;
			dispatch(fetchBillListSuccess(data.reverse().slice(start, end) ));
		}).catch(error => {
			dispatch(fetchBillListFail(error));
		})
		
	}
};

export const fetchBillListSuccess = (data ) => {
	return {
		type: productConstants.SHOW_BILL_LIST_ONLINE_SUCCESS,
		payload: {
			data,
		}
	}
};

export const fetchBillListFail = error => {
	return {
		type: productConstants.SHOW_BILL_LIST_ONLINE_FAIL,
		payload: {
			error
		}
	}
};
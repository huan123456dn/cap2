import * as listProductApi from './../../apis/NhanVien/thuocsaphethan';
import * as productConstants from '../../contants/NhanVien/thuocsaphethan';

let perPage = 10;

// load data
export const fetchProductRequest = page => { 
	return dispatch => {
		let start = (page - 1 ) *perPage;
		let end =page * perPage;
		listProductApi.getListProduct().then(resp => {
			const { data } = resp;
			dispatch(fetchListProductSuccess(data.slice(start , end) ));
		}).catch(error => {
			dispatch(fetchListProductFail(error));
		})
		
	}
};

export const fetchListProductSuccess = data => {
	return {
		type: productConstants.SHOW_PRODUCT_DATE_SUCCESS,
		payload: {
			data,
		}
	}
};

export const fetchListProductFail = error => {
	return {
		type: productConstants.SHOW_PRODUCT_DATE_FAIL,
		payload: {
			error
		}
	}
};

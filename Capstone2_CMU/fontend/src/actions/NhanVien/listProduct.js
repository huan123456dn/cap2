import * as listProductApi from './../../apis/NhanVien/listProduct';
import * as productConstants from '../../contants/NhanVien/listProduct';

let perPage = 10;

// load data
export const fetchProductRequest = page => { 
	return dispatch => {
		let start = (page - 1 ) *perPage;
		let end =page * perPage;

		listProductApi.getProduct().then(resp => {
			const { data } = resp;
			dispatch(fetchListProductSuccess(data.reverse().slice(start , end) ));
		}).catch(error => {
			dispatch(fetchListProductFail(error));
		})
		
	}
};

export const fetchListProductSuccess = data => {
	return {
		type: productConstants.SHOW_PRODUCT_SUCCESS,
		payload: {
			data,
		}
	}
};

export const fetchListProductFail = error => {
	return {
		type: productConstants.SHOW_PRODUCT_FAIL,
		payload: {
			error
		}
	}
};

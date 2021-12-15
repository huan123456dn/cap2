import * as listProductApi from './../../apis/NhanVien/thuocsaphethang';
import * as productConstants from '../../contants/NhanVien/thuocsaphethang';

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
		type: productConstants.SHOW_PRODUCT_QUANTITY_SUCCESS,
		payload: {
			data,
		}
	}
};

export const fetchListProductFail = error => {
	return {
		type: productConstants.SHOW_PRODUCT_QUANTITY_FAIL,
		payload: {
			error
		}
	}
};

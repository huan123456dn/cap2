import * as productApi from './../../apis/User/product';
import * as productConstants from '../../contants/User/product';

let perPage = 20;
// load data
export const fetchListProductRequest = (page) => {
	return dispatch => {
		if (page) {
			let start = (page - 1) * perPage;
			let end = page * perPage;
			productApi.getShowProduct().then(resp => {
				const { data } = resp;
				dispatch(fetchListProductSuccess(data.reverse().slice(start, end)));
			}).catch(error => {
				dispatch(fetchListProductFail(error));
			})
		} 
		else {
			productApi.getShowProduct().then(resp => {
				const { data } = resp;
				dispatch(fetchListProductSuccess(data.reverse()));
			}).catch(error => {
				dispatch(fetchListProductFail(error));
			})
		}
	}
};

export const fetchListProductSuccess = (data, total = 0) => {
	return {
		type: productConstants.FETCH_PRODUCT_SUCCESS,
		payload: {
			data,
			total
		}
	}
};

export const fetchListProductFail = error => {
	return {
		type: productConstants.FETCH_PRODUCT_FAILED,
		payload: {
			error
		}
	}
};

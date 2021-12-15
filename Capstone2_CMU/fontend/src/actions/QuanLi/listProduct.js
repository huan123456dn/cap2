import * as listProductApi from './../../apis/QuanLi/listProduct';
import * as productConstants from '../../contants/QuanLi/listProduct';

let perPage = 10;

// load data
export const fetchProductRequest =  page => { 
	return dispatch => {
		let start = (page - 1 ) *perPage;
		let end =page * perPage;
		listProductApi.getProduct().then(resp => {
			const { data } = resp;
			dispatch(fetchBillProductSuccess(data.reverse().slice(start, end) ));
		}).catch(error => {
			dispatch(fetchBillProductFail(error));
		})
		
	}
};

export const fetchBillProductSuccess = data => {
	return {
		type: productConstants.SHOW_PRODUCT_SUCCESS,
		payload: {
			data,
		}
	}
};

export const fetchBillProductFail = error => {
	return {
		type: productConstants.SHOW_PRODUCT_FAIL,
		payload: {
			error
		}
	}
};

// open form add 
export const openform = () => {
	return {
		type: productConstants.OPEN_FORM,
	}
};

// add product 
export const addListProductRequest = data => {
	return dispatch => {
        listProductApi.postListProduct(data)
	}
};

// delete product 
export const deleteProductRequest = id => {
	return dispatch => {
        listProductApi.deleteProduct(id)
	}
};

// edit product
export const editProductRequest = data => {
	return dispatch => {
        listProductApi.editProduct(data._id, data)
	}
};

// edit product 
export const editProduct = data => {
	return {
		type: productConstants.EDIT_PRODUCT,
		payload: {
			data
		}
	}
};

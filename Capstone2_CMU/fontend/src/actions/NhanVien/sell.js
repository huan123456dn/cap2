import * as productConstants from '../../contants/NhanVien/sell';
import { findProductIdJson, findProductJson } from './../../helpers/findIdProduct';
import { genreteId } from './../../commons/CreateID'

let perPage = 10;

// load data
export const fetchProductSell = page => {
	return dispatch => {
		let start = (page - 1 ) *perPage;
		let end =page * perPage;

		let pevProduct = JSON.parse(localStorage.getItem('sellProduct'));
		if (pevProduct) {
			dispatch(fetchSellProductSuccess(pevProduct.slice(start , end)));
		}
	}
};

export const fetchSellProductSuccess = data => {
	return {
		type: productConstants.SHOW_PRODUCT_SELL_SUCCESS,
		payload: {
			data,
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
export const addListProductSell = product => {
	return dispatch => {
		let pevProduct = JSON.parse(localStorage.getItem('sellProduct'));
		let newProduct = {
			...product, _id: genreteId()
		}
		pevProduct === null
			? localStorage.setItem("sellProduct", JSON.stringify([newProduct]))
			: localStorage.setItem("sellProduct", JSON.stringify([newProduct, ...pevProduct]));
		dispatch(addProduct(newProduct));
	}
};

// add product
export const addProduct = data => {
	return {
		type: productConstants.ADD_PRODUCT_SELL,
		payload: {
			data
		}
	}
};

// delete product 
export const deleteProductSell = id => {
	return dispatch => {
		let pevProduct = JSON.parse(localStorage.getItem('sellProduct'));
		let index = findProductIdJson(pevProduct, id);
		localStorage.setItem("sellProduct", JSON.stringify([
			...pevProduct.slice(0, index),
			...pevProduct.slice(index + 1),
		]));
		dispatch(deleteProduct(id));
	}
};

//  delete product 
export const deleteProduct = id => {
	return {
		type: productConstants.DELETE_PRODUCT_SELL,
		payload: {
			id
		}
	}
};

// edit product
export const editProductSell = product => {
	return dispatch => {
		let pevProduct = JSON.parse(localStorage.getItem('sellProduct'));
		let index = findProductJson(pevProduct, product);
		localStorage.setItem("sellProduct", JSON.stringify([
			...pevProduct.slice(0, index),
			{
				...product
			},
			...pevProduct.slice(index + 1),
		]));
		dispatch(editProduct(product));
	}
};

//  edit product 
export const editProduct = product => {
	return {
		type: productConstants.EDIT_PRODUCT_SELL,
		payload: {
			product
		}
	}
};

// edit product take form  
export const formEdit = data => {
	return {
		type: productConstants.FORM_EDIT,
		payload: {
			data
		}
	}
};


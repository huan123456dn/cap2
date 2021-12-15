import * as cartConstants from '../../contants/User/cart';
import { findProduct , findProductID } from './../../helpers/findIdProduct';

// load data
export const fetchLisctCartRequest = () => {
	return dispatch => {
		let pevProduct = JSON.parse(localStorage.getItem('product'));
		if(pevProduct) {
			dispatch(fetchListProductCartSuccess(pevProduct));
		}
	}
};

export const fetchListProductCartSuccess = data => {
	return {
		type: cartConstants.FETCH_PRODUCT_CART_SUCCESS,
		payload: {
			data
		}
	}
};

// Add to cart request
export const AddProductCartRequest = (product, quantity) => {
	return dispatch => {
		let pevProduct = JSON.parse(localStorage.getItem('product'));
		if (pevProduct === null) {
			localStorage.setItem("product", JSON.stringify([{ ...product, quantityBuy: quantity }]));
			dispatch(AddToCartPost({ ...product, quantityBuy: quantity }));
		}
		else {
			let index = findProduct(pevProduct, product);
			if (index !== -1) {
				let quantityBuy = pevProduct[index].quantityBuy + quantity;
				localStorage.setItem("product", JSON.stringify([
					...pevProduct.slice(0, index),
					{
						...pevProduct[index],
						quantityBuy
					},
					...pevProduct.slice(index + 1),
				]));
				dispatch(actAddToCartPut({ ...product,quantityBuy }));
			}
			if (index === -1) {
				localStorage.setItem("product", JSON.stringify([
					{
						...product,
						quantityBuy: quantity
					},
					...pevProduct,
				]));
				dispatch(AddToCartPost({ ...product, quantityBuy: quantity }));
			}
		}
	}
};

// ADD TO CART POST
export const AddToCartPost = (data) => {
	return {
		type: cartConstants.ADD_TO_CART_POST,
		payload: {
			data
			,
		}
	} 
};

// ADD TO CART PUT
export const actAddToCartPut = (data) => {
	return {
		type: cartConstants.ADD_TO_CART_PUT,
		payload: {
			data
		}
	}
};

// delete to cart request
export const DeleteProductCartRequest = (id) => {
	return dispatch => {
		let pevProduct = JSON.parse(localStorage.getItem('product'));
		let index = findProductID(pevProduct, id);
		localStorage.setItem("product", JSON.stringify([
			...pevProduct.slice(0, index),
			...pevProduct.slice(index + 1),
		]));
		dispatch(deleteProductCart(id));
	}
};

// update to cart 
export const deleteProductCart = (id) => {
	return {
		type: cartConstants.DELETE_TO_CART,
		payload: {
			id,
		}
	}
};

// update to cart request
export const updateProductCartRequest = (product, quantity) => {
	return dispatch => {
		let pevProduct = JSON.parse(localStorage.getItem('product'));
		let index = findProduct(pevProduct, product);
		localStorage.setItem("product", JSON.stringify([
			...pevProduct.slice(0, index),
			{
				...pevProduct[index],
				quantityBuy :quantity
			},
			...pevProduct.slice(index +1),
		]));
		let data = {
			...product,
			quantityBuy: quantity
		}
		dispatch(updateProductCart(data));
	}
};

// update to cart 
export const updateProductCart = (data) => {
	return {
		type: cartConstants.UPDATE_TO_CART,
		payload: {
			data
			,
		}
	}
};

export const completeDeleteCart = () => {
	return {
		type: cartConstants.COMPLETE_DELETE_CART
	}
};
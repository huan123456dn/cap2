import * as billConstants from '../../contants/User/billComplete';
import * as billApi from './../../apis/User/bill';

let id_user = "213123123";

let perPage = 10;

// load data
export const fetchBillProductRequest = page => {
	let start = (page - 1) * perPage;
	let end = page * perPage;
	return dispatch => {
		billApi.getBillProduct(id_user).then(resp => {
			const { data } = resp;
			if(data){
				dispatch(fetchBillProductSuccess(data.listProduct.reverse().slice(start, end)));
			}
		}).catch(error => {
			dispatch(fetchBillProductFail(error));
		})
	}
};

export const fetchBillProductSuccess = data => {
	return {
		type: billConstants.FETCH_PRODUCT_BILL_SUCCESS,
		payload: {
			data
		}
	}
};

export const fetchBillProductFail = error => {
	return {
		type: billConstants.FETCH_PRODUCT_BILL_FAILED,
		payload: {
			error
		}
	}
};		

// // // delete to cart 
// export const DeleteProductCart = (id) => {
// 	return {
// 		type: cartConstants.DELETE_TO_CART,
// 		payload: {
// 			id
// 		}
// 	}
// };

// // để cho store về rổng
// export const fetchBillProduct = () => {
// 	return {
// 		type: billConstants.FETCH_PRODUCT_BILL,
// 	}
// };



// hủy sản phẩm
export const putBillProductRequest = ( id ) => {
	return dispatch => {
		billApi.putBillProduct(id_user , id);
		dispatch(putBillProduct(id));
	}
};

export const putBillProduct = id => {
	return {
		type: billConstants.DELETE_PRODUCT_BILL,
		payload: {
			id
		}
	}
};


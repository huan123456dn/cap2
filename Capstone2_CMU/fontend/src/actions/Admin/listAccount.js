import * as listAccountApi from './../../apis/Admin/listAccount';
import * as accountConstants from '../../contants/Admin/listAccount';

let perPage = 10;

// load data
export const fetchAccountRequest = page => { 
	return dispatch => {
		let start = (page - 1 ) *perPage;
		let end =page * perPage;
		listAccountApi.getAccount().then(resp => {
			const { data } = resp;
			dispatch(fetchAccountSuccess(data.reverse().slice(start, end) ));
		}).catch(error => {
			dispatch(fetchAccountFail(error));
		})
		
	}
};

export const fetchAccountSuccess = data => {
	return {
		type: accountConstants.SHOW_ACCOUNT_SUCCESS,
		payload: {
			data,
		}
	}
};

export const fetchAccountFail = error => {
	return {
		type: accountConstants.SHOW_ACCOUNT_FAIL,
		payload: {
			error
		}
	}
};

// open form add 
export const openform = () => {
	return {
		type: accountConstants.OPEN_FORM,
	}
};

// add product 
export const addListAccountRequest = data => {
	return dispatch => {
        listAccountApi.postListAccount(data)
	}
};

// delete product 
export const deleteAccountRequest = id => {
	return dispatch => {
        listAccountApi.deleteAccount(id)
	}
};

// edit product
export const editAccountRequest = data => {
	return dispatch => {
        listAccountApi.editAccount(data._id, data)
	}
};

// edit product  load form
export const editAccount = data => {
	return {
		type: accountConstants.EDIT_ACCOUNT,
		payload: {
			data
		}
	}
};

import * as listBranchApi from './../../apis/Admin/branch';
import * as BranchConstants from '../../contants/Admin/branch';

let perPage = 10;
// load data
export const fetchBranchRequest =  (page) => { 
	return dispatch => {
		let start = (page - 1 ) *perPage;
		let end =page * perPage; 
		listBranchApi.getBranch().then(resp => {
			const { data } = resp;
			dispatch(fetchBranchSuccess(data.reverse().slice(start,end ) ));
		}).catch(error => {
			dispatch(fetchBranchFail(error));
		})
		
	}
};

export const fetchBranchSuccess = data => {
	return {
		type: BranchConstants.SHOW_BRANCH_SUCCESS,
		payload: {
			data
		}
	}
};

export const fetchBranchFail = error => {
	return {
		type: BranchConstants.SHOW_BRANCH_FAIL,
		payload: {
			error
		}
	}
};

// open form add 
export const openform = () => {
	return {
		type: BranchConstants.OPEN_FORM,
	}
};

// add product 
export const addListBranchRequest = data => {
	return dispatch => {
        listBranchApi.postListBranch(data)
	}
};

// delete product 
export const deleteBranchRequest = id => {
	return dispatch => {
        listBranchApi.deleteBranch(id)
	}
};

// edit product
export const editBranchRequest = data => {
	return dispatch => {
        listBranchApi.editBranch(data._id, data)
	}
};

// edit product 
export const editBranch = data => {
	return {
		type: BranchConstants.EDIT_BRANCH,
		payload: {
			data
		}
	}
};

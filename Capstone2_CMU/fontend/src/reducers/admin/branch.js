import * as types from './../../contants/Admin/branch';
import * as message from './../../helpers/index';

const initialState = {
    listBranch: [],
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_BRANCH: {
            return {
                ...state
            }
        }
        case types.SHOW_BRANCH_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                listBranch: data,
            }
        }
        case types.SHOW_BRANCH_FAIL: {
            const { error } = action.payload;
            message.toastError(error)
            return {
                ...state,
            }
        }
        case types.OPEN_FORM: {
            return {
                ...state,
                taskEditting: null
            }
        }
        case types.EDIT_BRANCH: {
            const { data } = action.payload;
            return {
                ...state,
                taskEditting: data
            }
        }
        default:
            return state;
    }
};

export default reducers;


// ctrl + K + 0 để đóng nhanh code lại

import * as types from './../../contants/QuanLi/listAccount';
import * as message from './../../helpers/index';

const initialState = {
    listAccount: [],
    taskEditting: null
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_ACCOUNT: {
            return {
                ...state
            }
        }
        case types.SHOW_ACCOUNT_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                listAccount: data,
            }
        }
        case types.SHOW_ACCOUNT_FAIL: {
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
        case types.EDIT_ACCOUNT: {
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

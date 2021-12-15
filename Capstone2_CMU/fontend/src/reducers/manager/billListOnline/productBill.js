import * as types from '../../../contants/QuanLi/billListOnline/productBill';
import * as message from '../../../helpers';

const initialState = {
    billProduct: [],
    billProductSearch : [],
    billProductPagination: [],
    taskEditting : null
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_PRODUCT_BILL: {
            return {
                ...state
            }
        }
        case types.SHOW_PRODUCT_BILL_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                billProduct: data,
            }
        }
        case types.SHOW_PRODUCT_BILL_FAIL: {
            const { error } = action.payload;
            message.toastError(error)
            return {
                ...state,
            }
        }
        case types.BILL_PRODUCT_PAGINATION: {
            const { data } = action.payload;
            return {
                ...state,
                billProductPagination: data,
            }
        }
        case types.BILL_PRODUCT_SEARCH: {
            const { data } = action.payload;
            return {
                ...state,
                billProductSearch : data
            }
        }
        case types.EDIT_PRODUCT: {
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

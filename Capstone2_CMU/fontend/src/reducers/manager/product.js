import * as types from './../../contants/QuanLi/listProduct';
import * as message from './../../helpers/index';

const initialState = {
    listProduct: [],
    taskEditting: null
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_PRODUCT: {
            return {
                ...state
            }
        }
        case types.SHOW_PRODUCT_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                listProduct: data
            }
        }
        case types.SHOW_PRODUCT_FAIL: {
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

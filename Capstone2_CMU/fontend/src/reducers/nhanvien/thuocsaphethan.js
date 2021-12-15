import * as types from './../../contants/NhanVien/thuocsaphethan';
import * as message from './../../helpers/index';

const initialState = {
    listProduct: []
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_PRODUCT_DATE: {
            return {
                ...state
            }
        }
        case types.SHOW_PRODUCT_DATE_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                listProduct: data,
            }
        }
        case types.SHOW_PRODUCT_DATE_FAIL: {
            const { error } = action.payload;
            message.toastError(error)
            return {
                ...state,
            }
        }
        default:
            return state;
    }
};

export default reducers;


// ctrl + K + 0 để đóng nhanh code lại

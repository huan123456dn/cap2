import * as types from '../../../contants/NhanVien/BillListOnlline/productBill';
import * as message from '../../../helpers';

const initialState = {
    billProduct: []
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_PRODUCT_BILL_ONLINE: {
            return {
                ...state
            }
        }
        case types.SHOW_PRODUCT_BILL_ONLINE_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                billProduct: data,
            }
        }
        case types.SHOW_PRODUCT_BILL_ONLINE_FAIL: {
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

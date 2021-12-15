import * as types from '../../../contants/NhanVien/BillListOnlline/billList';
import * as message from '../../../helpers';

const initialState = {
    billList: []
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_BILL_LIST_ONLINE: {
            return {
                ...state
            }
        }
        case types.SHOW_BILL_LIST_ONLINE_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                billList: data,
            }
        }
        case types.SHOW_BILL_LIST_ONLINE_FAIL: {
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

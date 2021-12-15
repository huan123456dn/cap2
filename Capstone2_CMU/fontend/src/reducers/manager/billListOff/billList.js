import * as types from '../../../contants/QuanLi/billListOff/billList';
import * as message from '../../../helpers';

const initialState = {
    billList: [],
    taskEditting : null
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_BILL_LIST_OFF: {
            return {
                ...state
            }
        }
        case types.SHOW_BILL_LIST_OFF_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                billList: data,
            }
        }
        case types.SHOW_BILL_LIST_OFF_FAIL: {
            const { error } = action.payload;
            message.toastError(error)
            return {
                ...state,
            }
        }
        case types.EDIT_BILL_OFF: {
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

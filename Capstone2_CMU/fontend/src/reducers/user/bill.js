import * as types from './../../contants/User/billComplete';
import * as message from './../../helpers/index';
import { findProductID} from './../../helpers/findIdProduct';

const initialState = [];

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCT_BILL: {
            return {
                ...state
            }
        }
        case types.FETCH_PRODUCT_BILL_SUCCESS: {
            const { data } = action.payload;
            console.log('ok');
            return [...data] ;
        }
        case types.FETCH_PRODUCT_BILL_FAILED: {
            const { error } = action.payload;
            message.toastError(error)
            return {
                ...state,
            }
        }
        case types.DELETE_PRODUCT_BILL: {
            const { id } = action.payload;
            let index =-1 ;
            index = findProductID(state , id);
            message.toastError1('Xóa sản phẩm thành công !')
            if(index !== -1 ){
                state.splice(index, 1);
                return [...state];
            }
            return [...state];
        }
        default:
            return state;
    }
};

export default reducers;


// ctrl + K + 0 để đóng nhanh code lại

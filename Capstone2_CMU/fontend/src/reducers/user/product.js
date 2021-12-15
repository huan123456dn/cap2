import * as types from './../../contants/User/product';
import * as message from './../../helpers/index';

const initialState = {
    listProduct: []
};

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCT: {
            return {
                listProduct: []
            }
        }
        case types.FETCH_PRODUCT_SUCCESS: {
            const { data} = action.payload;
            return {
                ...state,
                listProduct: data,
            }
        }
        case types.FETCH_PRODUCT_FAILED: {
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

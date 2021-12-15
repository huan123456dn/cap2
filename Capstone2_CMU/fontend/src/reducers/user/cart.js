import * as types from '../../contants/User/cart';
// import * as message from './../../helpers/index';
import {findProduct} from './../../helpers/findIdProduct';

const initialState = [];

const reducers = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case types.FETCH_PRODUCT_CART: {
            return {
                ...state
            }
        }
        case types.FETCH_PRODUCT_CART_SUCCESS: {
            const { data } = action.payload;
            return data;
        }
        case types.FETCH_PRODUCT_CART_FAILED: {
            return {
                ...state,
            }
        }
        case types.ADD_TO_CART_PUT: {
            const { data } = action.payload;
            index = findProduct(state, data);
            state[index] = data
            // message.toastSuccess('Thêm vào giỏ hàng thành công !');
            return [...state]
        }
        case types.ADD_TO_CART_POST: {
            const { data } = action.payload;
            // message.toastSuccess('Thêm vào giỏ hàng thành công !');
            return [
                data,
                ...state,
            ]
        }
        case types.DELETE_TO_CART: {
            const { id } = action.payload;
            for (var i = 0; i < state.length; i++) {
                if (state[i]._id === id) {
                    index = i;
                    break;
                }
            }
            // message.toastError1('Xóa sản phẩm thành công !');
            const newList = [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
            return [...newList];
        }
        case types.UPDATE_TO_CART: {
            const { data } = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i]._id === data._id) {
                    index = i;
                    break;
                }
            }
            const newList = [
                ...state.slice(0, index),
                data,
                ...state.slice(index + 1)
            ];
            return newList;
        }
        case types.COMPLETE_DELETE_CART: {
            return [];
        }
        default:
            return state;
    }
};

export default reducers;


// ctrl + K + 0 để đóng nhanh code lại

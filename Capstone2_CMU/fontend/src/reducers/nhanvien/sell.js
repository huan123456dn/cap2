import { findProductIdJson , findProductJson } from '../../helpers/findIdProduct';
import * as types from './../../contants/NhanVien/sell';

const initialState = {
    listProductSell: [],
    taskEditting: null
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_PRODUCT_SELL: {
            return {
                ...state
            }
        }
        case types.SHOW_PRODUCT_SELL_SUCCESS: {
            const { data} = action.payload;
            return {
                ...state,
                listProductSell: data,
            }
        }
        case types.OPEN_FORM: {
            return {
                ...state,
                taskEditting: null
            }
        }
        case types.ADD_PRODUCT_SELL: {
            const { data } = action.payload;
            return {
                ...state,
                listProductSell: [data, ...state.listProductSell]
            }
        }
        case types.DELETE_PRODUCT_SELL: {
            const { id } = action.payload;
            let index = findProductIdJson(state.listProductSell, id)
            // message.toastError1('Xóa sản phẩm thành công !');
            return {
                ...state,
                listProductSell: [
                    ...state.listProductSell.slice(0, index),
                    ...state.listProductSell.slice(index + 1)
                ]
            };
        }
        case types.EDIT_PRODUCT_SELL: {
            const { product } = action.payload;
            let index = findProductJson(state.listProductSell,product );
            // message.toastError1('Xóa sản phẩm thành công !');
            return {
                ...state,
                listProductSell: [
                    ...state.listProductSell.slice(0, index),
                    product,
                    ...state.listProductSell.slice(index + 1)
                ]
            };
        }
        case types.FORM_EDIT: {
            const { data } = action.payload;
            return {
                ...state,
                taskEditting: data,
            }
        }
        default:
            return state;
    }
};

export default reducers;


// ctrl + K + 0 để đóng nhanh code lại

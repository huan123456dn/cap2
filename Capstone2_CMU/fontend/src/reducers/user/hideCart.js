import * as types from '../../contants/User/hideCart';

const initialState = false;

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.HIDE_CART: {
            return action.payload.type
        }
        default:
            return state;
    }
};

export default reducers;


// ctrl + K + 0 để đóng nhanh code lại

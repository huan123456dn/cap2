import * as types from './../../contants/User/search';

const initialState = '';

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_PRODUCT: {
            return action.keyword
        }
        default:
            return state;
    }
};

export default reducers;


// ctrl + K + 0 để đóng nhanh code lại

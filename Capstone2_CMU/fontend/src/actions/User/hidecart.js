import * as hideCartConstants from '../../contants/User/hideCart';

// để cho store về rổng
export const hideCartProductCart = (type) => {
    return {
        type: hideCartConstants.HIDE_CART,
        payload: {
            type
        }
    }
};
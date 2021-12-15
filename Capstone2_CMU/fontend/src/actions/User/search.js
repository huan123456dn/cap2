import * as searchConstants from '../../contants/User/search';

// search product
export const searchProduct = (keyword) => {
    return {
        type: searchConstants.SEARCH_PRODUCT,
        keyword
    }
};


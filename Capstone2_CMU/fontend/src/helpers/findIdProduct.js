// sản phẩm product mongoodb
export const findProduct = (cartProduct, product) => {
    var index = -1;
    if (cartProduct.length > 0) {
        for (var i = 0; i < cartProduct.length; i++) {
            if (cartProduct[i]._id === product._id) {
                index = i;
                break;
            }
        }
    }
    return index;
}

// sản phẩm product mongoodb
export const findProductID = (product, id) => {
    var index = -1;
    if (product.length > 0) {
        for (var i = 0; i < product.length; i++) {
            if (product[i]._id === id) {
                index = i;
                break;
            }
        }
    }
    return index;
}

// sản phẩm product server-json
export const findProductIdJson = (product, id) => {
    var index = -1;
    if (product.length > 0) {
        for (var i = 0; i < product.length; i++) {
            if (product[i]._id === id) {
                index = i;
                break;
            }
        }
    }
    return index;
}

// sản phẩm product  server-json
export const findProductJson = (cartProduct, product) => {
    var index = -1;
    if (cartProduct.length > 0) {
        for (var i = 0; i < cartProduct.length; i++) {
            if (cartProduct[i]._id === product._id) {
                index = i;
                break;
            }
        }
    }
    return index;
}
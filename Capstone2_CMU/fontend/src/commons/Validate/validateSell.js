const validate = values => {
    const errors = {}
    const { productName ,quantityBuy , dvt , price , drugCode } = values;

    var format = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

    if (!productName) {
        errors.productName = 'Please enter drug name';
    } else if ( productName.length < 2) {
        errors.productName = 'Greater than 2 characters ';
    } else if (productName.length > 50 ) {
        errors.productName = ' No more than 50 characters';
    } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(productName)) {
        errors.productName = 'No special characters';
    }

    if (!drugCode) {
        errors.drugCode = 'Please enter your account';
    }else if ( drugCode.length < 2) {
        errors.drugCode = 'Greater than 2 characters ';
    } else if (drugCode.length > 10 ) {
        errors.drugCode = ' No more than 10 characters';
    } else if (/\ /.test(drugCode)) {
        errors.drugCode = 'No space characters';
    } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(drugCode)) {
        errors.drugCode = 'No special characters';
    } else if (format.test(drugCode)) {
        errors.drugCode = 'No special characters';
    }

    if (!dvt) {
        errors.dvt = 'Please enter the unit of measure';
    }

    if(!quantityBuy){
        errors.quantityBuy = 'Please enter quantity'
    }else{
        if(quantityBuy && isNaN(Number(quantityBuy)) ){
            errors.quantityBuy = 'Invalid number'
        }
    }

    if(!price){
        errors.price = 'Please enter price'
    }else{
        if(price && isNaN(Number(price)) ){
            errors.price = 'Invalid number'
        }
    }

    return errors
}

export default validate;
const validate = values => {
    const errors = {}
    const { fullName, dateBuy, phoneNumber, address , productName , drugCode , quantityBuy , dvt , price } = values;

    var format = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

    if (!fullName) {
        errors.fullName = 'Please enter your name';
    } else if ( fullName.length < 2) {
        errors.fullName = 'Greater than 2 characters ';
    } else if (fullName.length > 25 ) {
        errors.fullName = ' No more than 25 characters';
    } else if (/[1234567890]/.test(fullName)) {
        errors.fullName = 'Number cannot be entered';
    } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(fullName)) {
        errors.fullName = 'No special characters';
    }

    if (!dateBuy) {
        errors.dateBuy = 'Please enter sale date';
    }

    if (!phoneNumber) {
        errors.phoneNumber = 'Please enter your phone number '
    } else if (phoneNumber.length < 9 || phoneNumber.length < 10) {
        errors.phoneNumber = 'Must have 10 digits'
    } else if (! /((09|03|07|08|05)+([1-9]{8})\b)/g.test(phoneNumber)) {
        errors.phoneNumber = 'Invalid phoneNumber must have 09,03,07,08,05'
    }

    if (!address) {
        errors.address = 'Please enter address';
    }else if(address.length < 10) {
        errors.address = 'Greater than 10 characters'
    }else if(address.length > 50) {
        errors.address = 'Greater than 50 characters'
    } else if (/[!@#$%^&*()_+\-=\[\]{}':"\\|<>\/?]/.test(address)) {
        errors.address = 'No special characters';
    }

    if (!productName) {
        errors.productName = 'Please enter drug name';
    }else if ( productName.length < 2) {
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

    if(!quantityBuy){
        errors.quantityBuy = 'Please enter price'
    }else{
        if(quantityBuy && isNaN(Number(quantityBuy)) ){
            errors.quantityBuy = 'Invalid number'
        }
    }

    if (!dvt) {
        errors.dvt = 'Please enter the unit of measure';
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
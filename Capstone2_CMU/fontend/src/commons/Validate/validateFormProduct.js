const validate = values => {
    const errors = {}
    const { productName, drugCode, img, dvt, importPrices,
        price, pack, content, quantity, expiryDate, countrySX,
        homeSX, element, support, uses , rating } = values;

    var format = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

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

    if (!rating) {
        errors.rating = 'Please choose';
    }

    if (!dvt) {
        errors.dvt = 'Please enter the unit of measure';
    }

    if (!expiryDate) {
        errors.expiryDate = 'Please enter the expiration date';
    }

    if (!img) {
        errors.img = 'Please enter an image';
    }

    if (!pack) {
        errors.pack = 'Please enter packing';
    } else if ( pack.length < 2) {
        errors.pack = 'Greater than 2 characters ';
    } else if (pack.length > 25 ) {
        errors.pack = ' No more than 25 characters';
    } else if (/[@#$%^&*_+\-=\[\]':"\\|<>\/?]/.test(pack)) {
        errors.pack = 'No special characters';
    }

    if (!content) {
        errors.content = 'Please enter the amount';
    }

    if (!content) {
        errors.content = 'Please enter your account';
    } else if ( content.length < 2) {
        errors.content = 'Greater than 2 characters ';
    } else if (content.length > 50 ) {
        errors.content = ' No more than 50 characters';
    }

    if (!countrySX) {
        errors.countrySX = 'Please enter';
    } else if ( countrySX.length < 2) {
        errors.countrySX = 'Greater than 2 characters ';
    } else if (countrySX.length > 25 ) {
        errors.countrySX = ' No more than 25 characters';
    }  else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(countrySX)) {
        errors.countrySX = 'No special characters';
    }

    if (!element) {
        errors.element = 'Please enter ingredients';
    }else if ( element.length < 2) {
        errors.element = 'Greater than 2 characters ';
    } else if (element.length > 50 ) {
        errors.element = ' No more than 50 characters';
    } 

    if (!homeSX) {
        errors.homeSX = 'Please enter manufacturer';
    } else if ( homeSX.length < 2) {
        errors.homeSX = 'Greater than 2 characters ';
    } else if (homeSX.length > 25 ) {
        errors.homeSX = ' No more than 25 characters';
    }   else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(homeSX)) {
        errors.homeSX = 'No special characters';
    }


    if (!support) {
        errors.support = 'Please enter support';
    } else if ( support.length < 2) {
        errors.support = 'Greater than 2 characters ';
    } else if (support.length > 50 ) {
        errors.support = ' No more than 50 characters';
    }

    if (!uses) {
        errors.uses = 'Please enter drug use';
    }else if ( uses.length < 2) {
        errors.uses = 'Greater than 2 characters ';
    } else if (uses.length > 50 ) {
        errors.uses = ' No more than 50 characters';
    }

    if(!importPrices){
        errors.importPrices = 'Please enter price'
    }else{
        if(importPrices && isNaN(Number(importPrices)) ){
            errors.importPrices = 'Invalid number'
        }
    }

    if(!price){
        errors.price = 'Please enter price'
    }else{
        if(price && isNaN(Number(price)) ){
            errors.price = 'Invalid number'
        }
    }

    if(!quantity){
        errors.quantity = 'Please enter price'
    }else{
        if(quantity && isNaN(Number(quantity)) ){
            errors.quantity = 'Invalid number'
        }
    }
    return errors
}

export default validate;
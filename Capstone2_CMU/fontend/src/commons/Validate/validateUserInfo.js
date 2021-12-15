const validate = values => {
    const errors = {}
    const { fullName, address ,phoneNumber , payments, from , to  } = values;

    if(!payments ){errors.payments = 'Please check'}

    if (!fullName) {
        errors.fullName = 'Please enter your name';
    }else if ( fullName.length < 2) {
        errors.fullName = 'Greater than 2 characters ';
    } else if (fullName.length > 20 ) {
        errors.fullName = ' No more than 20 characters';
    } else if (/[1234567890]/.test(fullName)) {
        errors.fullName = 'Number cannot be entered';
    } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(fullName)) {
        errors.fullName = 'No special characters';
    }

    if (!phoneNumber) {
        errors.phoneNumber = 'Please enter your phone number '
    } else if ( phoneNumber.length < 9 || phoneNumber.length < 10) {
        errors.phoneNumber = 'Must have 10 digits'
    } else if (! /((09|03|07|08|05)+([0-9]{8})\b)/g.test(phoneNumber)) {
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
    
    // validate tìm kiếm giá 
    if(from){
        if(from && isNaN(Number(from)) ){
            errors.from = 'Invalid number'
        }
    }
    
    if(to){
        if(to && isNaN(Number(to)) ){
            errors.to = 'Invalid number'
        }
    }
    
    return errors
}

export default validate;
const validate = values => {
    const errors = {}
    const { pharmacyName, action, managerName, phoneNumber, address } = values;

    if (!pharmacyName) {
        errors.pharmacyName = 'Please enter your name';
    } else if ( pharmacyName.length < 2) {
        errors.pharmacyName = 'Greater than 2 characters ';
    } else if (pharmacyName.length > 20 ) {
        errors.pharmacyName = ' No more than 20 characters';
    } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pharmacyName)) {
        errors.pharmacyName = 'No special characters';
    }

    if (!managerName) {
        errors.managerName = "Please enter the manager's name";
    }  else if ( managerName.length < 2) {
        errors.managerName = 'Greater than 2 characters ';
    } else if (managerName.length > 20 ) {
        errors.managerName = ' No more than 20 characters';
    } else if (/[1234567890]/.test(managerName)) {
        errors.managerName = 'Number cannot be entered';
    } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(managerName)) {
        errors.managerName = 'No special characters';
    }
    
    if (!action) {
        errors.action = 'Please enter status';
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
    
    return errors
}

export default validate;
const validate = values => {
    const errors = {}
    const { userName, fullName, phoneNumber, address, password } = values;

    var format = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

    if (!userName) {
        errors.userName = 'Please enter your account';
    }else if ( userName.length < 2) {
        errors.userName = 'Greater than 2 characters ';
    } else if (userName.length > 25 ) {
        errors.userName = ' No more than 25 characters';
    } else if (/\ /.test(userName)) {
        errors.userName = 'No space characters';
    } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(userName)) {
        errors.userName = 'No special characters';
    } else if (format.test(userName)) {
        errors.userName = 'No special characters';
    }

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

    // if (! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.com$/i.test(email)) {
    //     errors.email = 'Invalid email'
    // }

    if (!phoneNumber) {
        errors.phoneNumber = 'Please enter your phone number '
    } else if ( phoneNumber.length < 9 || phoneNumber.length < 10) {
        errors.phoneNumber = 'Must have 10 digits'
    } else if (! /((09|03|07|08|05)+([0-9]{8})\b)/g.test(phoneNumber)) {
        errors.phoneNumber = 'Invalid phoneNumber must have 09,03,07,08,05'
    }

    // ký tự đặt biệt đã bị thay đổi copy chú ý
    if (!address) {
        errors.address = 'Please enter address';
    }else if(address.length < 10) {
        errors.address = 'Greater than 10 characters'
    }else if(address.length > 50) {
        errors.address = 'Greater than 50 characters'
    } else if (/[!@#$%^&*()_+\-=\[\]{}':"\\|<>\/?]/.test(address)) {
        errors.address = 'No special characters';
    }

    if (!password) {
        errors.password = 'Please enter a password';
    }else if(password.length < 8) {
        errors.password = 'Greater than 8 characters'
    }else if(password.length > 25) {
        errors.password = 'No more than 20 characters'
    } 

    return errors
}

export default validate;
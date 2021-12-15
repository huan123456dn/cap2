const validate = values => {
    const errors = {}
    const { userName ,  password} = values;

    var format = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

    if (!userName) {
        errors.userName = 'Please enter your account';
    } else if(userName.length < 2) {
        errors.userName = 'Greater than 8 characters'
    }else if(userName.length > 25) {
        errors.userName = 'No more than 25 characters'
    } else if (/\ /.test(userName)) {
        errors.userName = 'No space characters';
    } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(userName)) {
        errors.userName = 'No special characters';
    } else if (format.test(userName)) {
        errors.userName = 'No special characters';
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
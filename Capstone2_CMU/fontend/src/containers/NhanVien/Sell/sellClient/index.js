import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import SellNVFormInfo from './../../../../components/Nhanvien/SellNVFormInfo';
// import validate from './../../../../commons/Validate/validateClient';
import { reduxForm } from 'redux-form';

function Sellclient(props) {
    const { history, submitSell, dataTotal, handleSubmit } = props;
    return (
        <SellNVFormInfo
            handleSubmit={handleSubmit}
            dataTotal={dataTotal}
            history={history}
            submitSell={submitSell}
        />
    )
}

const withConnect = connect(null, null);

const FORM_NAME = 'TASK_PRODUCT_NHANVIEN__CLIENT';

const withReduxForm = reduxForm({
    form: FORM_NAME,
    // validate,
    enableReinitialize: true // dùng để xóa initialize của từng Field khi đóng form
})

export default compose(
    // withStyles(styles),
    withConnect,  // phải trước Redux-Form
    withReduxForm,
)(Sellclient);

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // form redux
// user
import productReducer from './user/product';
import cartReducer from './user/cart';
import searchReducer from './user/search';
import hideCartReducer from './user/hideCart';
import billProductReducer from './user/bill';

//manage
import manageListProductReducer from './manager/product';
import manageAccountReducer from './manager/account';
import manageBillListOffReducer from './manager/billListOff/billList';
import manageProductBillOffReducer from './manager/billListOff/productBill';
import manageBillListOnlineReducer from './manager/billListOnline/billList';
import manageProductBillOnlineReducer from './manager/billListOnline/productBill';

// admin
import adminAccountReducer from './admin/account';
import adminBranchReducer from './admin/branch';

// staff
import staffProductListReducer from './nhanvien/product';
import staffProductListQuatityReducer from './nhanvien/thuocsaphethang';
import staffProductListDateReducer from './nhanvien/thuocsaphethan';
import staffSellListReducer from './nhanvien/sell';
import staffBillListOffReducer from './nhanvien/billListOff/billList';
import staffProductBillOffReducer from './nhanvien/billListOff/productBill';
import staffBillListOnlineReducer from './nhanvien/billListOnline/billList';
import staffProductBillOnlineReducer from './nhanvien/billListOnline/productBill';

import NavbarReducer from './form';

const rootReducer = combineReducers({
    form: formReducer,
    // user
    product: productReducer,
    cartReducer ,
    searchReducer ,
    hideCartReducer,
    billProductReducer,
    
    // navmenu admin staff quani
    NavbarReducer,
    
    // manage
    manageListProductReducer,
    manageAccountReducer,
    manageBillListOffReducer,
    manageProductBillOffReducer,
    manageBillListOnlineReducer,
    manageProductBillOnlineReducer,

    // staff
    staffProductListReducer,
    staffProductListQuatityReducer,
    staffProductListDateReducer,
    staffSellListReducer,
    staffBillListOffReducer,
    staffProductBillOffReducer,
    staffBillListOnlineReducer,
    staffProductBillOnlineReducer,

    // admin
    adminAccountReducer,
    adminBranchReducer
});

export default rootReducer;

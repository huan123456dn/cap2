// import qs from "query-string";
import axiosService from "./../../commons/axiosService";
import { API_ENDFOINT } from "./../../contants";

//http://localhost:8080/user/bill_list
const url = "api/user/bill_list";

//http://localhost:8080/user/bill_list method : get
export const getBillProduct = id => {
    return axiosService.get(`${API_ENDFOINT}/${url}/${id}`);
};

//http://localhost:8080/user/bill_list method : post
export const postBillProductCart = (data) => {
    return axiosService.post(`${API_ENDFOINT}/${url}` , data );
};

//http://localhost:8080/user/bill_list/id method : put
export const putBillProduct = ( id_user , id )  => {
    return axiosService.put(`${API_ENDFOINT}/${url}` , { id_user , id} );
};






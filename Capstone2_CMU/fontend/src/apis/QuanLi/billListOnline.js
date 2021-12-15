// import qs from "query-string";
import axiosService from "../../commons/axiosService";
import { API_ENDFOINT } from "../../contants";

//http://localhost:8080/api/manager/onlinebilllist
const url = "api/manager/onlinebilllist";

const urlproduct = "api/manager/onlinebilllistproduct";

//http://localhost:8080/api/manager/onlinebilllist method : get
export const getBill = () => {
    return axiosService.get(`${API_ENDFOINT}/${url}`  );
};

//http://localhost:8080/api/manager/onlinebilllist/:id method : get
export const getBillID = id => {
    return axiosService.get(`${API_ENDFOINT}/${url}/${id}` );
};

//http://localhost:8080/api/manager/onlinebilllist/id method : post
export const postBill = ( data) => {
    return axiosService.post(`${API_ENDFOINT}/${url}` , data  );
};

//http://localhost:8080/api/manager/onlinebilllist/id method : post
export const editBill = (id , data) => {
    return axiosService.put(`${API_ENDFOINT}/${url}/${id}` , data  );
};

//http://localhost:8080/api/manager/onlinebilllist/id method : delete
export const deleteBill = id => {
    return axiosService.delete(`${API_ENDFOINT}/${url}/${id}`  );
};

//http://localhost:8080/user/bill_list/id method : put
export const putBillProduct = ( id_user , data )  => {
    return axiosService.put(`${API_ENDFOINT}/${urlproduct}` , { id_user , data} );
};

//  product
//http://localhost:8080/user/bill_list/id method : put
export const deleteProduct = ( id_user , id_product)  => {
    return axiosService.put(`${API_ENDFOINT}/${urlproduct}/${id_product}` , {id_user , id_product}  );
};

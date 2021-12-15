// import qs from "query-string";
import axiosService from "./../../commons/axiosService";
import { API_ENDFOINT } from "./../../contants";

//http://localhost:8080/admin/accountmanager
const url = "api/admin/accountmanager";

//http://localhost:8080/admin/accountmanager method : get
export const getAccount = () => {
    return axiosService.get(`${API_ENDFOINT}/${url}`  );
};

//http://localhost:8080/admin/accountmanager method : post
export const postListAccount = data => {
    return axiosService.post(`${API_ENDFOINT}/${url}` , data );
};


//http://localhost:8080/admin/accountmanager/id method : post
export const editAccount = (id , data) => {
    return axiosService.put(`${API_ENDFOINT}/${url}/${id}` , data  );
};

//http://localhost:8080/admin/accountmanager/id method : delete
export const deleteAccount = id => {
    return axiosService.delete(`${API_ENDFOINT}/${url}/${id}`  );
};



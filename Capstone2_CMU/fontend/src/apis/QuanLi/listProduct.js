// import qs from "query-string";
import axiosService from "./../../commons/axiosService";
import { API_ENDFOINT } from "./../../contants";

//http://localhost:8080/manager/druglist
const url = "api/manager/druglist";

//http://localhost:8080/manager/druglist method : get
export const getProduct = () => {
    return axiosService.get(`${API_ENDFOINT}/${url}`  );
};

//http://localhost:8080/manager/druglist method : post 
export const postListProduct = data => {
    return axiosService.post(`${API_ENDFOINT}/${url}` , data );
};


//http://localhost:8080/manager/druglist/id method : post
export const editProduct = (id , data) => {
    return axiosService.put(`${API_ENDFOINT}/${url}/${id}` , data  );
};


//http://localhost:8080/manager/druglist/id method : delete
export const deleteProduct = id => {
    return axiosService.delete(`${API_ENDFOINT}/${url}/${id}`  );
};



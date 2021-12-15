// import qs from "query-string";
import axiosService from "./../../commons/axiosService";
import { API_ENDFOINT } from "./../../contants";

//http://localhost:8080/quanlichinhanh
const url = "api/admin/branchmanagement";

//http://localhost:8080/quanlichinhanh method : get
export const getBranch = () => {
    return axiosService.get(`${API_ENDFOINT}/${url}`  );
};

//http://localhost:8080/quanlichinhanh method : post
export const postListBranch = data => {
    return axiosService.post(`${API_ENDFOINT}/${url}` , data );
};


//http://localhost:8080/quanlichinhanh/id method : post
export const editBranch = (id , data) => {
    return axiosService.put(`${API_ENDFOINT}/${url}/${id}` , data  );
};

//http://localhost:8080/quanlichinhanh/id method : delete
export const deleteBranch = id => {
    return axiosService.delete(`${API_ENDFOINT}/${url}/${id}`  );
};



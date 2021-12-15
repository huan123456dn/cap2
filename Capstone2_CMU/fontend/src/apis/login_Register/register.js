// import qs from "query-string";
import axiosService from "../../commons/axiosService";
import { API_ENDFOINT } from "../../contants";

//http://localhost:8080/api/auth/register
const url = "api/auth/register";

//http://localhost:8080/api/auth/register method : post
export const postAccountUser = data => {
    return axiosService.post(`${API_ENDFOINT}/${url}` , data );
};




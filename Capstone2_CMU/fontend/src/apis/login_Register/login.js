import axiosService from "../../commons/axiosService";
import { API_ENDFOINT } from "../../contants";

//http://localhost:8080/api/auth/register
const url = "api/auth/login";

//http://localhost:8080/api/auth/register method : post
export const postUserRequest = data => {
    return axiosService.post(`${API_ENDFOINT}/${url}` , data );
};


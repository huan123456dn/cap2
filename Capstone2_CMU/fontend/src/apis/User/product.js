// import qs from "query-string";
import axiosService from "./../../commons/axiosService";
import { API_ENDFOINT } from "./../../contants";

//http://localhost:8080/user
const url = "api/user";

// //http://localhost:8080/user method : post
export const getShowProduct = () => {
    return axiosService.get(`${API_ENDFOINT}/${url}`);
};



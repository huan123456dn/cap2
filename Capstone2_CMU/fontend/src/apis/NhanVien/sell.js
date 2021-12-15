// import qs from "query-string";
import axiosService from "./../../commons/axiosService";
import { API_ENDFOINT } from "./../../contants";

//http://localhost:8080/manager/offbilllist
const url = "api/manager/offbilllist";

//http://localhost:8080//manager/offbilllist method : get
export const postBill = data => {
    return axiosService.post(`${API_ENDFOINT}/${url}` , data);
};

// import qs from "query-string";
import axiosService from "./../../commons/axiosService";
import { API_ENDFOINT } from "./../../contants";

//http://localhost:8080/api/staff/onlinebilllist
const url = "api/staff/onlinebilllist";

//http://localhost:8080/api/staff/onlinebilllist method : get
export const getProduct = () => {
    return axiosService.get(`${API_ENDFOINT}/${url}`  );
};


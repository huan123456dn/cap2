// import qs from "query-string";
import axiosService from "./../../commons/axiosService";
import { API_ENDFOINT } from "./../../contants";

//http://localhost:8080/staff/druglist
const url = "api/staff/druglist";

//http://localhost:8080/staff/druglist method : get
export const getProduct = () => {
    return axiosService.get(`${API_ENDFOINT}/${url}`  );
};





// import qs from "query-string";
import axiosService from "./../../commons/axiosService";
import { API_ENDFOINT } from "./../../contants";

//http://localhost:8080/staff/druglistquantity
const url = "api/staff/druglistquantity";

//http://localhost:8080/staff/druglistquantity method : get
export const getListProduct = () => {
    return axiosService.get(`${API_ENDFOINT}/${url}`  );
};





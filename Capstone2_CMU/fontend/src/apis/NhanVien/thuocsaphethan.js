// import qs from "query-string";
import axiosService from "./../../commons/axiosService";
import { API_ENDFOINT } from "./../../contants";

//http://localhost:8080/staff/druglistdate
const url = "api/staff/druglistdate";

//http://localhost:8080/staff/druglistdate method : get
export const getListProduct = () => {
    return axiosService.get(`${API_ENDFOINT}/${url}`  );
};





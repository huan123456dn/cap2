// import qs from "query-string";
import axiosService from "../../commons/axiosService";
import { API_ENDFOINT } from "../../contants";

//http://localhost:8080/api/staff/offbilllist
const url = "api/staff/offbilllist";

//http://localhost:8080/api/staff/offbilllist method : get
export const getProduct = () => {
    return axiosService.get(`${API_ENDFOINT}/${url}`  );
};


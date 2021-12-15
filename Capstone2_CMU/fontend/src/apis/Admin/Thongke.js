import axiosService from "./../../commons/axiosService";
import { API_ENDFOINT } from "./../../contants";

const url = 'api/statistic';

export const getThongKe = async () => {
    return await axiosService.get(`${API_ENDFOINT}/${url}`);
};

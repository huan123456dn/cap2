import axios from 'axios';

class AxiosService {
	constructor() {
		const instance = axios.create();
		instance.interceptors.response.use(this.hendleSuccess, this.hendleError()); // axios nhận ra về kết quả thành công hay thất bại
		this.instance = instance;
	}

	hendleSuccess(repont) {
		return repont;
	};

	hendleError(error) {
		// return Promise.reject(error);
		// console.log('Không có lỗi');
	};

	get(url) {
		return this.instance.get(url);
	};

	post(url, body) {
		return this.instance.post(url, body);
	};

	put(url, body) {
		return this.instance.put(url, body);
	};

	delete(url) {
		return this.instance.delete(url);
	};

};

export default new AxiosService(); // cái này gọi thì function sẽ đc gọi

import * as formContants from './../contants/index' ;

export const showForm = () => {
	return {
		type: formContants.SHOW_NAVMENU,
	}
};

export const hideForm = () => {
	return {
		type: formContants.HIDE_NAVMENU,
	}
};

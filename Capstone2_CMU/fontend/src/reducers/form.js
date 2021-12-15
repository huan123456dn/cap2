import * as formContants from '../contants';

const initialState = {
    form: true
};

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case formContants.SHOW_NAVMENU:
            return {
                form: !state.form
            };
        default:
            return state;
    }
};

export default reducers;


// ctrl + K + 0 để đóng nhanh code lại
// alt shift o để format code lại

import React , {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./commons/Theme";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import axios from 'axios';
// import "./index.css";

import Admin from './containers/Admin/App';
import Manager from './containers/Quanli/App';
import Employee from './containers/NhanVien/App';
import User from './containers/User/App';
import NotFound from './containers/NotFound';

// main
import "./assets/css/main/gird.css";
import "./assets/css/main/responsive.css";
import "./assets/css/main/root.css";

// admin-manage-nhanvien
import "./assets/css/admin_manage_nhanvien/table.css";
import "./assets/css/admin_manage_nhanvien/hearder.css";
import "./assets/css/admin_manage_nhanvien/navmenu.css";
import "./assets/css/admin_manage_nhanvien/nv_sell.css";
import "./assets/css/admin_manage_nhanvien/addForm.css";

// user
import "./assets/css/user/billComplete.css";
import "./assets/css/user/billing.css";
import "./assets/css/user/cartProduct.css";
import "./assets/css/user/footer.css";
import "./assets/css/user/header.css";
import "./assets/css/user/home.css";
import "./assets/css/user/listPosts.css";
import "./assets/css/user/listProducts.css";
import "./assets/css/user/posts.css";

// login dangky
import "./assets/css/login_dk/login.css";
import "./assets/css/login_dk/dangky.css";

import Login from './containers/Login_Reginster/login';
import Register from './containers/Login_Reginster/register';
import ForgetPassword from './containers/Login_Reginster/forgetPassword';
import ThongKeDoanhThu from './containers/Admin/ThongKeDoanhThu';

const Store = configureStore();

function App() {

    useEffect(() => {
        axios.get('http://localhost:8080/api').then(res =>{
            alert(res.data);
    });
    }, [])

    return (
        <Provider store={Store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <ToastContainer />
                    <Switch>
                        <Route path="/login" component={ ({ history }) => <Login  history={history} />} />
                        <Route path="/register" component={ ({ history }) => <Register  history={history} />} />
                        <Route path="/forgotpassword" component={ ({ history }) => <ForgetPassword  history={history} />} />
                        <Route path="/user" component={User} />
                        <Route path="/admin" component={Admin} />
                        <Route path="/manager" component={Manager} />
                        <Route path="/staff" component={Employee} />
                        <Route path="/statistic" component={ThongKeDoanhThu} />
                        <Route component={NotFound} />
                    </Switch>
                </ThemeProvider>
            </Router>
        </Provider>
    );
}

export default App;

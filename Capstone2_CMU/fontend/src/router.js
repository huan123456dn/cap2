
// admin
import QuanLiTaiKhoan from './containers/Admin/QuanLiTaiKhoan';
import QuanLiChiNhanh from './containers/Admin/QuanLiChiNhanh';

//quản lí
import BillListManagerOff from './containers/Quanli/BillListOff/BillList';
import ProductBillManagerOff from './containers/Quanli/BillListOff/ProductBill';
import BillListManagerOnline from './containers/Quanli/BillListOnline/BillList';
import ProductBillManagerOnline from './containers/Quanli/BillListOnline/ProductBill';
import DanhSachThuocQL from './containers/Quanli/DanhSachThuoc';
import QuanLiNhanVien from './containers/Quanli/QuanLiNhanVien';
// import ThuocTrongKho from './containers/Quanli/ThuocTrongKho';

// nhân viên
import DanhSachThuocNV from './containers/NhanVien/DanhSachThuoc';
import Sell from './containers/NhanVien/Sell';
import BillListOff from './containers/NhanVien/BillListOff';
import ProductBillOff from './containers/NhanVien/BillListOff/productBill';
import BillListOnl from './containers/NhanVien/BillListOnl';
import ProductBillOnl from './containers/NhanVien/BillListOnl/productBill';
import ThuocSapHetHang from './containers/NhanVien/ThuocSapHetHang';
import ThuoSapHetHan from './containers/NhanVien/ThuoSapHetHan';

// người dùng
import Home from './containers/User/Home';
import InfoProduct from './containers/User/InfoProduct';
import BuyProduct from './containers/User/Billing';
import ThucPhamChucNang from './containers/User/ThucPhamChucNang';
import ChamSocCaNhan from './containers/User/ChamSocCaNhan';
import DuocMyPham from './containers/User/DuocMyPham';
import ThietBiYTe from './containers/User/ThietBiYTe';
import BillComplete from './containers/User/BillComplete';
import ListPosts from './containers/User/ListPosts';
import Posts from './containers/User/Posts';


// // not found
// import NotFound from './containers/NotFound';

export const Admin_ROUTES = [
    {
        path: '/admin/',
        name: 'Quản lí chi nhánh',
        component: ({ match, history }) => <QuanLiChiNhanh match={match} history={history} />,
        exact: true,
    },
    {
        path: '/admin/accountmanager',
        name: 'Quản lí tài khoản',
        component: ({ match, history }) => <QuanLiTaiKhoan match={match} history={history} />,
        exact: true,
    },
    {
        path: '/admin/branchmanagement',
        name: 'Quản lí chi nhánh',
        component: ({ match, history }) => <QuanLiChiNhanh match={match} history={history} />,
        exact: true,
    }
]

export const QUANLI_ROUTES = [
    {
        path: '/manager/',
        name: 'Danh sách hóa đơn',
        exact: true,
        component: ({ match, history }) => <BillListManagerOff history={history} match={match} />
    },
    {
        path: '/manager/offbilllist',
        name: 'Danh sách hóa đơn',
        exact: true,
        component: ({ match, history }) => <BillListManagerOff history={history} match={match} />
    },
    {
        path: '/manager/offbilllist/:id',
        name: 'Danh sách hóa đơn sản phẩm',
        component: ({ match, history }) => <ProductBillManagerOff match={match} history={history} />,
        exact: true,
    },
    {
        path: '/manager/onlinebilllist',
        name: 'Danh sách hóa đơn onl',
        exact: true,
        component: ({ match, history }) => <BillListManagerOnline history={history} match={match} />
    },
    {
        path: '/manager/onlinebilllist/:id',
        name: 'Danh sách hóa đơn sản phẩm onl',
        component: ({ match, history }) => <ProductBillManagerOnline match={match} history={history} />,
        exact: true,
    },
    {
        path: '/manager/druglist',
        name: 'Danh sách thuốc',
        component: ({ match, history }) => <DanhSachThuocQL history={history} match={match} />,
        exact: true,
    },
    {
        path: '/manager/employeemanager',
        name: 'Quản lí nhân viên',
        component: ({ match, history }) => <QuanLiNhanVien history={history} match={match} />,
        exact: true,
    }
    // ,
    // {
    //     path: '/manager/medicineinstock',
    //     name: 'Thuốc trong kho',
    //     component: ({ match, history }) => <ThuocTrongKho history={history} match={match} />,
    //     exact: true,
    // }
]

export const NHANVIEN_ROUTES = [
    {
        path: '/staff/',
        name: 'Danh sách thuốc',
        exact: true,
        component: ({ match, history }) => <Sell history={history} match={match} />
    },
    {
        path: '/staff/druglist',
        name: 'Danh sách thuốc',
        exact: true,
        component: ({ match, history }) => <DanhSachThuocNV history={history} match={match} />
    },
    {
        path: '/staff/sell',
        name: 'bán hàng',
        component: ({ match, history }) => <Sell match={match} history={history} />,
        exact: true,
    },
    {
        path: '/staff/offbilllist',
        name: 'Danh sách hóa đơn',
        component: ({ match, history }) => <BillListOff match={match} history={history} />,
        exact: true,
    },
    {
        path: '/staff/offbilllist/:id',
        name: 'Danh sách hóa đơn sản phẩm off',
        component: ({ match, history }) => <ProductBillOff match={match} history={history} />,
        exact: true,
    },
    {
        path: '/staff/onlinebilllist',
        name: 'Danh sách hóa đơn',
        component: ({ match, history }) => <BillListOnl match={match} history={history} />,
        exact: true,
    },
    {
        path: '/staff/onlinebilllist/:id',
        name: 'Danh sách hóa đơn sản phẩm online',
        component: ({ match, history }) => <ProductBillOnl match={match} history={history} />,
        exact: true,
    },
    {
        path: '/staff/thuocsaphethang',
        name: 'Thuốc sắp hết hàng',
        component: ({ match, history }) => <ThuocSapHetHang match={match} history={history} />,
        exact: true,
    },
    {
        path: '/staff/thuosaphethan',
        name: 'Thuốc sắp hết hạn',
        component: ({ match, history }) => <ThuoSapHetHan match={match} history={history} />,
        exact: true,
    }
]

export const User_ROUTES = [
    {
        path: '/user/',
        name: 'Trang chủ',
        exact: true,
        component: ({ match }) => <Home match={match} />
    },
    {
        path: '/user/home',
        name: 'Trang chủ',
        exact: true,
        component: ({ match }) => <Home match={match} />
    },
    {
        path: '/user/infoproduct/:id',
        name: 'product item',
        exact: true,
        component: ({ history }) => <InfoProduct history={history} />
    },
    {
        path: '/user/buyproduct',
        name: 'product item',
        exact: true,
        component: ({ history }) => <BuyProduct history={history} />
    },
    {
        path: '/user/functionalfoods',
        name: 'Thực phẩm chức năng',
        component: ThucPhamChucNang,
        exact: true,
    },
    {
        path: '/user/personalcare',
        name: 'Chăm sóc cá nhân ',
        component: ChamSocCaNhan,
        exact: true,
    },
    {
        path: '/user/cosmetics',
        name: 'Dược mỹ phẩm',
        component: DuocMyPham,
        exact: true,
    },
    {
        path: '/user/medicalequipment',
        name: 'Thiết bị y tế',
        component: ThietBiYTe,
        exact: true,
    },
    {
        path: '/user/healthcorner',
        name: 'Góc sức khỏe',
        component: ListPosts,
        exact: true,
    },
    {
        path: '/user/healthcorner/bai1',
        name: 'bài viết',
        component: Posts,
        exact: true,
    },
    {
        path: '/user/healthcorner/bai2',
        name: 'bài viết',
        component: Posts,
        exact: true,
    },
    {
        path: '/user/billcomplete',
        name: 'Hóa đơn',
        component: ({ history, match }) => <BillComplete history={history} match={match} />,
        exact: true,
    }
]



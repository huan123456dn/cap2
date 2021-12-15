import { NavLink } from 'react-router-dom';

function Footer() {

    const list = [
        {
            'name': 'Thực phẩm chức năng',
            'to' : '/user/functionalfoods'
        },
        {
            'name': 'Dược mỹ phẩm',
            'to' : '/user/cosmetics'
        },
        {
            'name': 'Chăm sóc cá nhân',
            'to' : '/user/personalcare'
        },
        {
            'name': 'Trang thiết bị y tế',
            'to' : '/user/medicalequipment'
        },
        {
            'name': 'Góc sức khoẻ',
            'to' : '/user/healthcorner'
        }
    ];

    const renderList = () => {
        let html = null;
        html = (
            list.map((element, index) => {
                return (
                    <li className="footer_item" key={index}>
                        <NavLink to={element.to} className="footer_item--list" >
                            {
                                element.name
                            }
                        </NavLink>
                    </li>
                )
            })
        );
        return html;
    }


    return (
        <div className="footer">
            <div className="footer_content footer_title">
                <span>DANH MỤC</span>
                <ul className="footer_list">
                    {
                        renderList()
                    }
                </ul>
            </div>
            <div className="footer_content footer_phone">
                <div>
                    <span>TƯ VẤN MUA HÀNG (MIỄN PHÍ)</span>
                </div>
                <div className="phone_number">
                    <a className="phone" href="tel:1800 6928">1800 6928</a>
                </div>
            </div>
            <div className="footer_content footer_connect">
                <div>
                    <span>KẾT NỐI VỚI CHÚNG TÔI</span>
                </div>
                <div className="icon-fb">
                    <a href=".">
                        <i className="fab fa-facebook"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
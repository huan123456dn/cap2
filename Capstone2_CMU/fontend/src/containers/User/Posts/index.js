import React from 'react';

import img_1 from './../../../assets/img/baiviet/baiviet1.jpg';
import img_2 from './../../../assets/img/baiviet/baiviet1_1.jpg';
import img_3 from './../../../assets/img/baiviet/baiviet1_2.jpg';

const TextAlign_right = {
    textAlign: 'right',
    diplay: 'block'
}

const luu_y = {
    fontStyle: 'italic',
    fontSize: '0.95em'
}

function PagePosts() {
    return (
        <div className="posts grid">
            <div className="posts_content grid p-x-45 l-12 c-12">
                <h1>Sử dụng đúng cách đồ phòng hộ cá nhân trong mùa dịch Covid 19</h1>
                <p className="short-description">Hiệu quả bảo vệ chỉ được phát huy tốt khi các phương tiện phòng hộ cá nhân
                    được bạn đọc sử dụng đúng cách.</p>
                <p>Ngoài ra, đồ bảo hộ y tế còn giúp người bệnh không bị nhiễm các vi khuẩn, virus vãng lai từ nhân viên
                    y tế và bệnh viện.</p>
                <p>Việc mang phương tiện phòng hộ cá nhân khi chăm sóc người nhiễm Covid 19 là biện pháp ưu tiên và quan
                    trọng nhất để phòng ngừa lây nhiễm, đảm bảo hiệu quả bảo vệ, an toàn cho nhân viên y tế và cộng
                    đồng.</p>
                <div className="post_img">
                    <img src={img_1} alt="" />
                    <em>Phương tiện phòng hộ cá nhân giúp bảo vệ nhân viên y tế trước nguy cơ lây nhiễm</em>
                </div>
                <h2>Đồ phòng hộ cá nhân đang được sử dụng hiện nay</h2>
                <h3>Găng tay y tế, bộ trang phục phòng hộ, bao giày loại ống cao, mũ chụp tóc</h3>
                <span>Những phương tiện bảo hộ như găng tay y tế, quần, áo, mũ, bao bọc giày chống thấm là những phương
                    tiện bảo hộ thiết yếu và quan trọng để ngăn chặn quần áo của nhân viên y tế, người nhà chăm sóc bệnh
                    nhân tiếp xúc trực tiếp với máu hay dịch tiết của cơ thể người bệnh nhằm tránh phơi nhiễm, mầm bệnh
                    lây lan.</span>
                <h3>Kính bảo vệ hoặc tấm che mặt</h3>
                <span>Tấm chắn mặt nạ và thiết bị bảo vệ mắt là những phương tiện phòng hộ cá nhân dùng để bảo vệ niêm
                    mạc các cơ quan ở mặt. Đây là các thiết bị quan trọng giúp bảo vệ niêm mạc mắt, mũi và miệng tránh
                    khỏi nguy cơ phơi nhiễm mầm bệnh khi các tia máu, dịch cơ thể, dịch bài tiết của bệnh nhân bắn vào
                    mặt.</span>
                <h3>Khẩu trang y tế hoặc khẩu trang có hiệu lực lọc cao</h3>
                <p>Khẩu trang y tế hay khẩu trang có hiệu lực lọc cao như N95 được dùng để bảo vệ nhân viên y tế và
                    người chăm sóc bệnh nhân khỏi sự lây nhiễm virus SARS-CoV-2 qua các giọt bắn li ti của các dịch tiết
                    mang mầm bệnh có trong đường hô hấp.</p>
                <h2>Khi nào bắt buộc phải mặc phương tiện phòng hộ cá nhân?</h2>
                <p>Tất cả nhân viên y tế, người nhà chăm sóc bệnh nhân, những người có tiếp xúc với người nhiễm bệnh
                    Covid 19 hoặc mẫu bệnh phẩm, dụng cụ, chất thải, phương tiện chăm sóc, vận chuyển người nhiễm hoặc
                    nghi nhiễm virus SARS-CoV-2 đều cần tuân thủ phòng hộ cá nhân.</p>
                <p>Đối với những người tiếp xúc trực tiếp để làm thủ thuật, lấy mẫu, điều trị, chăm sóc người nhiễm bệnh
                    Covid 19 cần sử dụng khẩu trang N95 thay vì khẩu trang y tế.</p>
                <div className="post_img">
                    <img src={img_2} alt="" />
                    <em>Người tiếp xúc trực tiếp chăm sóc người nhiễm bệnh Covid 19 cần sử dụng khẩu trang N95</em>
                </div>
                <h2>Những lỗi sai khi mặc và tháo bỏ phương tiện phòng hộ cá nhân</h2>
                <p>Phương tiện phòng hộ cá nhân giúp bảo vệ người mặc nếu chẳng may tiếp xúc với virus SARS-CoV-2. Tuy
                    nhiên, nếu sai một bước trong quy trình sử dụng phương tiện phòng hộ cũng có thể gây nguy hiểm, có
                    thể kể đến như sau:</p>
                <ul>
                    <li>
                        <p>Tuân thủ sai trình tự khi tháo bộ phòng chống dịch và không vệ sinh tay.</p>
                    </li>
                    <li>
                        <p>Không trùm mũ của bộ đồ phòng chống dịch.</p>
                    </li>
                    <li>
                        <p>Mặc bộ phòng chống dịch để hở các phần da trên cơ thể.</p>
                    </li>
                    <li>
                        <p>Đeo khẩu trang không kín, thanh kim loại cố định của khẩu trang không ở sóng mũi.</p>
                    </li>
                </ul>
                <p>Chú ý đến một số lỗi sai thường gặp sẽ giúp chúng ta có thể tự bảo vệ mình, kiểm soát lây nhiễm cho
                    người thân và những người xung quanh.</p>
                <h2>Trình tự mặc, tháo bỏ phương tiện phòng hộ đúng cách</h2>
                <p>Trình tự mặc đồ bảo hộ bao gồm các bước sau: Vệ sinh tay bằng xà phòng hoặc cồn, sau đó bao giày, vệ
                    sinh tay lại một lần nữa, mặc bộ quần áo choàng liền quần, tiếp tục rửa lại tay, đeo khẩu trang đúng
                    yêu cầu, đeo mắt kính bảo hộ, đội nón, vệ sinh tay lần cuối và đeo găng tay y tế.</p>
                <p>Khi tháo bỏ phương tiện phòng hộ cũng phải theo đúng quy trình gồm các bước: Tháo găng tay y tế, vệ
                    sinh tay bằng xà phòng hoặc cồn rửa tay, kéo khóa áo choàng, rửa lại tay, cởi bỏ bộ áo choàng và bao
                    giày, vệ sinh tay, tháo mắt kính bảo hộ, tháo khẩu trang y tế, vệ sinh tay lần cuối. Bạn cần chuẩn
                    bị sẵn khẩu trang y tế sạch để sau khi tháo khẩu trang dơ, rửa tay thì có khẩu trang mới để đeo
                    ngay.</p>
                <div className="post_img">
                    <img src={img_3} alt="" />
                    <em>Sau khi tháo khẩu trang dơ và rửa tay, bạn cần chuẩn bị sẵn khẩu trang y tế sạch để đeo
                        ngay</em>
                </div>
                <p>Mặt ngoài đồ phòng hộ có nguy cơ nhiễm bẩn cao, khi cởi bỏ phải cuộn mặt ngoài vào trong.</p>
                <p>Trong quá trình tháo bỏ, không để bàn tay đã vệ sinh sạch hay quần bên trong chạm vào mặt ngoài đồ
                    phòng hộ. Nếu tay có lỡ chạm vào mặt ngoài phải rửa lại bằng xà phòng hoặc cồn rửa tay ngay sau đó.
                    Khẩu trang y tế cần được tháo ra sau cùng.</p>
                <p>Đồ phòng hộ cá nhân là chất thải lây nhiễm, chỉ sử dụng một lần duy nhất, sau khi tháo ra phải bỏ
                    ngay vào thùng đựng chất thải lây nhiễm. Thùng đựng chất thải lây nhiễm phải có dung tích lớn và có
                    nắp đậy kín.</p>
                <p>Hy vọng với những lưu ý về cách mặc và tháo bỏ phương tiện phòng hộ cá nhân trong bài viết này đã
                    giúp ích cho bạn trong tình hình dịch bệnh phức tạp hiện nay.</p>
                <p>Sử dụng phương tiện phòng hộ trong hoạt động y tế là một yêu cầu rất cấp thiết, giúp bảo vệ người mặc
                    nếu chẳng may tiếp xúc mầm bệnh và đảm bảo an toàn cho mọi người xung quanh. Người mặc nên thực hiện
                    đúng trình tự khi mặc và tháo bỏ phương tiện phòng hộ để tránh nguy cơ lây nhiễm bệnh.</p>
                <p style={TextAlign_right}>
                    <strong>Thuý Nguyễn</strong>
                </p>
                <em style={TextAlign_right}>
                    <strong>
                        Nguồn tham khảo: Tổng hợp
                    </strong>
                </em>
                <p style={luu_y}>
                    <b>Lưu ý:</b> Thông tin trong bài viết chỉ mang tính chất tham khảo, vui lòng liên hệ với Bác sĩ,
                    Dược sĩ hoặc chuyên viên y tế để được tư vấn cụ thể.
                </p>
            </div>
        </div>
    )
}

export default PagePosts;

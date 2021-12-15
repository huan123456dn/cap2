import React from 'react';
import { NavLink } from 'react-router-dom';

function PostItem() {

    const PostItem = [
        {
            'id': '1',
            'img': 'https://img.lovepik.com/photo/50093/9857.jpg_wh860.jpg',
            'title': 'Kiến thức y khoa',
            'name': 'Một số dấu hiệu bệnh trĩ nhẹ và cách điều trị',
            'description': 'Nhận biết một số dấu hiệu bệnh trĩ nhẹ dưới đây sẽ giúp bạn tránh được tình trạng bệnh tiến triển nặng và tìm ra cách điều trị nhanh chóng.',
        },
        {
            'id': '2',
            'img': 'https://soyte.haugiang.gov.vn/media/5011/3.png?anchor=center&mode=crop&width=600&height=400&rnd=132435265590000000',
            'title': ' Sức khỏe gia đình',
            'name': ' Sức khỏe gia đình',
            'description': 'Thời điểm chuyển giao là điều kiện lý tưởng để virus cúm gây nên các bệnh cảm lạnh phát triển, lây lan, bạn đọc có thể sử dụng một số loại tinh dầu sau để giúp ngăn ngừa bệnh'
        }
    ];

    const renderListPost = () => {
        let html = null;
        html = (PostItem.map((item, index) => {
            let id = `/user/healthcorner/bai${item.id}`;
            return (
                <NavLink to={id} className="list_post--item" key={index}>
                    <div className="post_picture">
                        <img src={item.img} alt="" />
                    </div>
                    <div className="post_content">
                        <span>
                            {item.title}
                        </span>
                        <h3>
                            {item.name}
                        </h3>
                        <p>{item.description}</p>
                    </div>
                </NavLink>
            )
        }));
        return html;
    }

    return (
        <div className="list_post ">
            <div className="post_inner">
                <h2>Bài viết</h2>
                {
                    renderListPost()
                }
            </div>
        </div>
    )
}

export default PostItem;

import React from 'react';
import PostItem from './../../../components/User/ListPostsItem';
function ListPost() {

    return (
        <div>
            <div className="content_post--header p-x-45">
                <div className="content_post--item1 l-12 p-y-12">
                    <a className="content_post--link" href="/user">Trang Chủ </a>
                    <span>Góc sức khỏe</span>
                </div>
            </div>
            <PostItem />
        </div>
    )
}

export default ListPost;

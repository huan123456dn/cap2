import React from 'react';
import { Link } from 'react-router-dom';

function ErrorDefault(props) {
    return (
        <div>
            <section className="page_404">
                <div >
                    <div className="row">
                        <div className="four_zero_four_bg">
                            <h1 className="text-center">404</h1>
                        </div>
                        <div className="contant_box_404">
                            <h3 className="h2">Có vẻ như bạn đang bị lạc</h3>
                            <p>trang bạn đang tìm kiếm không có sẵn!</p>
                            <div className='link_404_home'>
                                <Link to='/login' className="link_404"> Go to Home </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

ErrorDefault.propTypes = {

};

export default ErrorDefault;

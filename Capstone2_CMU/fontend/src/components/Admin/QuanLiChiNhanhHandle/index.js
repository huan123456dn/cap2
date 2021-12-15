import React from 'react';

function QuanLiChiNhanhHandle() {
    return (
        <div className="handle__task">
            <div className="search__input">
                <input className="input" name="search_thuoc" type="text" placeholder="Nhập tên , điện thoại , địa chỉ" />
                <button className="excel__btn">
                    <i className="fas fa-file-excel"></i>
                    <p>Excel</p>
                </button>
            </div>
            <div className="btn__add">
                <button className="button">
                    <i className="fas fa-plus"></i>
                    <p>Thêm chi nhánh</p>
                </button>
            </div>
        </div>
    )
}

export default QuanLiChiNhanhHandle;

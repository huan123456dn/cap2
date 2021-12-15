import React, { useEffect, useState } from "react";
import { Field } from 'redux-form';
import { removeVietnameseTones } from './../../../commons/vietnam';
import { renderTextField } from './../../formHelper';
import Button from '@mui/material/Button';


function Navbar(props) {

    const { handleSubmit, handleSearch , reset } = props;
    const listSanXuat = [
        "Eucerin",
        "Laroche posay",
        "Johnsons",
        "Matrix",
        "Aquaselin",
        "Sao Thái Dương",
        "Tanida",
        "Acnes",
    ];

    const listCountry = [
        "Đức",
        "Việt Nam",
        "Hoa Kỳ",
        "Nhật Bản",
        "Singapore",
        "Canada",
        "Hàn Quốc",
        "Ý"
    ];

    const valuePrice = [
        'Dưới 100.000đ',
        '100.000đ đến 300.000đ',
        '300.000đ đến 500.000đ',
        '500.000đ đến 1.000.000đ',
        'Trên 1.000.000đ'
    ];

    const [filterSanXuat, setFilterSanXuat] = useState([]);
    const [inputSanXuat, setInputSanXuat] = useState('');

    const [filterCountry, setFilterCountry] = useState([]);
    const [inputCountry, setInputCountry] = useState('');

    // set giá tri để xem thêm
    const [visibleSanXuat, setvisibleSanXuat] = useState(3);
    const [visibleCountry, setvisibleCountry] = useState(3);
    const [count, setCount] = useState(3);
    const [countCountry, setcountCountry] = useState(3);
    const [openbtn, setOpenbtn] = useState('');
    const [removeBtn, setRemoveBtn] = useState('');

    // checked Hãng Sản Xuất , nước Sản Xuất
    const [checkItem, setCheckItem] = useState("Tất cả");
    const [checkItemCountry, setCheckItemCountry] = useState("Tất cả");

    const [productHome, setHome] = useState("Tất cả");
    const [productContruy, setCountry] = useState("Tất cả");
    const [btnPriceFrom, setBtnPriceFrom] = useState(null);
    const [btnPriceTo, setBtnPriceTo] = useState(null);
    const [toPrice, setToPrice] = useState(null);
    const [fromPrice, setFromPrice] = useState(null);

    useEffect(() => {
        handleSearch({
            productHome,
            productContruy,
            btnPriceFrom,
            btnPriceTo,
            fromPrice,
            toPrice
        })
    }, [productHome, productContruy, btnPriceFrom, btnPriceTo, toPrice, fromPrice])

    useEffect(() => {
        const results = listSanXuat.filter(item =>
            removeVietnameseTones(item.toLowerCase().trim()).includes(removeVietnameseTones(inputSanXuat.toLowerCase().trim()))
        );
        setFilterSanXuat(results);
    }, [inputSanXuat])

    useEffect(() => {
        const results = listCountry.filter(item =>
            removeVietnameseTones((item.toLowerCase().trim())).includes(removeVietnameseTones(inputCountry.toLowerCase().trim()))
        );
        setFilterCountry(results);
    }, [inputCountry])

    const renderListSanXuat = (value = null) => {
        let html = null;
        html = (
            <div>
                <label htmlFor="Tất cả" className="group_checkbox1--item checkbox_same ">
                    <Field
                        id="Tất cả"
                        variant="outlined"
                        name="listSanXuat"
                        component="input"
                        type="radio"
                        value="Tất cả"
                        onClick={() => onclickSanXuat("Tất cả")}
                        checked={checkItem === "Tất cả"}
                    />
                    <span className="block">{"Tất cả"}</span>
                </label>
                {
                    filterSanXuat.slice(0, visibleSanXuat).map((item, index) => (
                        <label key={index} htmlFor={item === "Tất cả" ? "Tất cả country" : item} className="group_checkbox1--item checkbox_same ">
                            <Field
                                id={item}
                                variant="outlined"
                                name="listSanXuat"
                                component="input"
                                type="radio"
                                value={item}
                                onClick={() => onclickSanXuat(item)}
                            />
                            <span className="block">{item}</span>
                        </label>
                    ))
                }
            </div>
        )
        return html;
    }

    const renderListCountry = () => {
        let html = null;
        html = (
            <div>
                <label htmlFor="Tất cả Country" className="group_checkbox1--item checkbox_same ">
                    <Field
                        id="Tất cả Country"
                        variant="outlined"
                        name="listCountry"
                        component="input"
                        type="radio"
                        value="Tất cả"
                        onClick={() => onclickCountry("Tất cả")}
                        checked={checkItemCountry === "Tất cả"}
                    />
                    <span className="block">{"Tất cả"}</span>
                </label>
                {
                    filterCountry.slice(0, visibleCountry).map((item, index) => (
                        <label key={index} htmlFor={item === "Tất cả" ? "Tất cả country" : item} className="group_checkbox1--item checkbox_same ">
                            <Field
                                id={item}
                                variant="outlined"
                                name="listCountry"
                                component="input"
                                type="radio"
                                value={item}
                                onClick={() => onclickCountry(item)}
                            />
                            <span className="block">{item}</span>
                        </label>
                    ))
                }
            </div>
        )
        return html;
    }

    // onclick xem them SanXuat
    const onClickListSanXuat = () => {
        setvisibleSanXuat((prevValue) => prevValue + 3)
        setCount((prevValue) => prevValue + 3);
    }

    // // onclick xem them country
    const onClickListCountry = () => {
        setvisibleCountry((prevValue) => prevValue + 3);
        setcountCountry((prevValue) => prevValue + 3);
    }

    // xem thêmSanXuat 
    const renderSeeMoreSanXuat = () => {
        if (!inputSanXuat) {
            if (count < listSanXuat.length) {
                return (
                    <div onClick={onClickListSanXuat} className="group_checkbox1--more">
                        <div className="block see__more">
                            Xem Thêm
                        </div>
                    </div>
                )
            }
        }
        return '';
    }

    //xem thêm Country
    const renderSeeMoreCountry = () => {
        if (!inputCountry) {
            if (countCountry < listCountry.length) {
                return (
                    <div onClick={onClickListCountry} className="group_checkbox1--more">
                        <div className="block see__more">
                            Xem Thêm
                        </div>
                    </div>
                )
            }
        }
        return '';
    }

    //onchange value san xuat
    const onchangeSanXuat = (event) => {
        setInputSanXuat(event.target.value);
    }

    //onchange value country
    const onchangeCountry = (event) => {
        setInputCountry(event.target.value);
    }

    //  button giá 
    const renderPrice = () => {
        let html = null;
        html = (
            <div className="group_checkbox3">
                {
                    valuePrice.map((item, index) => {
                        return (
                            <button onClick={() => onClickPrice(item, (index + 1))} key={index} className={openbtn === (index + 1) ? "group_checkbox3--button mb-8 block active" : "group_checkbox3--button mb-8 block"}>
                                {item}
                            </button>
                        )
                    })
                }
            </div>
        )
        return html;
    }

    // button giá
    const onClickPrice = (price, number) => {
        setOpenbtn(number);
        setRemoveBtn(number);
        reset()
        if (removeBtn === number) {
            setOpenbtn(0);
            setRemoveBtn('');
            // setBtnPriceFrom(null);
            // setBtnPriceTo(null);
        }
        if (price === 'Dưới 100.000đ') {
            setBtnPriceFrom(1);
            setBtnPriceTo(100000);
            setToPrice(null);
            setFromPrice(null);
        }
        if (price === '100.000đ đến 300.000đ') {
            setBtnPriceFrom(100000);
            setBtnPriceTo(300000);
            setToPrice(null);
            setFromPrice(null);
        }
        if (price === '300.000đ đến 500.000đ') {
            setBtnPriceFrom(300000);
            setBtnPriceTo(500000);
            setToPrice(null);
            setFromPrice(null);
        }
        if (price === '500.000đ đến 1.000.000đ') {
            setBtnPriceFrom(500000);
            setBtnPriceTo(1000000);
            setToPrice(null);
            setFromPrice(null);
        }
        if (price === 'Trên 1.000.000đ') {
            setBtnPriceFrom(1000000);
            setBtnPriceTo(500000000);
            setToPrice(null);
            setFromPrice(null);
        }
    }

    const handleSubmitForm = (data) => {
        if (data.from && data.to) {
            setBtnPriceFrom(null);
            setBtnPriceTo(null);
            setToPrice(data.to);
            setFromPrice(data.from);
            setRemoveBtn('');
            setOpenbtn(0);
        }
    }

    //checkbox san xuat
    const onclickSanXuat = (item) => {
        setHome(item);
        setCheckItem(item)
    }

    //checkbox Country
    const onclickCountry = (item) => {
        setCountry(item);
        setCheckItemCountry(item)
    }

    return (
        <div className="product__navbar mr-20 l-2 ">
            <div className="prduct_navbar--list1">
                <div className="prduct_navbar">
                    <span className="block m-y-12">Hãng Sản Xuất</span>
                    <div className="navbar_search1 mb-12">
                        <div className="navbar_search1--icon mr-4">
                            <i className="fas fa-search navbar_icon-search block"></i>
                        </div>
                        <input
                            className="navbar_search1--input mr-4 block"
                            type="text"
                            value={inputSanXuat}
                            onChange={onchangeSanXuat}
                        />
                    </div>
                    <div className="group_checkbox1">
                        {
                            renderListSanXuat()
                        }
                        {
                            renderSeeMoreSanXuat()
                        }
                    </div>
                </div>
            </div>
            <div className="prduct_navbar--list2">
                <div className="prduct_navbar">
                    <span className="block m-y-12">Nước Sản Xuất</span>
                    <div className="navbar_search2 mb-12">
                        <div className="navbar_search2--icon mr-4">
                            <i className="fas fa-search navbar_icon-search block"></i>
                        </div>
                        <input
                            className="navbar_search2--input mr-4 block"
                            type="text"
                            value={inputCountry}
                            onChange={onchangeCountry}
                        />
                    </div>
                    <div className="group_checkbox2">
                        {
                            renderListCountry()
                        }
                        {
                            renderSeeMoreCountry()
                        }
                    </div>
                </div>
            </div>
            <div className="prduct_navbar--list3">
                <div className="prduct_navbar">
                    <span className=" block m-y-12">Giá Bán</span>
                    {
                        renderPrice()
                    }
                </div>
            </div>
            <div className="prduct_navbar--list4">
                <div className="prduct_navbar">
                    <span className=" block m-y-12">Chọn khoảng giá</span>
                    <form onSubmit={handleSubmit(handleSubmitForm)} className="group_search--price">
                        <div className="search_price--input4 grid">
                            <Field
                                className="block input_price-from"
                                name="from"
                                component={renderTextField}
                                type="text"
                                placeholder="Từ"
                            />
                            <span className="block p-x-12">-</span>
                            <Field
                                className="block input_price-to"
                                name="to"
                                component={renderTextField}
                                type="text"
                                placeholder="Đến"
                            />
                        </div>
                        <Button type='submit' variant="contained" className="group_search--price-button p-y-8 mt-8 block" >Áp Dụng</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

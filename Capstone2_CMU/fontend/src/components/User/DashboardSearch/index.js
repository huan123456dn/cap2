import React , {useState} from "react";

function Search(props) {

    const { onSearch } = props ;
    const [keyword, setkeyword] = useState("");

    const handleChange = event => {
        setkeyword(event.target.value);
    };

    const onHandleSearch = () =>{
        onSearch(keyword);
    } 

    const clearValueSearch = () =>{
        setkeyword('');
        onSearch('');
    }

    return (
        <ul className="header_navbar-list header--search">
            <li className="header_navbar-item header--searchItem">
                <div className="header_search">
                    <div className="header_search--input header_search_item">
                        <input
                            className="search--input"
                            type="text"
                            placeholder="Nhập tìm tên thuốc ..."
                            value={ keyword }
                            onChange={ handleChange }
                        />
                    </div>
                    <div className="header_search--button header_search_item">
                        {
                            keyword !== '' ?   <div onClick={clearValueSearch} class="fas fa-times clearIcon" /> : ''
                        }
                        <button onClick={onHandleSearch} className="fas fa-search icon-search"></button>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default Search;

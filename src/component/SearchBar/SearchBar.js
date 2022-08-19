import './SearchBar.css'

const SearchBar = () => {
    return (
        <div className="search-container">
            <input
                className="search-bar"
                placeholder="Search for a Pokemon..."
                variant="outlined"
                // value={value}
                // onKeyPress={(e: React.KeyboardEvent) => {
                //     if (e.key === "Enter") {
                //     submitFormHandler();
                //     }
                // }}
                // onChange={(e: React.FormEvent<HTMLInputElement>) =>
                //     setValue(e.currentTarget.value)
                // }
            />
            <div className="btn">
                <button className="search-btn">
                    Search
                </button>
            </div> 
        </div>

    )
}

export default SearchBar;
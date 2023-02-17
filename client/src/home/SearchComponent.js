import React from "react"

const SearchComponent = (props) => {
    return (
        <div className="flex justify-center mt-2">
           <input type="text" placeholder="Search" className="bg-gray-300 pl-2 rounded-sm"></input>
        </div>
    )
};

export default SearchComponent;
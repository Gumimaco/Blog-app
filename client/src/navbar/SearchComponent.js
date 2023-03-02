import React,{useState} from "react"
import { useNavigate } from "react-router-dom";

const SearchComponent = (props) => {
    const [search,setSearch] = useState("")
    const navigate = useNavigate()

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("redirecting")
        if (search !== "") navigate(`posts/?title=${search}`)
    }

    return (
        <form onSubmit={formSubmit}>
            <input type="text" spellCheck="false" placeholder="Search" className="font-light px-2 rounded-md h-8 border border-black" value={search} onChange={e => {setSearch(e.target.value)}}></input>
            <span className="input-group-btn">
                <input type="submit" value="send" className=""/>
            </span>
        </form>
    )
};

export default SearchComponent;
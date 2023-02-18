import React,{useState} from 'react'

export const AddTags = (props) => {
    const tags = props.tags
    const setTags = props.setTag
    const [tag, settag] = useState("")
    
    const add_tag = (e) => {
        if (e.key === "Enter") {
            e.target.value = ""
            setTags(prev => [...prev,tag])
            settag("")
        }
    }

    return (
        <div>
            { tags.length < 4 ?
                <input placeholder="Add tags max 4" onKeyDown={add_tag} onChange={e => {settag(e.target.value)}}></input>
              : null 
            }
            <div className="flex">
                {/* replace with component of tag with complex tag with cancel button to get removed from tags... */}
                { tags.map((tag,index) => {return <div onClick={e => {setTags(tags.filter(i => i !== tag))}} key={index} className="border border-black font-light  hover:border-red-600 mr-1 mb-1 mt-1 px-1 rounded-md">#{tag}</div>}) }
            </div>
        </div>
    )
}


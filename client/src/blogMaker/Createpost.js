import React,{useEffect, useState} from 'react'
import {AddTags} from './AddTags'
import axios from 'axios'
import PreviewComponent from './PreviewComponent'
import { useNavigate, useParams } from 'react-router-dom'


export default function Createpost() {
    const {id} = useParams()
    const [tags,setTags] = useState([])
    const [title, setTitle] = useState("")
    const [textArea, settextArea] = useState("")
    const [preview,setPreview] = useState(false)
    const [access,setAccess] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/blog/draft/${id}`,{withCredentials: true})
        .then(data => {
            settextArea(data.data.content)
            setTags(data.data.tags)
            setTitle(data.data.title)
            setAccess(true)
        })
        .catch(err => setAccess(false))
    },[])


    const updateDraft = async () => {
        await axios.put(`http://localhost:3001/api/blog/draft/${id}`,{title,textArea,tags},{withCredentials: true})
        .then(data => console.log("SUCCESS"))
        .catch(fail => console.log("FAILED"))
    }


    const submit = () => {
        if (textArea.length < 30 || title.length < 5) return;
        let url;
        axios.post('http://localhost:3001/api/blog/create-post',{textArea,tags,title},{withCredentials: true})
        .then(data => {
            url = data.data.id
        })
        axios.delete(`http://localhost:3001/api/blog/delete-draft/${id}`,{withCredentials: true})
        .then(something => {console.log("SUCCESS DELETING DRAFT")})
        .catch(err => console.log("ERROR DELETING DRAFT"))
        console.log("REDIRECT HERE TO THIS URL",url)
    }
    return (
        
        <div className="wrapper mt-1 flex justify-center">
            {
                access ?
                    <div className="w-4/6">
                        { preview ? <PreviewComponent data={textArea} tags={tags} edit={setPreview} title={title}/> :
                        <div className="h-screen">
                                <input type="text" className="text-4xl font-bold" placeholder="Title" onChange={e => setTitle(e.target.value)} value={title}></input>

                                <AddTags tags={tags} setTag={setTags}/>
                                <textarea placeholder="Write your text here" className="bg-gray-200 blog-content w-full h-5/6 rounded-sm p-2" onChange={e => settextArea(e.target.value)} value={textArea}></textarea>
                                <div>
                                    <button className="border-blue-300 border hover:bg-blue-200 px-2 rounded-sm text-xl" onClick={() => submit(id)}>Post</button>
                                    <button className="border-blue-300 border hover:bg-blue-200 px-2 ml-2 rounded-sm text-xl" onClick={() => {setPreview(true);updateDraft()}}>Preview</button>
                                    <button className="border-blue-300 border hover:bg-blue-200 px-2 ml-2 rounded-sm text-xl" onClick={updateDraft}>Save</button>
                                </div>
                            </div>
                        }
                    </div>
                : null
            }
        </div>
    )
}

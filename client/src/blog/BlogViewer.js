import React,{useState,useEffect} from "react"
import { useParams } from "react-router-dom";
import axios from 'axios'
import BlogComponent from "./BlogComponent";


const BlogViewer = ({user}) => {
    const {blog_id} = useParams()
    const [blog,setBlog] = useState()
    const [userblogs,setUserBlogs] = useState()

    useEffect(() => {
        axios.get(`http://localhost:3001/api/blog/${blog_id}`,{withCredentials: true})
        .then(data => setBlog(data.data))
        .catch(err => console.log("Erorr getting blog",err))
        
        axios.get(`http://localhost:3001/api/blog/userblogs/${user._id}`,{withCredentials: true})
        .then(data => setUserBlogs(data.data))
        .catch(err => console.log("Err getting with blog useblogs",err))

    }, [])

    return (
        <div>
            {blog ? <BlogComponent data={blog.content} tags={blog.tags} title={blog.title} />: null}
            {userblogs ? 
                userblogs.map((obj,index) => {
                    <div>{obj.title}</div>
                })
                : null
            }

        </div>
    )
};

export default BlogViewer;
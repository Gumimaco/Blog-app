import React,{useState,useEffect} from "react"
import BlogCard from '../blog/BlogCard'
import axios from 'axios'

const BlogShowcase = () => {
    const [blogs,setBlogs] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/api/blog/last-posts')
        .then(data => setBlogs(data.data))
        .catch(err => console.log(err))
    })

    return (
        <div className="">
            { blogs ? blogs.map((blog,index) => {
                    return <BlogCard blog={blog} key={index}/>
                }) : null
            }
        </div>
    )
};

export default BlogShowcase;
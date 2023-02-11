import React,{useState,useEffect} from 'react'
import axios from 'axios'
import BlogCard from '../blog/BlogCard'
export const Home = () => {
    const [blogs,setBlogs] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/api/blog/last-posts')
        .then(data => setBlogs(data.data))
        .catch(err => console.log(err))
    })

    return (
        <div>
            <div>INPUT SHIT HERE</div>
            <div>FILTER SHIT SORT SHIT</div>
            <div> BLOGS</div>
            <div>
                { blogs.map((blog,index) => {
                        return <BlogCard blog={blog} key={index}/>
                    })
                }
            </div>
        </div>
        
    )
}

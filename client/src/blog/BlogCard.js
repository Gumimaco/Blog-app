import React,{useEffect,useState} from "react"
import moment from 'moment'
import {UserBubble} from './UserBubble'
import axios from 'axios'

const BlogCard = ({blog,classes}) => {
    const [user,setUser] = useState()
    
    useEffect(() => {
        if (blog) {
            axios.get(`http://localhost:3001/api/user/${blog.creator}`)
            .then(data => setUser(data.data))
            .catch(err => console.log("Error getting creator of blog"))
        }
    }, [user])

    return (
        <div className={`bg-white p-2 mt-2 flex rounded-md cursor-pointer hover:border-blue-600 transition ease-in duration-250 border ${classes}`}>           
            <div>
                <div>
                    <UserBubble user={user} time={moment(new Date(blog.createdAt)).fromNow()}/>
                </div>
                <div className="text-4xl font-extrabold hover:text-blue-700" onClick={() => {window.location.assign(`http://localhost:3000/blog/${blog._id}`)}} >{blog.title}</div>
                <div>
                    {<div className="flex">  
                    { blog.tags.map((tag,index) => {
                        return <div className="mt-1 px-1 font-light hover:bg-gray-100 rounded-md" key={index}>#{tag}</div>
                    })}
                </div>}
                </div>
            </div>
        </div>
    )
};

export default BlogCard;
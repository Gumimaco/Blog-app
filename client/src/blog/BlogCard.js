import React from "react"
import moment from 'moment'

const BlogCard = ({blog}) => {
    const upvote = () => {

    }
    return (
       <div className="bg-gray-200 p-2 m-2 flex rounded-sm cursor-pointer" onClick={() => {window.location.assign(`http://localhost:3000/blog/${blog._id}`)}}>
            {/* <div className="mr-6">
                <div className="">{blog.upvoted}</div>
                <div onClick={upvote}>UPVOTE</div>
            </div> */}
            <div>
                <div className="text-2xl font-bold">{blog.title}</div>
                <div className="flex">
                    <div className="mr-2 text-sm">{moment(new Date(blog.createdAt)).fromNow()} by {blog.c_email}</div>
                </div>
                <div>
                    {<div className="flex">  
                    { blog.tags.map((tag,index) => {
                        return <div className="px-1 mr-2 bg-gray-500 rounded-sm text-white" key={index}>{tag}</div>
                    })}
                </div>}
                </div>
            </div>
       </div>
    )
};

export default BlogCard;
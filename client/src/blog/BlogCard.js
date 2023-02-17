import React,{useEffect,useContext} from "react"
import moment from 'moment'
import {myUser} from '../context/UserContext'
import GetImage from "../hooks/GetImage";
import {UserBubble} from './UserBubble'

const BlogCard = ({blog}) => {
    const user = useContext(myUser);

    const upvote = () => {

    }
    useEffect(() => {
        if (user) {
            console.log(user)
        }
    }, [user])

    return (
       <div className="bg-white p-2 mt-2 flex rounded-sm cursor-pointer border-black hover:border-blue-600 transition ease-in duration-250  border">
            {/* <div className="mr-6">
                <div className="">{blog.upvoted}</div>
                <div onClick={upvote}>UPVOTE</div>
            </div> */}
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
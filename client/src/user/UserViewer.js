import React,{useState,useEffect} from "react"
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import GetImage from "../hooks/GetImage";
import BlogCard from "../blog/BlogCard"

const UserViewer = ({user}) => {
    const {id} = useParams()
    const [viewUser,setViewUser] = useState(null)
    const [posts,setPosts] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3001/api/user/${id}`)
        .then(data => setViewUser(data.data))
        .catch(err => console.log("ERROR"))
        
        if (user) {
            axios.get(`http://localhost:3001/api/blog/userblogs/${user._id}`,{withCredentials: true})
            .then(data => setPosts(data.data))
            .catch(err => console.log("Err getting with blog useblogs",err))
        }
    },[user])

    const redirectToSettings = () => {
        window.location.assign('http://localhost:3000/user/settings')
    }

    return (
        <div>
            { viewUser ? 
                <div className="bg-gray-100 rounded-md m-4 flex-col flex items-center p-4">
                    <GetImage classes="profile-picture h-32" image={viewUser.profile_picture}/>
                    
                    <div className="text-2xl font-bold">{viewUser.username}</div>
                    { viewUser.description ? <div>{viewUser.description}</div> : null}
                    { (user && user._id === id) ? <button onClick={redirectToSettings} className="bg-gray-300 px-2 rounded-md">Edit profile</button> : null }
                </div>
                
                : null
            }
            { posts ?
                <div>
                    { posts.map((obj,index) => {
                        return <BlogCard blog={obj} key={index} user={user}/>
                    })}
                </div>
                : null
            }

        </div>
        )
};

export default UserViewer;
import React,{useState,useEffect} from "react"
import {useParams} from 'react-router-dom'
import axios from 'axios'
import GetImage from "../hooks/GetImage";

const UserViewer = ({user}) => {
    const {id} = useParams()
    const [viewUser,setViewUser] = useState(null)
    const [posts,setPosts] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:3001/api/user/${id}`)
        .then(data => setViewUser(data.data))
        .catch(err => console.log("ERROR"))
    },[])

    return (
        <div>
            { viewUser ? 
                <div className="bg-gray-100 rounded-md m-4 flex-col flex items-center p-4">
                    <GetImage classes="profile-picture h-32" image={viewUser.profile_picture}/>
                    <div className="text-2xl font-bold">{viewUser.username}</div>
                    {viewUser.description ?
                        <div>{viewUser.description}</div>
                    : null}
                </div>
                : null
            }
            { posts ?
                null : null
            }
            {
                (user && user._id === id) ? <button className="bg-cyan-200 px-2 rounded-md ml-4">Edit profile</button> : null
            }
        </div>
        )
};

export default UserViewer;
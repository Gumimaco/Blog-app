import React,{useEffect,useState} from 'react'
import axios from 'axios'
import CommentComponent from './CommentComponent'

function CommentSection({blog,comments}) {
    const [commentBody,setCommentBody] = useState("")

    const submitComment = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/api/comment/create-comment`,{comment_body: commentBody,parent_id: 0,blog_id: blog._id},{withCredentials: true})
        .then(res => console.log("successfull comment made"))
        .catch(err => console.log("ERROR CREATING COMMENT"))
    }

    return (
        <div className>
            <form onSubmit={submitComment}>
                <input onChange={e => setCommentBody(e.target.value)}></input>
            </form>
            {comments.map((renderChildID,index) => {
                return <CommentComponent commentId={renderChildID} key={index}/>
            })}
        </div>
    )
}

export default CommentSection

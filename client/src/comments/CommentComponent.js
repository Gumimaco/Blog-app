import React,{useEffect,useState} from 'react'
import axios from 'axios'

function CommentComponent({commentId}) {
    const [comment,setComment] = useState()

    useEffect(() => {
        axios.get(`http://localhost:3001/api/comment/${commentId}`)
        .then(res => setComment(res.data))
        .catch(err => console.log("ERROR GETTING COMMENT"))
    },[])


    return (
        <div>
            {comment ? comment.content : "NOT FOUND"}
            { comment ? 
            comment.comments.map((renderChildID,index) => {
                return <CommentComponent commentId={renderChildID} key={index}/>
                }) 
            : null
            }
        </div>
    )
}

export default CommentComponent

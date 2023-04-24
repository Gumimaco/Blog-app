import React, { useEffect, useState } from "react";
import axios from "axios";
import GetImage from "../hooks/GetImage";
import REPLY from "./reply.png";
import SENT from "./sent.png";

function CommentComponent({ commentId, margin, blogId }) {
  const [comment, setComment] = useState();
  const [commentBody, setCommentBody] = useState();
  const [user, setUser] = useState();

  const [openComment, setOpenComment] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/comment/${commentId}`)
      .then((res) => {
        console.log(res.data);
        setComment(res.data.comment);
        setUser(res.data.user);
      })
      .catch((err) => console.log("ERROR GETTING COMMENT"));
  }, []);

  const goToUser = () => {
    window.location.assign(`http://localhost:3000/user/${user._id}`);
  };

  const submitComment = (e) => {
    if (commentBody === "") {
      e.preventDefault();
      return;
    }

    axios
      .post(
        `http://localhost:3001/api/comment/create-comment`,
        { comment_body: commentBody, parent_id: comment._id, blog_id: blogId },
        { withCredentials: true }
      )
      .then((res) => console.log("successfull comment made"))
      .catch((err) => console.log("ERROR CREATING COMMENT"));
  };

  return (
    <div className={`flex flex-col ml-[${margin}rem]`}>
      <div className="flex justify-between">
        <div className="bg-gray-200 m-2 w-full">
          <div className="flex">
            {user ? (
              <GetImage
                classes="h-12 rounded-md w-12"
                image={user.profile_picture}
              />
            ) : null}
            <button className="flex flex-col" onClick={goToUser}>
              <div className="hover:text-blue-400 font-light ml-2">
                {user && user.username}
              </div>
              <div className="ml-2">
                {comment ? comment.content : "NOT FOUND"}
              </div>
            </button>
          </div>
          {comment
            ? comment.comments.map((renderChildID, index) => {
                return (
                  <CommentComponent
                    blogId={blogId}
                    margin={margin + 2}
                    commentId={renderChildID}
                    key={comment}
                  />
                );
              })
            : null}
        </div>
        <button onClick={() => setOpenComment(true)}>
          <img className="h-6 mr-6" src={REPLY} alt="reply icon" />
        </button>
      </div>
      {openComment && (
        <div className="ml-2">
          <form className={`w-full my-2 flex`} onSubmit={submitComment}>
            <input
              className={`bg-gray-300 h-10 w-full rouned flex px-1 rounded-md ml-${margin}`}
              onChange={(e) => setCommentBody(e.target.value)}
            ></input>
            <button type="submit" className="mx-4">
              <img src={SENT} className="h-6" alt="sent icon" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CommentComponent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentComponent from "./CommentComponent";
import GetImage from "../hooks/GetImage";
import SENT from "./sent.png";

function CommentSection({ blog, comments, user }) {
  const [commentBody, setCommentBody] = useState("");

  const submitComment = (e) => {
    if (commentBody === "") {
      e.preventDefault();
      return;
    }

    axios
      .post(
        `http://localhost:3001/api/comment/create-comment`,
        { comment_body: commentBody, parent_id: 0, blog_id: blog._id },
        { withCredentials: true }
      )
      .then((res) => console.log("successfull comment made"))
      .catch((err) => console.log("ERROR CREATING COMMENT"));
  };

  return (
    <div className="bg-white self-center w-3/5 rounded-md flex flex-col">
      <div className="flex items-center">
        {user ? (
          <>
            <GetImage
              classes="h-12 w-14 profile-picture m-2 self-start"
              image={user.profile_picture}
            />
            <form className="w-full my-2 flex" onSubmit={submitComment}>
              <input
                className="bg-gray-300 h-10 w-full rouned flex px-1 rounded-md"
                onChange={(e) => setCommentBody(e.target.value)}
              ></input>
              <button type="submit" className="mx-4">
                <img src={SENT} className="h-6" alt="sent icon" />
              </button>
            </form>
          </>
        ) : null}
      </div>
      {comments.map((renderChildID, index) => {
        return (
          <CommentComponent
            commentId={renderChildID}
            margin={8}
            key={index}
            blogId={blog._id}
          />
        );
      })}
    </div>
  );
}

export default CommentSection;

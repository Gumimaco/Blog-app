import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogComponent from "./BlogComponent";
import CommentSection from "../comments/CommentSection";

const BlogViewer = ({ user }) => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState();

  const commentMade = () => {};
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/blog/${blog_id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setBlog(data.data);
      })
      .catch((err) => console.log("Erorr getting blog", err));
  }, [blog_id]);

  return (
    <div className="flex flex-col justify-center">
      {blog ? (
        <>
          <BlogComponent
            creator={blog.creator}
            data={blog.content}
            tags={blog.tags}
            title={blog.title}
          />
          <CommentSection user={user} blog={blog} comments={blog.comments} />
        </>
      ) : null}
    </div>
  );
};

export default BlogViewer;

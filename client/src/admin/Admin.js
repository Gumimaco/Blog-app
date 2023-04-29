import React, { useEffect, useState } from "react";
import axios from "axios";

export const Admin = () => {
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();
  const [users, setUsers] = useState();
  const [postFilter, setPostFilter] = useState("");
  const [commFilter, setCommFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/admin/all-posts", {
        withCredentials: true,
      })
      .then((res) => setPosts(res.data));
    axios
      .get("http://localhost:3001/api/admin/all-comments", {
        withCredentials: true,
      })
      .then((res) => setComments(res.data));
    axios
      .get("http://localhost:3001/api/admin/all-users", {
        withCredentials: true,
      })
      .then((res) => setUsers(res.data));
  }, []);

  const removeComment = (id) => {
    axios.delete(`http://localhost:3001/api/admin/comment/${id}`, {
      withCredentials: true,
    });
    setComments((prev) => prev.filter((e) => e._id !== id));
  };
  const removeUser = (id) => {
    // Rather not try this
    // axios.delete(`http://localhost:3001/api/admin/user/${id}`,{withCredentials: true});
    setUsers((prev) => prev.filter((e) => e._id !== id));
  };
  const removePost = (id) => {
    axios.delete(`http://localhost:3001/api/admin/post/${id}`, {
      withCredentials: true,
    });
    setPosts((prev) => prev.filter((e) => e._id !== id));
  };

  return (
    <div className="flex mt-4 w-full justify-between">
      <div className="mx-2 flex flex-col w-1/3">
        <input
          className="mb-2 rounded-md p-1"
          onChange={(e) => setPostFilter(e.target.value)}
        ></input>
        {posts &&
          posts
            .filter((post) => post.title.includes(postFilter))
            .map((post) => (
              <button
                key={post._id}
                className="border-2 bg-white p-1 mb-2 hover:bg-red-400 rounded-md"
                onClick={() => {
                  removePost(post._id);
                }}
              >
                {post.title}
              </button>
            ))}
      </div>
      <div className="flex flex-col mx-2 w-1/3">
        <input
          className="mb-2 rounded-md p-1"
          onChange={(e) => {
            setCommFilter(e.target.value);
          }}
        ></input>
        {comments &&
          comments
            .filter((comment) => comment.content.includes(commFilter))
            .map((comment) => (
              <button
                key={comment._id}
                className="border-2 bg-white rounded-md p-1 mb-2 hover:bg-red-400"
                onClick={() => {
                  removeComment(comment._id);
                }}
              >
                {comment.content}
              </button>
            ))}
      </div>
      <div className="flex flex-col mx-2 w-1/3">
        <input
          className="mb-2 rounded-md p-1"
          onChange={(e) => setUserFilter(e.target.value)}
        ></input>
        {users &&
          users
            .filter((user) => user.username.includes(userFilter))
            .map((user) => (
              <button
                key={user._id}
                className="border-2 bg-white rounded-md p-1 mb-2 hover:bg-red-400"
                onClick={() => {
                  removeUser(user._id);
                }}
              >
                {user.username}
              </button>
            ))}
      </div>
    </div>
  );
};

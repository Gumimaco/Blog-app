import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import BlogCard from "../blog/BlogCard";

export const PostsHome = () => {
  const [blogs, setBlogs] = useState();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/blog/byTitle/${searchParams.get("title")}`
      )
      .then((data) => {
        setBlogs(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log("failed to retrieve data from title API"));
  }, []);

  return (
    <div className="mt-2">
      {blogs
        ? blogs.map((blog, index) => {
            return <BlogCard blog={blog} key={index} />;
          })
        : null}
    </div>
  );
};

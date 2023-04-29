import React, { useState, useEffect, useRef } from "react";
import BlogCard from "../blog/BlogCard";
import axios from "axios";

const BlogShowcase = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      console.log("IN OBSERVER", entries);
      const first = entries[0];
      if (first.isIntersecting) {
        setPage((n) => n + 1);
      }
    })
  );

  const getBlogs = async () => {
    let response = await axios.get(
      `http://localhost:3001/api/blog/last-posts/${page}`
    );
    console.log(response.data);
    blogs !== []
      ? setBlogs((prev) => [...prev, ...response.data])
      : setBlogs([response.data]);
  };

  useEffect(() => {
    getBlogs();
  }, [page]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <div className="mt-2">
      {blogs
        ? blogs.map((blog, index) => {
            return index === blogs.length - 1 ? (
              <div ref={setLastElement} key={index}>
                <BlogCard blog={blog} key={index} />
              </div>
            ) : (
              <BlogCard blog={blog} key={index} />
            );
          })
        : null}
    </div>
  );
};

export default BlogShowcase;

import React, { useEffect, useState } from "react";
import { AddTags } from "./AddTags";
import axios from "axios";
import PreviewComponent from "./PreviewComponent";
import { useParams } from "react-router-dom";

export default function Createpost() {
  const { id } = useParams();
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [textArea, settextArea] = useState("");
  const [preview, setPreview] = useState(false);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/blog/draft/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        settextArea(data.data.content);
        setTags(data.data.tags);
        setTitle(data.data.title);
        setAccess(true);
      })
      .catch((err) => setAccess(false));
  }, []);

  const updateDraft = async () => {
    await axios
      .put(
        `http://localhost:3001/api/blog/draft/${id}`,
        { title, textArea, tags },
        { withCredentials: true }
      )
      .then((data) => console.log("SUCCESS"))
      .catch((fail) => console.log("FAILED"));
  };

  const redirect_to_blog = (url) => {
    window.location.assign(`http://localhost:3000/blog/${url}`);
  };
  const submit = async () => {
    if (textArea.length < 30 || title.length < 5) return;
    let url;
    await axios
      .post(
        "http://localhost:3001/api/blog/create-post",
        { textArea, tags, title },
        { withCredentials: true }
      )
      .then((data) => {
        url = data.data._id;
      });
    await axios
      .delete(`http://localhost:3001/api/blog/delete-draft/${id}`, {
        withCredentials: true,
      })
      .then((something) => {
        console.log("SUCCESS DELETING DRAFT");
      })
      .catch((err) => console.log("ERROR DELETING DRAFT"));
    redirect_to_blog(url);
  };
  const onFileChange = async (e) => {
    let file = e.currentTarget.files?.[0];
    e.preventDefault();
    if (!file) return;
    const form = new FormData();
    form.append("image", file);
    let image_key;
    await axios
      .post("http://localhost:3001/api/image/upload", form, {
        withCredentials: true,
      })
      .then((data) => {
        image_key = data.data;
      })
      .catch((error) => console.log(error));
    let blog_content = document.getElementById("blog-content");
    let text = `![GiveName](${image_key})`;
    blog_content.setRangeText(
      text + "\n",
      blog_content.selectionStart,
      blog_content.selectionEnd,
      "end"
    );
    settextArea(blog_content.value);
  };
  return (
    <div className="wrapper mt-1 flex justify-center">
      {access ? (
        <div className="flex flex-col standard-width">
          {preview ? (
            <PreviewComponent
              data={textArea}
              tags={tags}
              edit={setPreview}
              title={title}
            />
          ) : (
            <>
              <div className="bg-white p-4 border rounded-md h-full">
                <input
                  type="text"
                  className="text-4xl  font-bold w-11/12"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                ></input>
                <AddTags tags={tags} setTag={setTags} />
                <div>
                  <input onChange={onFileChange} type="file"></input>
                </div>
                <textarea
                  id="blog-content"
                  placeholder="Write your text here"
                  className="textareaheight blog-content rounded-sm mt-2"
                  onChange={(e) => settextArea(e.target.value)}
                  value={textArea}
                ></textarea>
              </div>
              <div className="mt-2">
                <button className="custom-button" onClick={() => submit(id)}>
                  Post
                </button>
                <button
                  className="custom-button ml-2"
                  onClick={() => {
                    setPreview(true);
                    updateDraft();
                  }}
                >
                  Preview
                </button>
                <button className="custom-button ml-2" onClick={updateDraft}>
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

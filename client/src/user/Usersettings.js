import React, { useState } from "react";
import axios from "axios";
import GetImage from "../hooks/GetImage";

const UserSettings = ({ user }) => {
  const [File, setFile] = useState();

  const [username, setUsername] = useState(user.username || user.email);
  const [bio, setBio] = useState(user.description);

  const onFileChange = (e) => {
    setFile(e.currentTarget.files?.[0]);
  };

  const uploadImage = async () => {
    return new Promise(async (resolve, reject) => {
      if (File === undefined) {
        return reject("No file");
      }
      const form = new FormData();
      form.append("image", File);
      await axios
        .post("http://localhost:3001/api/image/upload", form, {
          withCredentials: true,
        })
        .then((data) => {
          return resolve(data.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  };

  const saveAndRedirect = async (e) => {
    e.preventDefault();
    let key = undefined;
    await uploadImage()
      .then((out) => {
        key = out;
      })
      .catch((err) => console.log("Messed up uploading"));

    await axios
      .put(
        "http://localhost:3001/api/user/change-settings",
        { key, username, bio },
        { withCredentials: true }
      )
      .then((data) => console.log("Changed settings", data))
      .catch((err) => console.log("Failed to change settings", err));

    window.location.assign(`http://localhost:3000/user/${user._id}`);
  };

  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-col items-center">
        <GetImage
          classes={"profile-picture max-h-24 w-24"}
          image={user.profile_picture}
        />
        <input onChange={onFileChange} type="file"></input>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-light text-xl">Username</div>
        <input
          className="bg-white border  rounded-md px-2 w-2/4"
          type="text"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-light text-xl">Description</div>
        <textarea
          spellCheck={false}
          className="bg-white border rounded-md px-2 w-2/4 h-32"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>
      <button
        className="custom-button w-32 mt-2 self-center"
        onClick={saveAndRedirect}
      >
        Save Changes
      </button>
    </div>
  );
};

export default UserSettings;

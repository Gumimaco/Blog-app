import React,{useState} from "react"
import axios from 'axios'

const UserSettings = ({user}) => {
    const [File, setFile] = useState(null)

    const [username,setUsername] = useState(user.username)
    const [bio,setBio] = useState(user.description)


    const onFileChange = (e) => {
        setFile(e.currentTarget.files?.[0])
    }

    const uploadImage = async () => {
        return new Promise(async (resolve,reject) => {
            if (!File) return;
            const form = new FormData();
            form.append("image", File);
            await axios.post("http://localhost:3001/api/image/upload",form, {withCredentials: true})
            .then(data => {resolve(data.data)})
            .catch(error => reject(error))
        })
    }

    const saveAndRedirect = async (e) => {
        e.preventDefault()
        let key;
        await uploadImage()
        .then(out => {key = out})
        .catch(err => console.log("Messed up uploading"))

        await axios.put("http://localhost:3001/api/user/change-settings",{key,username,bio},{withCredentials: true})
        .then(data => console.log("Changed settings",data))
        .catch(err => console.log("Failed to change settings",err))

        window.location.assign(`http://localhost:3000/user/${user._id}`)
    }

    return (
        <div>
            <div className="flex items-center">
                <img className="profile-picture max-h-24" src={user.profile_picture}/>
                <input onChange={onFileChange} type="file"></input>
            </div>
            <div className="flex">
                <div>Username</div>
                <input className="bg-gray-300" type="text" defaultValue={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div className="flex">
                <div>Description</div>
                <textarea className="bg-gray-300 w-2/4 h-32" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </div>
            <button className="bg-cyan-200 rounded-sm px-1 " onClick={saveAndRedirect}>Save Changes</button>
        </div>
    )
};

export default UserSettings;
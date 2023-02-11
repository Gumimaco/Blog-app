import React,{useState} from "react"
import axios from 'axios'

export const UploadImage = (props) => {
    const [File, setFile] = useState(null)
    const [url, setUrl] = useState(null)

    const onFileChange = (e) => {
        setFile(e.currentTarget.files?.[0])
    }

    const uploadImage = async (e) => {
        e.preventDefault();
        if (!File) return;
        const form = new FormData();
        form.append("image", File);
        await axios.post("http://localhost:3001/api/image/upload",form,{withCredentials: true})
        .then(data => {setUrl(data.data)})
        .catch(error => console.log(error))
        console.log(url)
    }

    return (
        <div>
            <form onSubmit={uploadImage}>
                <div>Upload Image</div>
                <div>
                    <input onChange={onFileChange} type="file"></input>
                    <img src={url}/>
                </div>
                <div>{url}</div>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
};

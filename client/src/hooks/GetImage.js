import React,{useState,useEffect} from "react"
import axios from 'axios'


const GetImage = ({image,classes}) => {
    const [imageURL,setImageURL] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3001/api/image/url/${image}`)
            .then(data => {setImageURL(data.data)})
            .catch(err => console.log("ERROR GETTING URL"))
    }, [])

    return (
        <>
           {imageURL ? <img className={classes} src={imageURL}/> : null}
        </>
    )
};

export default GetImage;
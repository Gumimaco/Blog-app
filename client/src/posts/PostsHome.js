import React, { useEffect,useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

export const PostsHome = () => {
    const [searchParams] = useSearchParams();
    console.log(searchParams.get('tag'))
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/blog')
    },[])

    return (
        <div>
            Title: {searchParams.get('title')}
        </div>
    )
}

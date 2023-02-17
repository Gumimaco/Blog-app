import React from 'react'
import BlogShowcase from './BlogShowcase'
import SearchComponent from './SearchComponent'

export const Home = () => {
    return (
        <div>
            <SearchComponent/>
            <div>FILTER SHIT SORT SHIT</div>
            <div className="w-screen flex justify-between">
                <div>SOMETHINGS</div>
                <BlogShowcase/>
                <div>SOMETHING DIFFERET</div>
            </div>
        </div>
        
    )
}

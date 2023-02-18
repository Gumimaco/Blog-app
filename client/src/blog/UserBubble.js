import React from "react"
import GetImage from "../hooks/GetImage";

export const UserBubble = ({user,time}) => {
    
    const goToUser = () => {
        window.location.assign(`http://localhost:3000/user/${user._id}`)
    }
   return (
       <div>
           {
               user ? 
                <div className="flex" onClick={goToUser}>
                    <GetImage image={user.profile_picture} classes="h-8 w-8 profile-picture"/>
                    <div className="flex flex-col">
                        <div className="ml-1 text-sm font-light hover:text-blue-600">{user.username ? user.username : user.email}</div>
                        { time ? <div className="ml-1 text-xs font-thin">{time}</div> : null }
                    </div>

                </div>   
                : null
           }
       </div>
    )
};

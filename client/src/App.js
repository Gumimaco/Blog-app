import { Navbar } from './navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useContext} from 'react'
import {myUser} from './context/UserContext'
import {Home} from './home/Home'
import Createpost from './blogMaker/Createpost';
import UserSettings from './user/UserSettings';
import UserViewer from './user/UserViewer';
import BlogViewer from './blog/BlogViewer';
import { PostsHome } from './posts/PostsHome';

function App() {
    const user = useContext(myUser);
    console.log("User in app:", user)
    return (
        <div>
            <BrowserRouter>
                <Navbar user={user}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    { user ?
                        <>
                            <Route path="/:id/edit-post" element={<Createpost/>}/>
                            <Route path="/user/settings" element={<UserSettings user={user}/>}/>
                        </>
                        : null
                    }
                    <Route path="/posts/*" element={<PostsHome/>}/>
                    <Route path="/user/:id" element={<UserViewer user={user}/>}/>
                    <Route path="/blog/:blog_id" element={<BlogViewer user={user}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

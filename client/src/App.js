import { Navbar } from './navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useContext} from 'react'
import {myUser} from './context/UserContext'
import {Home} from './home/Home'
import Createpost from './blogMaker/Createpost';


function App() {
    const user = useContext(myUser);
    console.log("User in app:", user)
    return (
        <>
            <BrowserRouter>
                <Navbar user={user}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    { user ?
                        <>
                            <Route path="/:id/edit-post" element={<Createpost/>}/>
                        </>
                        : null
                    }
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

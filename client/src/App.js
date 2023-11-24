import Menu from "./components/menu";
import {BrowserRouter, Link, Route, Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";


function App() {

    const server_host = process.env.NODE_ENV === 'development' ? 'http://localhost:9001' : 'https://api.allspacex.ru'

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='login' element={<Login server_host={server_host}/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/users' element={<Users/>}/>
                <Route path='/dashboard' element={<Dashboard server_host={server_host}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
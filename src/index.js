import ReactDOM from 'react-dom';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login.js';
import Register from './components/Register.js';
import Habits from './components/Habits.js';
import Today from './components/Today.js';
import History from './components/History.js';

import UserContext from './contexts/UserContext.js';

function App() {
    const [user, setUser] = useState({
        id: "",
        name: "",
        image: "",
        email: "",
        password: "",
        token: ""
    });

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ user, setUser }}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/historico" element={<History />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));
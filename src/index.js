import ReactDOM from 'react-dom';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './assets/css/reset.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Habits from './components/Habits.js';
import Today from './components/Today.js';
import History from './components/History.js';

import UserContext from './contexts/UserContext.js';
import PercentContext from './contexts/PercentContext.js';

function App() {
    const [user, setUser] = useState({
        id: "",
        name: "",
        image: "",
        email: "",
        password: "",
        token: ""
    });
    const [percent, setPercent] = useState(0);

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ user, setUser }}>
                <PercentContext.Provider value={{ percent, setPercent }}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cadastro" element={<Register />} />
                        <Route path="/habitos" element={<Habits />} />
                        <Route path="/hoje" element={<Today />} />
                        <Route path="/historico" element={<History />} />
                    </Routes>
                </PercentContext.Provider>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));
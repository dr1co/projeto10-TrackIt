import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login.js';
import Register from './components/Register.js';
import Habits from './components/Habits.js';
import Today from './components/Today.js';
import History from './components/History.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/habitos" element={<Habits />} />
                <Route path="/hoje" element={<Today />} />
                <Route path="/historico" element={<History />} />
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));
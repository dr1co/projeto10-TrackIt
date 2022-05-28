import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import logo from '../media/logo.png';

import UserContext from '../contexts/UserContext.js';

export default function Login() {
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    let navigate = useNavigate();

    function login() {
        if (credentials.email !== "" && credentials.password !== "") {
            setError("");
            const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', credentials);
            request.then((res) => {
                setUser({
                    id: res.data.id,
                    name: res.data.name,
                    image: res.data.image,
                    email: res.data.email,
                    password: res.data.password,
                    token: res.data.token
                });
                navigate('/habitos');
            })
            request.catch((err) => {
                switch (err.response.status) {
                    case 401:
                        setError("Usuário não encontrado. Verifique os dados e tente novamente!");
                        setCredentials({
                            email: '',
                            password: ''
                        });
                        break;
                    case 422:
                        setError("Dados inválidos. Tente novamente!");
                        setCredentials({
                            email: '',
                            password: ''
                        });
                        break;
                    case 500:
                        setError("Servidor caiu, tente novamente mais tarde...");
                        break;
                    default:
                        setError("Verifique os dados e tente novamente!");
                }
            })
        } else {
            setError("Favor preencher os campos faltantes acima!");
        }
    }

    return (
        <Container>
            <Image src={logo} alt="logo" />
            <Input type="text" placeholder="email" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value={credentials.email} />
            <Input type="password" placeholder="senha" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password} />
            <LoginButton onClick={login}> Entrar </LoginButton>
            <StyledLink to="/cadastro">
                <Register> Não tem uma conta? Cadastre-se! </Register>
            </StyledLink>
            <Warn display={error === "" ? "none" : "inline"}> {error} </Warn>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Image = styled.img`
    width: 180px;
    height: 180px;
    object-fit: cover;
    margin: 0 auto 30px auto;
`;

const Input = styled.input`
    width: 300px;
    height: 45px;
    margin: 5px auto;
    padding: 11px;
    background-color: transparent;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;

    &::placeholder {
        font-size: 20px;
        color: #DBDBDB;
    }
`;

const LoginButton = styled.button`
    width: 300px;
    height: 45px;
    margin: 5px auto;
    background-color: #52B6FF;
    color: #FFFFFF;
    border: 0px solid transparent;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 21px;
    cursor: pointer;
`;

const Register = styled.p`
    width: 100%;
    text-align: center;
    margin: 20px 0 0 0;
    font-size: 14px;
    color: #52B6FF;

    &:hover {
        text-decoration: underline;
    }
`;

const Warn = styled.p`
    width: 100%;
    text-align: center;
    margin: 20px 0 0 0;
    font-size: 14px;
    font-weight: 700;
    color: #CC0000;
    display: ${props => props.display};
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;
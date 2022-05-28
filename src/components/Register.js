import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import logo from '../media/logo.png';

export default function Register() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [register, setRegister] = useState({
        email: '',
        name: '',
        image: '',
        password: ''
    });

    let navigate = useNavigate();

    function registerUser() {
        if(register.email !== "" && register.name !== "" && register.image !== "" && register.password !== "") {
            const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', register);
            request.then(() => {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            });
            request.catch((err) => {
                switch (err.response.status) {
                    case 401:
                        setError("Usuário já cadastrado. Tente novamente!");
                        break;
                    case 422:
                        setError("Dados inválidos. Tente novamente!");
                        break;
                    case 500:
                        setError("Servidor caiu, tente novamente mais tarde...");
                        break;
                    default:
                        setError("Verifique os dados e tente novamente!")
                }
            })
        } else {
            setError("Favor preencher os campos faltantes acima!")
        }
    }

    return (
        <Container>
            <Image src={logo} alt="logo" />
            <Input type="text" placeholder="email" onChange={(e) => setRegister({...register, email: e.target.value})} value={register.email} />
            <Input type="password" placeholder="senha" onChange={(e) => setRegister({...register, password: e.target.value})} value={register.password} />
            <Input type="text" placeholder="nome" onChange={(e) => setRegister({...register, name: e.target.value})} value={register.name} />
            <Input type="text" placeholder="foto" onChange={(e) => setRegister({...register, image: e.target.value})} value={register.image} />
            <RegisterButton onClick={registerUser}> Cadastrar </RegisterButton>
            <StyledLink to="/">
                <Login> Já tem uma conta? Faça login! </Login>
            </StyledLink>
            <Warn display={error === "" ? "none" : "inline"}> {error} </Warn>
            <Success display={success ? "inline" : "none"}> Usuário criado com sucesso! Redirecionando... </Success>
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

const RegisterButton = styled.button`
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

const Login = styled.p`
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

const Success = styled.p`
    width: 100%;
    text-align: center;
    margin: 20px 0 0 0;
    font-size: 14px;
    font-weight: 700;
    color: #14AE5C;
    display: ${props => props.display};
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;
import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import logo from '../media/logo.png';

export default function Register() {
    return (
        <Container>
            <Image src={logo} alt="logo" />
            <Input type="text" placeholder="email" onChange={() => console.log("oi")} />
            <Input type="password" placeholder="senha" onChange={() => console.log("oi")} />
            <Input type="text" placeholder="nome" onChange={() => console.log("oi")} />
            <Input type="text" placeholder="foto" onChange={() => console.log("oi")} />
            <LoginButton onClick={() => console.log("oi")}> Entrar </LoginButton>
            <StyledLink to="/">
                <p> Já tem uma conta? Faça login! </p>
            </StyledLink>
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

    p {
        width: 100%;
        text-align: center;
        margin: 20px 0 0 0;
        font-size: 14px;
        color: #52B6FF;
    }

    p:hover {
        text-decoration: underline;
    }
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

const StyledLink = styled(Link)`
    text-decoration: none;
`;
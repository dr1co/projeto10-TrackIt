import axios from 'axios';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header.js';
import Footer from './Footer.js';

export default function Habits() {
    return (
        <>
            <Header />
            <Container>
                <h1> Meus hábitos </h1>
            </Container>
            <Footer />
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 80px auto 110px auto;
    background-color: #E5E5E5;
`
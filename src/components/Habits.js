import axios from 'axios';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header.js';
import Footer from './Footer.js';

export default function Habits() {
    const [habitCreation, setHabitCreation] = useState(false);

    function toggleHabitCreation() {
        console.log('oi')
        if (habitCreation) {
            setHabitCreation(false);
        } else {
            setHabitCreation(true);
        }
    }

    return (
        <>
            <Header />
            <Background></Background>
            <Container>
                <Title>
                    <h1> Meus hábitos </h1>
                    <CreateHabit onClick={toggleHabitCreation}> + </CreateHabit>
                </Title>
                <HabitForm display={habitCreation ? "block" : "none"}>
                    <InputHabit type="text" placeholder="nome do hábito" onChange={() => console.log('oi')} ></InputHabit>
                    <Weekdays>
                        <Day> D </Day>
                        <Day> S </Day>
                        <Day> T </Day>
                        <Day> Q </Day>
                        <Day> Q </Day>
                        <Day> S </Day>
                        <Day> S </Day>
                    </Weekdays>
                    <ActionButtons>
                        <Cancel onClick={() => console.log('cancela')}> Cancelar </Cancel>
                        <Save onClick={() => console.log('salvar')}> Salvar </Save>
                    </ActionButtons>
                </HabitForm>
            </Container>
            <Footer />
        </>
    )
}

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: #E5E5E5;
    position: fixed;
    top: 0;
    z-index: -1;
`;

const Container = styled.div`
    margin: 70px auto 101px auto;
    padding: 10px 20px;
`;

const Title = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    display: ${props => props.display};

    h1 {
        font-size: 23px;
        color: #126BA5;
    }
`;

const CreateHabit = styled.div`
    width: 40px;
    height: 35px;
    padding-bottom: 2.5px;
    background-color: #52B6FF;
    border: 0 solid transparent;
    border-radius: 5px;
    font-size: 27px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const HabitForm = styled.div`
    width: 100%;
    height: 180px;
    padding: 18px;
    background: #FFFFFF;
    border-radius: 5px;
    position: relative;
    display: ${props => props.display};
`;

const InputHabit = styled.input`
    width: 100%;
    height: 45px;
    background: transparent;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    padding: 10px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    color: #666666;

    &::placeholder {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20px;
        color: #DBDBDB;
    }
`;

const Weekdays = styled.div`
    width: 100%;
    display: flex;
`;

const Day = styled.div`
    width: 30px;
    height: 30px;
    margin: 8px 2px;
    background-color: #FFFFFF;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-size: 20px;
    color: #DBDBDB;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const ActionButtons = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 18px;
    right: 18px;
`;

const Cancel = styled.p`
    font-size: 16px;
    color: #52B6FF;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const Save = styled.button`
    width: 84px;
    height: 35px;
    background-color: #52B6FF;
    border: 0px solid transparent;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 16px;
    color: #FFFFFF;
    cursor: pointer;
`
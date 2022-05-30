import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Header from './Header.js';
import Footer from './Footer.js';
import GreyBG from './Background.js';

import UserContext from '../contexts/UserContext.js';
import PercentContext from '../contexts/PercentContext.js';

import check from '../assets/media/check.png';

export default function Today() {
    /* const now = dayjs;
    console.log(now); */
    const [habitList, setHabitList] = useState([]);
    const [subtitle, setSubtitle] = useState("Carregando hábitos...");
    const { user } = useContext(UserContext);
    const { percent, setPercent } = useContext(PercentContext);
    const [done, setDone] = useState([]);

    function getHabits() {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        promise.then((res) => {
            setHabitList(res.data);
            if (res.data.length === 0) {
                setSubtitle("Você não criou nenhum hábito ainda :(");
            } else {
                const doneList = res.data.filter((elem) => elem.done === true)
                setDone(doneList);
                const num = Math.round((doneList.length) * 100 / (res.data.length));
                setPercent(num);
                if (num === 0) {
                    setSubtitle("Nenhum hábito concluído ainda");
                } else {
                    setSubtitle(`${num}% dos hábitos concluídos`);
                }
            }
        });
        promise.catch(() => {
            setSubtitle("Não foi possível carregar os hábitos :/");
        })
    }

    function toggleHabitCompletion(id, done) {
        if (done) {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,{}, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            request.then(() => {
                getHabits();
            });
        } else {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,{}, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            request.then(() => {
                getHabits();
            });
        }
    }

    useEffect(() => {
        getHabits();
    }, [])

    return (
        <>
        <Header />
        <GreyBG />
        <Container>
            <Title> Dia da semana, dia/mês </Title>
            <Subtitle color={done.length > 0 ? "#8FC549" : "#444444"}> {subtitle} </Subtitle>
            <HabitList>
                {habitList.map((habit) => <Habit
                key={habit.id}
                id={habit.id}
                name={habit.name}
                done={habit.done}
                currentSequence={habit.currentSequence}
                highestSequence={habit.highestSequence}
                toggleHabitCompletion={toggleHabitCompletion} />)}
            </HabitList>
        </Container>
        <Footer />
        </>
    )
}

function Habit({ name, id, done, currentSequence, highestSequence, toggleHabitCompletion}) {
    return (
        <HabitCard>
            <h1> {name} </h1>
            <p> Sequência atual: <Highlight color={done ? "#8FC549" : "#666666"}> {currentSequence} {currentSequence === 1 ? "dia" : "dias"} </Highlight> </p>
            <p> Melhor sequência: <Highlight color={currentSequence === highestSequence && done ? "#8FC549" : "#666666"}> {highestSequence} {highestSequence === 1 ? "dia" : "dias"} </Highlight> </p>
            <Finish backgroundcolor={done ? "#8FC549" : "#EBEBEB" } onClick={() => toggleHabitCompletion(id, done)}>
                <img src={check} alt="concluir hábito" />
            </Finish>
        </HabitCard>
    )
}

const Container = styled.div`
    margin: 70px auto 101px auto;
    padding: 15px 20px;
`;

const Title = styled.h1`
    margin-bottom: 5px;
    font-size: 23px;
    color: #126BA5;
`;

const Subtitle = styled.h2`
    margin-bottom: 20px;
    font-size: 18px;
    color: ${props => props.color};
`

const HabitList = styled.div`
    width: 100%;
    margin: 5px auto;
    display: flex;
    flex-direction: column;
`;

const HabitCard = styled.div`
    width: 100%;
    min-height: 94px;
    height: fit-content;
    margin: 5px auto;
    padding: 14px;
    background-color: #FFFFFF;
    border-radius: 5px;
    position: relative;

    h1 {
        width: 70%;
        font-size: 20px;
        color: #666666;
        margin-bottom: 15px;
    }

    p {
        font-size: 13px;
        color: #666666;
        line-height: 1.2;
    }

    img {
        width: 35px;
        height: 28px;
    }
`;

const Finish = styled.button`
    width: 70px;
    height: 70px;
    background-color: ${props => props.backgroundcolor};
    border: 0 solid transparent;
    border-radius: 5px;
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
`;

const Highlight = styled.strong`
    color: ${props => props.color};
`
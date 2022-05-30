import axios from 'axios';
import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header.js';
import Footer from './Footer.js';

import UserContext from '../contexts/UserContext.js';

import trash from '../assets/media/trashicon.png';

export default function Habits() {
    const [habitCreation, setHabitCreation] = useState(false);
    const [habitList, setHabitList] = useState([]);
    const [habit, setHabit] = useState({
        name: "",
        days: []
    })

    const { user, setUser } = useContext(UserContext);
    
    const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    function toggleHabitCreation() {
        if (habitCreation) {
            setHabitCreation(false);
        } else {
            setHabitCreation(true);
        }
    }

    function getHabits() {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        promise.then((res) => {
            setHabitList(res.data);
        })
    }

    function postHabit() {
        if(habit.name !== "" && habit.days.length > 0) {
            const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', habit, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            request.then((res) => {
                setHabit({
                    name: "",
                    days: []
                });
                setHabitCreation(false);
                getHabits();
            });
            request.catch((err) => {
                console.log(err.response.status);
            });
        }
    }

    function deleteHabit(id) {
        let confirmation = window.confirm("Tem certeza que deseja deletar este hábito? (essa ação não pode ser desfeita!");
        if (confirmation) {
            const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            request.then(getHabits);
            request.catch((err) => {
                console.log(err.response.status);
            })
        }
    }

    useEffect(() => {
        getHabits();
    }, []);

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
                    <InputHabit type="text" placeholder="nome do hábito" value={habit.name} onChange={(e) => setHabit({...habit, name: e.target.value})} />
                    <Weekdays>
                        {weekdays.map((day, index) => <SelectWeekday
                        key={index}
                        day={day}
                        number={index+1}
                        habit={habit}
                        setHabit={setHabit} /> )}
                    </Weekdays>
                    <ActionButtons>
                        <Cancel onClick={toggleHabitCreation}> Cancelar </Cancel>
                        <Save onClick={postHabit}> Salvar </Save>
                    </ActionButtons>
                </HabitForm>
                <HabitList habitList={habitList} weekdays={weekdays} deleteHabit={deleteHabit} />
            </Container>
            <Footer />
        </>
    )
}

function SelectWeekday({ day, number, habit, setHabit }) {
    const array = habit.days;

    function toggleDay(i) {
        if(array.includes(i)) {
            setHabit({...habit, days: array.filter((a) => a !== i)});
        } else {
            array.push(i)
            setHabit({...habit, days: array});
        }
    }

    if(array.includes(number)) {
        return (
            <Day bgcolor="#CFCFCF" color="#FFFFFF" onClick={() => toggleDay(number)}>
                {day}
            </Day>
        )
    } else {
        return (
            <Day bgcolor="#FFFFFF" color="#D4D4D4" onClick={() => toggleDay(number)}>
                {day}
            </Day>
        )
    }
}

function HabitList({ habitList, weekdays, deleteHabit }) {
    if(habitList.length === 0) {
        return (
            <HabitContainer>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a Trackear!</p>
            </HabitContainer>
        )
    } else {
        return (
            <HabitContainer>
                {habitList.map((elem, index) => <Habit
                habit={elem}
                key={index}
                weekdays={weekdays}
                deleteHabit={deleteHabit} />)}
            </HabitContainer>
        )
    }
}

function Habit({ habit, weekdays, deleteHabit }) {
    return (
        <HabitCard>
            <h1> {habit.name} </h1>
            <Weekdays>
                {weekdays.map((day, index) => <Weekday
                key={index}
                day={day}
                days={habit.days}
                number={index+1} />)}
            </Weekdays>
            <img src={trash} onClick={() => deleteHabit(habit.id)} />
        </HabitCard>
    )
}

function Weekday({ day, days, number }) {
    if(days.includes(number)) {
        return (
            <Day bgcolor="#CFCFCF" color="#FFFFFF">
                {day}
            </Day>
        )
    } else {
        return (
            <Day bgcolor="#FFFFFF" color="#D4D4D4">
                {day}
            </Day>
        )
    }
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
    margin: 10px auto;
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
    margin: 8px 2px 0 2px;
    background-color: ${props => props.bgcolor};
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-size: 20px;
    color: ${props => props.color};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const HabitContainer = styled.div`
    width: 100%;
    margin: 5px auto;
    display: flex;
    flex-direction: column;

    p {
        font-size: 18px;
        color: #666666;
        line-height: 1.2;
    }
`;

const HabitCard = styled.div`
    width: 100%;
    height: 91px;
    margin: 5px auto;
    padding: 14px;
    background-color: #FFFFFF;
    border-radius: 5px;
    position: relative;

    h1 {
        font-size: 20px;
        color: #666666;
        margin-bottom: 5px;
    }

    img {
        width: 13px;
        position: absolute;
        top: 14px;
        right: 14px;
        cursor: pointer;
    }
`

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
`;
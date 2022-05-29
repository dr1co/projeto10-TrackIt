import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import '../assets/css/progressbar.css';

export default function Footer() {
    return (
        <Container>
            <h1> Hábitos </h1>
            <Progress>
                <p> Hoje </p>
                <CircularProgressbar value={67} />
            </Progress>
            <h1> Histórico </h1>
        </Container>
    )
}

const Container = styled.div`
    padding: 0 35px;
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 2;

    h1 {
        font-size: 18px;
        color: #52B6FF;
    }
`;

const Progress = styled.div`
    width: 90px;
    height: 90px;
    background-color: #52B6FF;
    border-radius: 50%;
    position: absolute; 
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);

    p {
        font-size: 18px;
        color: #FFFFFF;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;
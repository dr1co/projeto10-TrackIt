import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';

import '../assets/css/progressbar.css';

export default function Footer() {
    return (
        <Container>
            <StyledLink to="/habitos">
                <h1> Hábitos </h1>
            </StyledLink>
            <StyledLink to="/hoje">
                <Progress>
                    <p> Hoje </p>
                    <CircularProgressbar value={67} />
                </Progress>
            </StyledLink>
            <StyledLink to="/historico">
                <h1> Histórico </h1>
            </StyledLink>
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

    h1:hover {
        text-decoration: underline;
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

const StyledLink = styled(Link)`
    text-decoration: none;
`
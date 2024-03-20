import { Box } from '@material-ui/core';
import {styles} from './Scoreboard.style';
import Button from '@mui/material/Button';
import {Navigate, useSearchParams} from "react-router-dom";
import { useScoreboardData } from '../../hooks/useScoreboardData';
import { Link } from 'react-router-dom';

const { title } = styles;

export default function Scoreboard() {
    const [searchParams] = useSearchParams();
    const playerName = searchParams.get('playerName')
    const scores = useScoreboardData();

    if (!playerName) {
        return <Navigate to="/" />
    }

    return (
    <>
        <Box>
            <h1 style={title}>Tableau des scores</h1>
            <table>
                <thead>
                    <tr>
                        <th>Joueur</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index} style={{
                            backgroundColor: playerName === score.name ? '#e9c46a' : '',
                            color: playerName === score.name ? 'black' : ''
                        }}>
                            <td>{score.name}</td>
                            <td>{score.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
        <Link to={`/game?playerName=${playerName}`}>
            <Button variant="contained">Retour</Button>
        </Link>
    </>
    );
}

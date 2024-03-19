import { Box } from '@material-ui/core';
import {styles} from './Score.style';
import Button from '@mui/material/Button';
import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import { scoreboardData, useScoreboardData } from '../../hooks/useScoreboardData';

const { title } = styles;

function ScoreboardPage() {
    const [searchParams] = useSearchParams();
    const playerName = searchParams.get('playerName')
    const nav = useNavigate()
    const scores = useScoreboardData(playerName);

    if (!playerName) {
        return <Navigate to="/" />
    }

    const handleButtonClick = () => {
        nav(`/game?playerName=${playerName}`)
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
                    {scores.map((score: scoreboardData, index: number) => (
                        <tr key={index}>
                            <td>{score.name}</td>
                            <td>{score.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
        <Button variant="contained" onClick={handleButtonClick}>Retour</Button>
    </>
    );
}

export default ScoreboardPage;

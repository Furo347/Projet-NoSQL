import { Box } from '@material-ui/core';
import {styles} from './Score.style';
import Button from '@mui/material/Button';
import { fetchScoreboardData } from './getScoreBoard';
import { scoreboardData } from './getScoreBoard';

const { title } = styles;
const scores = await fetchScoreboardData();

function ScoreboardPage() {

    const handleButtonClick = () => {
        window.location.href = '/game';
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

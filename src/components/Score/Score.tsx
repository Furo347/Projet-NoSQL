import { Box } from '@material-ui/core';
import {styles} from './Score.style';
import Button from '@mui/material/Button';

const {container, title} = styles;

function ScoreboardPage() {
    const scores = [
        { name: 'Joueur 1', score: 100 },
        { name: 'Joueur 2', score: 90 },
        { name: 'Joueur 3', score: 80 },
        { name: 'Joueur 4', score: 70 },
        { name: 'Joueur 5', score: 60 }
    ];

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
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td>{score.name}</td>
                            <td>{score.score}</td>
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

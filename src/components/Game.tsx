import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { ThemeKeyList, randomLetter } from '../util/rapidapi.ts';
import TextField from '@mui/material/TextField';
import {useCallback, useState} from "react";
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { apiClient } from '../client.tsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      border: "1px solid",
      borderRadius: 0,
      backgroundColor: "#eeeeee"
    },
    title: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: "#1e90ff"
    },
    divbutton: {
      padding: "1rem",
      justifyContent: "end",
      display: "flex",
    },
    button: {
      backgroundColor: "#1e90ff",
      margin: "2px"
    },
    customTextField: {
      width: '100%',
    },
    column: {
      border: "1px solid",
      borderRadius: "0px"
    },
    validColumn: {
      borderWidth: '1px',
      borderColor: 'green'
    },
  }),
);

export default function Game() {
  const classes = useStyles();
  const [letters, setLetters] = useState<string[]>([])
  const [lines, setLines] = useState<string[][]>([]);
  const [checkLines, setCheckLines] = useState<boolean[][] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const playerName = searchParams.get('playerName')
  const nav = useNavigate()

  const handleRandomLetter = useCallback(() => {
    if (letters.length > 15) {
      return
    }

    const newLetter = randomLetter(letters);
    setLetters((prev) => [...prev, newLetter]);
    setLines((prev) => [...prev, ThemeKeyList.map(() => '')]);
  }, [letters]);

  console.log(lines)

  if (!playerName) {
    return <Navigate to='/' />
  }

  const handleButtonClick = async () => {
    await apiClient.setPoints[":name"].$post({param: {name: playerName}})
    nav(`/scores?playerName=${playerName}`)
  }

  const handleTextFieldChange = (rowIndex: number, themeIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = [...lines];
    newData[rowIndex][themeIndex] = event.target.value;
    setLines(newData);
  };

  const handleValidateLine = async () => {
    setIsLoading(true);

    const resultJson = await apiClient.checkGame.$post({json: {game: letters.map((v, i) => ({letter: v, wordList: lines[i]})), name: playerName}})
    const results = await resultJson.json()

    setCheckLines(results.map((v) => v.check))

    setIsLoading(false);
  };

  return (
    <>
      <div className={classes.divbutton}>
        {checkLines && <Button variant="contained" onClick={handleButtonClick}>Voir Scores</Button>}
        <Button className={classes.button} onClick={handleValidateLine} disabled={isLoading || checkLines !== null}>
          {isLoading ? 'Loading...' : 'VALIDER'}
        </Button>
        <Button className={classes.button} onClick={handleRandomLetter} disabled={isLoading || checkLines !== null}>
          TIRER UNE LETTRE
        </Button>
      </div>
      <div>
        <Grid container alignItems="stretch">
          <Grid item xs={12}>
            <Paper className={classes.title}>Jeu du baccalauréat</Paper>
          </Grid>
          <Grid container>
              <Grid item style={{ flexBasis: '12%' }}>
                <Paper className={classes.paper}>Lettre</Paper>
              </Grid>
            {ThemeKeyList.map((theme) => 
              <Grid item style={{ flexBasis: '22%' }} key={theme}>
                <Paper className={classes.paper}>{theme}</Paper>
              </Grid>
            )}
          </Grid>
          {letters.map((letter, index) => (
            <Grid container key={index}>
              <Grid item style={{ flexBasis: '12%' }}>
                <Paper className={classes.paper}>{letter}</Paper>
              </Grid>
              {ThemeKeyList.map((_, i) => (
                <Grid item key={i} className={`${classes.column} ${checkLines && checkLines[index][i] && classes.validColumn}`} style={{ flexBasis: '22%' }}>
                  <TextField
                    className={`${classes.paper} ${classes.customTextField}`}
                    onChange={handleTextFieldChange(index, i)}
                    disabled={checkLines !== null || isLoading}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

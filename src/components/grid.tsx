import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { ThemeList, Themes, randomLetter } from '../util/rapidapi.ts';
import TextField from '@mui/material/TextField';
import {useCallback, useState} from "react";
import {verifyWord} from "./verifyWord.ts";
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

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
    }
  }),
);

export default function BacGrid() {
  const classes = useStyles();
  const [rowData, setRowData] = useState<[string, string[]][]>([]); // Utilisez un tableau bidimensionnel pour stocker les données de chaque ligne
  const [searchParams] = useSearchParams();
  const playerName = searchParams.get('playerName')
  const nav = useNavigate()

  const handleButtonClick = useCallback(() => {
    nav(`/scores?playerName=${playerName}`)
  }, [playerName, nav])

  const handleRandomLetter = useCallback(() => {
    const newLetter = randomLetter();
    setRowData(prev => [...prev, [newLetter, ThemeList.map(() => '')]]);
  }, []);

  console.log(rowData)

  if (!playerName) {
    return <Navigate to='/' />
  }

  const handleTextFieldChange = (rowIndex: number, themeIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = [...rowData];
    newData[rowIndex][1][themeIndex] = event.target.value;
    setRowData(newData);
  };

  const handleValidateLine = async () => {
    const currentLineData = rowData[rowData.length - 1];

    for (let i = 0; i < currentLineData[1].length; i++ ) {
      const data = currentLineData[1][i]
      if (!data) {
        return
      }

      const theme = ThemeList[i]
      await verifyWord(playerName, data, Themes[theme], currentLineData[0]);
    }
  };

  return (
    <>
      <div className={classes.divbutton}>
        <Button className={classes.button} onClick={handleValidateLine}>
          VALIDER LA LIGNE
        </Button>
        <Button className={classes.button} onClick={handleRandomLetter}>
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
            {ThemeList.map((theme) => 
              <Grid item style={{ flexBasis: '22%' }}>
                <Paper className={classes.paper}>{theme}</Paper>
              </Grid>)}
          </Grid>
          {rowData.map((data, index) => (
            <Grid container key={index}>
              <Grid item style={{ flexBasis: '12%' }}>
                <Paper className={classes.paper}>{data[0]}</Paper>
              </Grid>
              {ThemeList.map((_, i) => (
                <Grid item key={i} className={classes.column} style={{ flexBasis: '22%' }}>
                <TextField
                  className={`${classes.paper} ${classes.customTextField}`}
                  onChange={handleTextFieldChange(index, i)}
                />
              </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </div>
      <Button variant="contained" onClick={handleButtonClick}>Voir Scores</Button>
    </>
  );
}

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { Themes, randomLetter } from '../util/rapidapi.ts';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {verifyWord} from "./verifyWord.ts";
import { useSearchParams } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      border: "1px solid",
      borderRadius: 0,
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
function getThemeByIndex(index: number): Themes | undefined {
  const themeKeys = Object.keys(Themes).filter(key => isNaN(Number(key)));
  const themeValues = themeKeys.map(key => Themes[key as keyof typeof Themes]);
  return themeValues[index];
}

export default function BacGrid() {
  const classes = useStyles();
  const [letters, setLetters] = useState<string[]>([]);
  const [rowData, setRowData] = useState<string[][]>([]);
  const [searchParams] = useSearchParams();
  const playerName = searchParams.get('playerName')

  const [colorVerif, setColorVerif] = useState<string>("white");
  const categories = ["Lettre", "Vetement", "Metier", "Animal", "Nourriture"];

  if (!playerName) {
    window.location.href = '/'
    return
  }
  const handleButtonClick = () => {

    window.location.href = `/scores?playerName=${playerName}`;
    return
  }
  const handleRandomLetter = () => {
    const newLetter = randomLetter();
    setLetters(prevLetters => [...prevLetters, newLetter]);
    setRowData(prevRowData => [...prevRowData, Array.from({ length: 4 }, () => "")]);
  };

  const handleTextFieldChange = (rowIndex: number, colIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = [...rowData];
    newData[rowIndex][colIndex] = event.target.value;
    setRowData(newData);
  };

  const handleValidateLine = async () => {
    const currentLineData = rowData[rowData.length - 1];
    for (let i = 0; i < currentLineData.length; i++ ) {
      if (getThemeByIndex(i) && currentLineData[i]) {
        const themeByIndex = getThemeByIndex(i) as Themes;
        const isValid = await verifyWord(currentLineData[i], themeByIndex, letters[letters.length - 1]);
        if (isValid.data === "ok") {
          setColorVerif("green");
        }
        console.log(isValid.data);
      }
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
            <Grid container alignItems="center">
                {categories.map((category, index) => (
                    <Grid item key={index} style={{ flexBasis: '20%'}}>
                        <Paper className={classes.paper} style={{ backgroundColor: colorVerif }}>{category}</Paper>
                    </Grid>
                ))}
            </Grid>


          {letters.map((letter, index) => (
            <Grid container key={index}>
              <Grid item style={{ flexBasis: '20%', backgroundColor: 'white' }}>
                <Paper className={classes.paper}>{letter}</Paper>
              </Grid>
              {[...Array(4)].map((_, i) => (
                <Grid item key={i} className={classes.column} style={{ flexBasis: '20%', backgroundColor: 'white' }}>
                <TextField
                  className={`${classes.paper} ${classes.customTextField}`}
                  value={rowData[index] ? rowData[index][i] : ""}
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

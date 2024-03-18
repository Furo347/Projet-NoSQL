import { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { Themes, checkWord, randomLetter } from '../api/checkWords';
import TextField from '@mui/material/TextField';

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
  const [letters, setLetters] = useState<string[]>([]);
  const [rowData, setRowData] = useState<string[][]>([]); // Utilisez un tableau bidimensionnel pour stocker les données de chaque ligne

  const handleRandomLetter = () => {
    const newLetter = randomLetter();
    setLetters(prevLetters => [...prevLetters, newLetter]);
    // Ajoute un nouvel élément vide à rowData pour la nouvelle ligne
    setRowData(prevRowData => [...prevRowData, Array.from({ length: 4 }, () => "")]);
  };

  const handleTextFieldChange = (rowIndex: number, colIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = [...rowData];
    newData[rowIndex][colIndex] = event.target.value;
    setRowData(newData);
  };

  const handleValidateLine = async () => {
    // Récupère les données de la ligne actuelle
    const currentLineData = rowData[rowData.length - 1];
    console.log("Données de la ligne actuelle :", currentLineData);
    console.log(checkWord("Crocodile", Themes.Animal))
    const isValid = await checkWord(currentLineData[0], Themes.Vetement); // Par exemple, en supposant que le thème est Animal
    console.log("Validation de la ligne :", isValid);
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
            <Grid item style={{ flexBasis: '22%' }}>
              <Paper className={classes.paper}>Vetement</Paper>
            </Grid>
            <Grid item style={{ flexBasis: '22%' }}>
              <Paper className={classes.paper}>Metier</Paper>
            </Grid>
            <Grid item style={{ flexBasis: '22%' }}>
              <Paper className={classes.paper}>Animal</Paper>
            </Grid>
            <Grid item style={{ flexBasis: '22%' }}>
              <Paper className={classes.paper}>Nourriture</Paper>
            </Grid>
          </Grid>
          {letters.map((letter, index) => (
            <Grid container key={index}>
              <Grid item style={{ flexBasis: '12%' }}>
                <Paper className={classes.paper}>{letter}</Paper>
              </Grid>
              {[...Array(4)].map((_, i) => (
                <Grid item key={i} className={classes.column} style={{ flexBasis: '22%' }}>
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
    </>
  );
}

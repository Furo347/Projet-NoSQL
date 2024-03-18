import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

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
    }),
);

export default function BacGrid() {
    const classes = useStyles();

    const handleButtonClick = () => {
        window.location.href = '/scores';
    }

    return (
    <>
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.title}>Jeu du baccalauréat</Paper>
                </Grid>
                <Grid container>
                    <Grid item style={{ flexBasis: '10%' }}>
                        <Paper className={classes.paper}>Prénom</Paper>
                    </Grid>
                    <Grid item style={{ flexBasis: '15%' }}>
                        <Paper className={classes.paper}>Prénom</Paper>
                    </Grid>
                    <Grid item style={{ flexBasis: '15%' }}>
                        <Paper className={classes.paper}>Objet</Paper>
                    </Grid>
                    <Grid item style={{ flexBasis: '15%' }}>
                        <Paper className={classes.paper}>Animal</Paper>
                    </Grid>
                    <Grid item style={{ flexBasis: '15%' }}>
                        <Paper className={classes.paper}>Ville ou pays</Paper>
                    </Grid>
                    <Grid item style={{ flexBasis: '15%' }}>
                        <Paper className={classes.paper}>Métier</Paper>
                    </Grid>
                    <Grid item style={{ flexBasis: '15%' }}>
                        <Paper className={classes.paper}>Fruit ou légume</Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        <Button variant="contained" onClick={handleButtonClick}>Voir scores</Button>
    </>
    );
}
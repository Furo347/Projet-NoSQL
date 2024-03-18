import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import {Themes} from "../api/checkWords.ts";

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

    const renderGridItems = () => {
        return Object.values(Themes).map(theme => (
            <Grid item style={{ flexBasis: '15%' }} key={theme}>
                <Paper className={classes.paper}>{theme}</Paper>
            </Grid>
        ));
    }

    return (
        <>
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.title}>Jeu du baccalauréat</Paper>
                    </Grid>
                    <Grid container>
                        {renderGridItems()}
                    </Grid>
                </Grid>
            </div>
            <Button variant="contained" onClick={handleButtonClick}>Voir scores</Button>
        </>
    );
}

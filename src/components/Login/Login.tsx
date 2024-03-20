import { SetStateAction, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

import {style} from './Login.style'

export default function Login() {
    const [playerName, setPlayerName] = useState('');

    const handleInputChange = useCallback((event: { target: { value: SetStateAction<string>; }; }) => {
        setPlayerName(event.target.value);
    }, []);

    return (
        <div>
            <Dialog open={true}>
                <DialogTitle>Enter Player Name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Player Name"
                        type="text"
                        fullWidth
                        value={playerName}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Link to={`/game?playerName=${playerName}`} aria-disabled={playerName.length === 0} style={playerName.length === 0 ? style.linkDisabled : undefined}>
                        <Button color="primary" disabled={playerName.length === 0}>
                            Save
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}

import { SetStateAction, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';

export default function PlayerNameDialog() {
  const [open, setOpen] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log('Player Name:', playerName);
    setOpen(false);
    navigate("/game")
  };

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPlayerName(event.target.value);
  };

  return (
    <div>
      <Dialog open={open}>
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

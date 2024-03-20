import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import PlayerNameDialog from './components/identification';
import './App.css';
import BacGrid from './components/grid';
=======
import Game from './components/Game'
import Login from './components/Login/Login'
import Scoreboard from './components/Scoreboard/Scoreboard';
>>>>>>> feature/tab

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/game" element={<Game />} />
              <Route path="/scores" element={<Scoreboard />} />
          </Routes>
      </Router>
  )
}

export default App;

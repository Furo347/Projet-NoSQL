import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game'
import Login from './components/Login/Login'
import Scoreboard from './components/Scoreboard/Scoreboard';

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

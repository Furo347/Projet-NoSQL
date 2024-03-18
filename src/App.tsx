import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BacGrid from './components/grid'
import PlayerNameDialog from './components/identification'
import ScoreboardPage from './components/Score/Score';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/game" element={<BacGrid />} />
              <Route path="/" element={<PlayerNameDialog />} />
              <Route path="/scores" element={<ScoreboardPage />} />
          </Routes>
      </Router>
  )
}

export default App

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BacGrid from './components/grid'
import PlayerNameDialog from './components/identification'

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/game" element={<BacGrid />} />
              <Route path="/" element={<PlayerNameDialog />} />
          </Routes>
      </Router>
  )
}

export default App

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerNameDialog from './components/identification';
import './App.css';
import BacGrid from './components/grid';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/game" element={<BacGrid />} />
        <Route path="/" element={<PlayerNameDialog />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerNameDialog from './compoments/identification';
import './App.css';
import BacGrid from './compoments/grid';

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

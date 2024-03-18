import { Route, Routes } from 'react-router-dom';
import BacGrid from './components/grid';
import PlayerNameDialog from './components/identification';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PlayerNameDialog />} />
      <Route path="/game" element={<BacGrid />} />
    </Routes>
  );
}

export default AppRouter;

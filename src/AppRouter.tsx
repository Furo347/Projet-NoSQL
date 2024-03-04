import { Route, Routes } from 'react-router-dom';
import BacGrid from './compoments/grid'; 
import PlayerNameDialog from './compoments/identification';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PlayerNameDialog />} />
      <Route path="/game" element={<BacGrid />} />
    </Routes>
  );
}

export default AppRouter;

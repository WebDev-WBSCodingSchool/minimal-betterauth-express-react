import { Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProtectedLayout from './layouts/ProtectedLayout';
import ProtectedContent from './pages/ProtectedContent';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='protected' element={<ProtectedLayout />}>
          <Route index element={<ProtectedContent />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

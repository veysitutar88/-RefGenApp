import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CharactersPage from './pages/CharactersPage';
import ShotsPage from './pages/ShotsPage';
import OutputsPage from './pages/OutputsPage';
import RunPage from './pages/RunPage';
import OutputDetailsPage from './pages/OutputDetailsPage';
import ExportsPage from './pages/ExportsPage';
import SettingsPage from './pages/SettingsPage';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Navigate to="/outputs" replace />} />
      <Route path="/outputs" element={<OutputsPage />} />
      <Route path="/outputs/:outputId" element={<OutputDetailsPage />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/shots" element={<ShotsPage />} />
      <Route path="/run" element={<RunPage />} />
      <Route path="/exports" element={<ExportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  </Layout>
);

export default App;

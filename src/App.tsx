import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DynastyPage from './pages/DynastyPage';
import RulerPage from './pages/RulerPage';
import MonumentPage from './pages/MonumentPage';
import TimelinePage from './pages/TimelinePage';
import MonumentsPage from './pages/MonumentsPage';
import ComparePage from './pages/ComparePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dynasty/:dynastyId" element={<DynastyPage />} />
          <Route path="ruler/:rulerId" element={<RulerPage />} />
          <Route path="monument/:monumentId" element={<MonumentPage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="monuments" element={<MonumentsPage />} />
          <Route path="compare" element={<ComparePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
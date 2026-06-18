import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Add other pages here as you create them */}
        <Route path="/cake-page" element={<div className="w-full h-screen bg-black flex items-center justify-center text-white"><h1>Cake Page - Coming Soon! 🎂</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;

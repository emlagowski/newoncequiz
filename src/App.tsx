import { Route, Routes } from 'react-router';
import './App.css';
import { CategoryPage } from './CategoriesPage';
import { GamePage } from './GamePage';
import { WelcomePage } from './WelcomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/game" element={<GamePage/>} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;

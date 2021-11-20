import { Route, Routes } from 'react-router';
import './App.css';
import { CategoryPage } from './CategoriesPage';
import { RankPage } from './RankPage';
import { GamePage } from './GamePage';
import { WelcomePage } from './WelcomePage';
import { QuizSummaryPage } from './QuizSummaryPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/rank" element={<RankPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/result" element={<QuizSummaryPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;

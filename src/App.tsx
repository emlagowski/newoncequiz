import { Route, Routes } from 'react-router';
import './App.css';
import { WelcomePage } from './WelcomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage/>}/>
    </Routes>
  );
}

export default App;

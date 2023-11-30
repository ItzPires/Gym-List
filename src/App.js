import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Exercises from './Pages/Exercises/Exercises';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/exercises" element={<Exercises />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

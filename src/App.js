import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Exercises from './Pages/Exercises/Exercises';
import ExercisesIndividual from './Pages/ExercisesIndividual/ExercisesIndividual';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/:id" element={<ExercisesIndividual />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Exercises from './Pages/Exercises/Exercises';
import ExercisesIndividual from './Pages/ExercisesIndividual/ExercisesIndividual';
import Navbar from './Components/NavBar/NavBar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/exercises/:id" element={<ExercisesIndividual />} />
          <Route path="/exercises/:search?/:equipment?/:bodyPart?" element={<Exercises />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

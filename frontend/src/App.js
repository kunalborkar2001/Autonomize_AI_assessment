import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home';
import RepositoriesList from './pages/RepositoriesList/RepositoriesList';
import RepoDescription from './pages/RepoDescription/RepoDescription';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/repolist/:username`} element={<RepositoriesList />} />
          <Route path="/repodesription" element={<RepoDescription />} />
          
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

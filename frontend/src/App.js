import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home';
import RepositoriesList from './pages/RepositoriesList/RepositoriesList';
import RepoDescription from './pages/RepoDescription/RepoDescription';
import InputBox from "./components/InputBox/InputBox"
import FollowersPage from "./pages/FollowersPage/FollowersPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <InputBox />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/repolist/:username`} element={<RepositoriesList />} />
          <Route path={`/repodesription/:username`} element={<RepoDescription />} />   
          <Route path={`/followers/:username`} element={<FollowersPage />} />   
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

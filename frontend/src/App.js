import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import RepositoriesList from './pages/RepositoriesList/RepositoriesList';
import RepoDescription from './pages/RepoDescription/RepoDescription';

function App() {
  return (
    <div className="App">
      <Home />
      <RepositoriesList />
      <RepoDescription />
    </div>
  );
}

export default App;

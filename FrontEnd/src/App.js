import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Configurator from './components/Configurator'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ultimate Drone Configurator</h1>
      </header>
      
      <Configurator />
    </div>
  );
}

export default App;

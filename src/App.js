import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Configurator from './components/Configurator'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Configure your Drone:</h1>
        <Configurator />
      </header>
    </div>
  );
}

export default App;

import './App.css';
import CircleTask from './components/CircleTask';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <CircleTask  name="Vedio Hub" desc='To share media between business and its users' tasks={[]}/>
      </header>
    </div>
  );
}

export default App;

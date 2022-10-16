import "./App.css";
import CircleTask from "./components/CircleTask";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CircleTask name="" desc="" tasks={[]} />
      </header>
    </div>
  );
}

export default App;

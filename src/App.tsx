import "./App.css";
import CircleTask from "./components/CircleTask";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CircleTask
          name="Parayada"
          description="The next and ever best learning platform"
          tasks={[]}
        />
      </header>
    </div>
  );
}

export default App;

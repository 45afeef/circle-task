import { createContext } from "react";
import "./App.css";
import CircleTask from "./components/CircleTask";
import { task } from "./components/CircleTask/CircleTask";

const myProject: task = { name: "", description: "", tasks: [] };

export const ProjectContext = createContext<task>({
  name: "Project Name",
  description: "Project description",
  tasks: [],
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ProjectContext.Provider value={myProject}>
          <CircleTask taskIndex={"0"} />
        </ProjectContext.Provider>
      </header>
    </div>
  );
}

export default App;

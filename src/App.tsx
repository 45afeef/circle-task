import { createContext } from "react";
import "./App.css";
import CircleTask from "./components/CircleTask";
import { task } from "./components/CircleTask/CircleTask";

const myProject: task = {
  name: "0 Parayada",
  description:
    "Super effective learning platform for everyone, totally personalized",
  tasks: [
    {
      name: "0.0 Frontend",
      description: "Plan, Design and Develop",
      tasks: [
        {
          name: "0.0.0 Plan Frontend",
          description: "This is our needs",
          tasks: [],
        },
        {
          name: "0.0.1 Design Frontend",
          description: "Designing starts while planning",
          tasks: [],
        },
        {
          name: "0.0.2 Develop Frontend",
          description: "Development starts along with designing",
          tasks: [],
        },
      ],
    },
    {
      name: "0.1 Backend",
      description: "Plan, and Develop",
      tasks: [
        {
          name: "0.1.0 Plan",
          description: "We are planning to use Django",
          tasks: [],
        },
        {
          name: "0.1.1 Develop",
          description: "Something after designing",
          tasks: [
            {
              name: "0.1.1.0 API",
              description: "Going to be done by fazil",
              tasks: [],
            },
          ],
        },
      ],
    },
    {
      name: "0.2 Database",
      description: "Design data models and create required tables",
      tasks: [],
    },
  ],
};

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

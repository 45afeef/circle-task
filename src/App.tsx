import "./App.css";
import CircleTask from "./components/CircleTask";
import { task } from "./components/CircleTask/CircleTask";

const myProject: task = {
  name: "Parayada",
  description: "afeef",
  tasks: [
    {
      name: "Frontend",
      description: "Plan, Design and Develop",
      tasks: [
        { name: "Plan Frontend", description: "This is our needs", tasks: [] },
        {
          name: "Design Frontend",
          description: "Designing starts while planning",
          tasks: [],
        },
        {
          name: "Develop Frontend",
          description: "Development starts along with designing",
          tasks: [],
        },
      ],
    },
    {
      name: "Backend",
      description: "Plan, and Develop",
      tasks: [
        {
          name: "Plan",
          description: "We are planning to use Django",
          tasks: [],
        },
        {
          name: "Develp",
          description: "Something after designing",
          tasks: [
            {
              name: "API",
              description: "Going to be done by fazil",
              tasks: [],
            },
          ],
        },
      ],
    },
  ],
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CircleTask {...myProject} />
      </header>
    </div>
  );
}

export default App;

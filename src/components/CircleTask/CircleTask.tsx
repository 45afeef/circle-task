import { FC, useState } from "react";
import s from "./CircleTask.module.css";

type task = {
  name: string;
  desc: string;
  tasks: task[];
};

const CircleTask: FC<task> = ({ name, desc, tasks }) => {
  // Utility fucntion to refresh the component
  const [state, setState] = useState(true);
  const refresh = () => setState(!state);

  const initNewTask = () => {
    tasks.push({ name: "1", desc: "3", tasks: [] });
    refresh();
  };

  console.log("size of task " + tasks.length);
  return (
    <div className={s.root}>
      <h1 className={s.heading}>{name}</h1>
      <p className={s.desc}>{desc}</p>
      {tasks.length < 5 && (
        <img className={s.button} src="./add.svg" onClick={initNewTask} />
      )}
      {tasks.map((task, i) => {
        return (
          <div key={i} className={s.orbit}>
            <div className={s.taskContainer}>
              <div className={s.task}>
                <h1>Task {i}</h1>
                <p>{task.name}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CircleTask;

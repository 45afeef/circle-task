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
    tasks.push({ name: "Task Name", desc: "description", tasks: [] });
    refresh();
  };

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
                <div className={s.taskProgress}>
                  <img src="./waves.svg" />
                  <div></div>
                </div>
                <h1 contentEditable suppressContentEditableWarning>
                  {task.name}
                </h1>
                <p contentEditable suppressContentEditableWarning>
                  {task.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CircleTask;

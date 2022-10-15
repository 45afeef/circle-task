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

  const [selected, setSelected] = useState(-1);

  const initNewTask = () => {
    tasks.push({ name: "Task Name", desc: "description", tasks: [] });
    refresh();
  };

  const degreeOfSection = 360 / (tasks.length + 1);
  return (
    <div className={s.root} onMouseLeave={() => setSelected(-1)}>
      <h1 className={s.heading}>{name}</h1>
      <p className={s.desc}>{desc}</p>
      {tasks.length < 11 && (
        <img className={s.button} src="./add.svg" onClick={initNewTask} />
      )}
      {tasks.map(({ name, desc }, i) => {
        const rotation = degreeOfSection * (i + 1);
        return (
          <div
            key={i}
            className={s.axis}
            style={{
              rotate: `-${rotation}deg`,
              height:
                selected === -1 ? "90%" : selected === i ? "30vmin" : "105%",
            }}
          >
            <div>
              <div
                className={s.task}
                style={{
                  rotate: `${rotation}deg`,
                  scale: selected === -1 ? ".8" : selected === i ? "2" : ".3",
                }}
                onMouseEnter={() => setSelected(i)}
              >
                <div
                  className={s.taskProgress}
                  style={{ height: `${i * 10}%` }}
                >
                  <img src="./waves.svg" />
                  <div></div>
                </div>
                <h1
                  contentEditable
                  suppressContentEditableWarning
                  onFocus={() => setSelected(i)}
                >
                  {name} {i}
                </h1>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onFocus={() => setSelected(i)}
                >
                  {desc}
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

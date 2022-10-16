import { FC, useState } from "react";
import InputBox from "../Common/InputBox";
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
      {/* Check if name is provided, if not get it */}
      {name ? (
        <h1 className={s.heading}>{name}</h1>
      ) : (
        <InputBox
          minLength={5}
          onSubmit={(newName: string) => {
            alert("the new name is " + newName);
            name = newName;
            refresh();
          }}
          className={s.heading}
          placeHolder="Enter project name here"
        />
      )}
      <p className={s.desc}>{desc}</p>
      {/* New task button */}
      {name && desc && tasks.length < 11 && (
        <img className={s.button} src="./add.svg" onClick={initNewTask} />
      )}
      {/* Section for sub tasks starts here */}
      {tasks.map(({ name, desc }, i) => {
        const rotation = degreeOfSection * (i + 1);
        return (
          // .axis and its first child manages the rotation
          <div
            key={i}
            className={s.axis}
            style={{
              rotate: `-${rotation}deg`,
              height:
                selected === -1 ? "90%" : selected === i ? "30vmin" : "105%",
            }}
          >
            {/* This div helps in rotating  */}
            <div>
              {/* sub task */}
              <div
                className={s.task}
                style={{
                  rotate: `${rotation}deg`,
                  scale: selected === -1 ? ".8" : selected === i ? "2" : ".3",
                }}
                onMouseEnter={() => setSelected(i)}
              >
                {/* sub task progress */}
                <div
                  className={s.taskProgress}
                  style={{ height: `${i * 10}%` }}
                >
                  <img src="./waves.svg" />
                  <div></div>
                </div>
                {/* sub task name */}
                <h1
                  contentEditable
                  suppressContentEditableWarning
                  onFocus={() => setSelected(i)}
                >
                  {name} {i}
                </h1>
                {/* sub task description */}
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
      {/* Section for tasks ends here */}
    </div>
  );
};

export default CircleTask;

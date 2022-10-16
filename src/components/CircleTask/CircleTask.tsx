import { FC, useState, useReducer } from "react";
import InputBox from "../Common/InputBox";
import s from "./CircleTask.module.css";

type task = {
  name: string;
  description: string;
  tasks: task[];
};

const CircleTask: FC<task> = (mainTask) => {
  // reducer to store all data in this componentd
  const reducer = (state: task, update: any): task => {
    return { ...state, ...update };
  };
  const [state, updateMainTask] = useReducer(reducer, mainTask);

  // selected subtask indicator, this helps in zooming the hovering subtask
  const [selected, setSelected] = useState(-1);
  // degreeOrSection helps in deciding the rotation angle of each sub task
  const degreeOfSection = 360 / (state.tasks.length + 1);

  return (
    <div className={s.root} onMouseLeave={() => setSelected(-1)}>
      {/* Check if name is provided, if not get it */}
      {state.name ? (
        <h1 className={`${s.heading} animate-fromCenter`}>{state.name}</h1>
      ) : (
        <div className="animate-zoom-in">
          <InputBox
            minLength={5}
            onSubmit={(newName: string) => updateMainTask({ name: newName })}
            className={s.heading}
            placeHolder="Enter your project name"
          />
        </div>
      )}
      {/* Check if description is provided, if not get it */}
      {state.description ? (
        <p className={`${s.desc} animate-fromCenter`}>{state.description}</p>
      ) : (
        state.name && (
          <div className="animate-zoom-in w-full">
            <InputBox
              minLength={20}
              onSubmit={(newDesc: string) =>
                updateMainTask({ description: newDesc })
              }
              className={`${s.desc} rounded border-black border-2`}
              placeHolder="Describe your project here"
              textarea
            />
          </div>
        )
      )}
      {/* New task button */}
      {state.name && state.description && state.tasks.length < 11 && (
        <>
          <img
            className={`${s.button} animate-zoom-in`}
            src="./add.svg"
            onClick={() =>
              updateMainTask({
                tasks: [
                  ...state.tasks,
                  { name: "Task", description: "description", tasks: [] },
                ],
              })
            }
          />
          <p
            className="text-base whitespace-nowrap text-center animate-zoom-in"
            style={{ marginTop: "11%" }}
          >
            Click to create tasks
          </p>
        </>
      )}
      {/* Section for sub tasks starts here */}
      {state.tasks.map(({ name, description }, i) => {
        const rotation = degreeOfSection * (i + 1);
        // TODO change the demo progress to original one, which is different for each task
        const progress = i * 10;
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
                  style={{ height: `${progress}%` }}
                >
                  <img src="./waves.svg" />
                  <div></div>
                </div>
                <p className="absolute bottom-0 text-xs">{progress}%</p>
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
                  {description}
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

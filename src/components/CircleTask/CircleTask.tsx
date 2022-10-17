import { FC, useReducer } from "react";
import InputBox from "../Common/InputBox";
import s from "./CircleTask.module.css";

type task = {
  name: string;
  description: string;
  tasks: task[];
  selected: number;
};

const CircleTask: FC<task> = (mainTask) => {
  // reducer to store all data in this componentd
  const reducer = (state: task, update: any): task => {
    return { ...state, ...update };
  };
  // selected variable is used to indicate the currently selected subtask
  const [state, dispatch] = useReducer(reducer, {
    ...mainTask,
    selected: -1,
  });

  // degreeOrSection helps in deciding the rotation angle of each sub task
  const degreeOfSection = 360 / (state.tasks.length + 1);

  return (
    <div className={s.root} onMouseLeave={() => dispatch({ selected: -1 })}>
      {/* Check if name is provided, if not get it */}
      {state.name ? (
        <h1 className={`${s.heading} animate-fromCenter`}>{state.name}</h1>
      ) : (
        <div className="animate-zoom-in">
          <InputBox
            minLength={5}
            onSubmit={(newName: string) => dispatch({ name: newName })}
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
              onSubmit={(newDesc: string) => dispatch({ description: newDesc })}
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
              dispatch({
                tasks: [
                  ...state.tasks,
                  {
                    name: "Task",
                    description: "description",
                    tasks: [],
                  },
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
                state.selected === -1
                  ? "90%"
                  : state.selected === i
                  ? "30vmin"
                  : "105%",
            }}
          >
            {/* This div helps in rotating  */}
            <div>
              {/* sub task */}
              <div
                className={s.task}
                style={{
                  rotate: `${rotation}deg`,
                  scale:
                    state.selected === -1
                      ? ".8"
                      : state.selected === i
                      ? "2"
                      : ".3",
                }}
                onMouseEnter={() => dispatch({ selected: i })}
                onClick={() => {
                  console.log("removing " + i);
                  state.tasks.splice(i, 1);
                  dispatch({
                    selected: -1,
                  });
                }}
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
                  onFocus={() => dispatch({ selected: i })}
                >
                  {name}
                </h1>
                {/* sub task description */}
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onFocus={() => dispatch({ selected: i })}
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

import { FC, useContext, useReducer } from "react";
import { ProjectContext } from "../../App";
import EditableText from "../Common/EditableText";
import InputBox from "../Common/InputBox";
import s from "./CircleTask.module.css";

export type task = {
  name: string;
  description: string;
  tasks: task[];
};

type circleTaskState = {
  // task is the currently shown task, it can be the Project task itself or any other task in the project tree
  task: task;
  // selected is the index of selected sub task, it will be -1 if not selected anything
  selected: number;
  // taskIndex is used to identify the current task from the tree, we are using index based "." notation to make taskIndex.
  // eg. "0.1.0.3" is the index of 4th task in the 1st task in the 2nd task in the 1st Project
  taskIndex: string;
};

enum Action {
  // Used to create new sub task for the currently opened task
  newTask,
  // Used to update fields of the currently opened task like name, description etc
  updateTask,
  // Used to update the fields of the currently selected sub task like name, description etc
  updateSubTask,
  // Used to Highlight the selected subtask from currently opened task. The selected task should bring in front
  selectTask,
  // Used to Open a subtask from the currently Opened task. After this the newly Opened sub task will become new current task
  openTask,
}

const CircleTask: FC<{ taskIndex: string }> = ({ taskIndex }) => {
  const project = useContext(ProjectContext);

  const reducer = (
    state: circleTaskState,
    { action, data }: { action: Action; data: any }
  ): circleTaskState => {
    switch (action) {
      case Action.newTask:
        // use reducer triggered two time every time,
        // so I'm using this wired way to solve the problem of multiple new task creation bug in single click
        if (state.task.tasks.length === data.taskLength)
          state.task.tasks.push({
            name: "Dummy Task",
            description: "Dummy Description",
            tasks: [],
          });
        return { ...state, selected: data.taskLength };
      case Action.updateTask:
        return { ...state, task: { ...state.task, ...data } };
      case Action.updateSubTask:
        state.task.tasks[data.taskIndex] = {
          ...state.task.tasks.at(data.taskIndex),
          ...data.task,
        };
        return { ...state };
      case Action.selectTask:
        return { ...state, selected: data };
      case Action.openTask:
        // The ProjectTask will always have the taskIndex "0"
        var task = { ...project };
        if (data.length <= 2)
          return { task: task, selected: -1, taskIndex: "0" };

        // Removing the leading "0." so get inside each child task
        data
          .substr(2)
          .split(".")
          .forEach((i: string) => {
            var newTask = task.tasks.at(parseInt(i));
            if (newTask) {
              task = newTask;
            }
          });

        return { task: task, selected: -1, taskIndex: data };
      default:
        console.error("what happened here", state);
        return { ...state };
    }
  };

  // selected variable is used to indicate the currently selected subtask
  const [state, dispatch] = useReducer(reducer, {
    task: project,
    selected: -1,
    taskIndex: taskIndex,
  });

  // degreeOrSection helps in deciding the rotation angle of each sub task
  const degreeOfSection = 360 / (state.task.tasks.length + 1);

  return (
    <div
      className={s.root}
      onMouseLeave={() => dispatch({ action: Action.selectTask, data: -1 })}
    >
      {/* Check if name is provided, if not get it */}
      {state.task.name ? (
        <h1 className={`${s.heading} animate-fromCenter`}>{state.task.name}</h1>
      ) : (
        <div className="animate-fade-in">
          <InputBox
            minLength={5}
            onSubmit={(newName: string) =>
              dispatch({
                action: Action.updateTask,
                data: { name: newName },
              })
            }
            className={s.heading}
            placeHolder="Enter your project name"
          />
        </div>
      )}
      {/* Check if description is provided, if not get it */}
      {state.task.description ? (
        <p className={`${s.desc} animate-fromCenter`}>
          {state.task.description}
        </p>
      ) : (
        state.task.name && (
          <div className="animate-fade-in w-full">
            <InputBox
              minLength={20}
              onSubmit={(newDesc: string) =>
                dispatch({
                  action: Action.updateTask,
                  data: { description: newDesc },
                })
              }
              className={`${s.desc} rounded border-black border-2`}
              placeHolder="Describe your project here"
              textarea
            />
          </div>
        )
      )}
      {/* New task button */}
      {state.task.name &&
        state.task.description &&
        state.task.tasks.at(-1)?.name !== "Dummy Task" &&
        state.task.tasks.length < 11 && (
          <>
            <img
              className={`${s.button} animate-fade-in`}
              src="./add.svg"
              alt="new task"
              onClick={() =>
                // Add new task
                dispatch({
                  action: Action.newTask,
                  data: { taskLength: state.task.tasks.length },
                })
              }
            />
            <p
              className="text-base whitespace-nowrap text-center animate-fade-in"
              style={{ marginTop: "11%" }}
            >
              Click to create tasks
            </p>
          </>
        )}
      {/* Hide the BACK button for the project task */}
      {state.taskIndex.length > 2 && (
        <button
          className="bottom-0"
          onClick={() => {
            // Open Parent task
            dispatch({
              action: Action.openTask,
              data: state.taskIndex.slice(0, -2),
            });
          }}
        >
          Back
        </button>
      )}
      {/* Section for sub tasks starts here */}
      {state.task.name &&
        state.task.description &&
        state.task.tasks.map(({ name, description }: any, i: number) => {
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
                  onMouseEnter={() => {
                    // Highlight the selected task
                    dispatch({
                      action: Action.selectTask,
                      data: i,
                    });
                  }}
                >
                  {/* Wave animated progress indicator of each and every task */}
                  <div
                    className={s.taskProgress}
                    style={{ height: `${progress}%` }}
                  >
                    <img src="./waves.svg" alt={`completed ${progress}%`} />
                    <div></div>
                  </div>
                  <button
                    className="absolute top-0 text-xs"
                    onClick={() => {
                      // Open child task
                      dispatch({
                        action: Action.openTask,
                        data: state.taskIndex + "." + i,
                      });
                    }}
                  >
                    Open
                  </button>

                  {/* sub task name */}
                  <EditableText
                    text={name}
                    editable
                    className={s.taskName}
                    onUpdate={(newName) => {
                      console.log("wow the new name is " + newName);
                      dispatch({
                        action: Action.updateSubTask,
                        data: { task: { name: newName }, taskIndex: i },
                      });
                    }}
                    onFocus={() =>
                      dispatch({
                        action: Action.selectTask,
                        data: i,
                      })
                    }
                  />

                  {/* sub task description */}
                  <EditableText
                    text={description}
                    editable
                    className={s.taskDescription}
                    onUpdate={(newDescription) => {
                      dispatch({
                        action: Action.updateSubTask,
                        data: {
                          task: { description: newDescription },
                          taskIndex: i,
                        },
                      });
                    }}
                    onFocus={() =>
                      dispatch({
                        action: Action.selectTask,
                        data: i,
                      })
                    }
                  />
                  {/* Progress number by percentage */}
                  <p className="absolute bottom-0 text-xs">{progress}%</p>
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

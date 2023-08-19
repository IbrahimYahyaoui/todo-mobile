import { createContext, useEffect, useReducer } from "react";
import { ToastAndroid } from "react-native";
import { taskType } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type StateType = {
  Tasks: Array<taskType>;
};

const initialState = {
  Tasks: [],
};

type AddTaskAction = {
  type: "Add_TASK";
  payload: taskType; // Update payload type to match taskType
};
type SetTaskAction = {
  type: "Set_Tasks";
  payload: Array<taskType>;
};

type DeleteTaskAction = {
  type: "Delete_TASK";
  payload: string; // Use lowercase 'string'
};

type ArchiveTaskAction = {
  type: "Archive_TASK";
  payload: string; // Use lowercase 'string'
};
type DoneTaskAction = {
  type: "Done_TASK";
  payload: string; // Use lowercase 'string'
};

type ActionType =
  | AddTaskAction
  | DeleteTaskAction
  | DoneTaskAction
  | ArchiveTaskAction
  | SetTaskAction;

export const TaskContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => {} });

const taskReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "Set_Tasks":
      return {
        ...state,
        Tasks: action.payload,
      };
    case "Add_TASK":
      ToastAndroid.show("New task added", ToastAndroid.SHORT);
      return {
        ...state,
        Tasks: [...state.Tasks, action.payload],
      };

    case "Archive_TASK":
      ToastAndroid.show("Task Moved", ToastAndroid.SHORT);
      return {
        ...state,
        Tasks: state.Tasks.map((task) =>
          task.TaskId === action.payload
            ? { ...task, isArchived: !task.isArchived }
            : task
        ),
      };
    case "Done_TASK":
      ToastAndroid.show("Task Status change", ToastAndroid.SHORT);
      return {
        ...state,
        Tasks: state.Tasks.map((task) =>
          task.TaskId === action.payload
            ? { ...task, isDone: !task.isDone }
            : task
        ),
      };
    case "Delete_TASK":
      ToastAndroid.show("Deleted Successfully", ToastAndroid.SHORT);
      return {
        ...state,
        Tasks: state.Tasks.filter((task) => task.TaskId !== action.payload),
      };
    default:
      return state;
  }
};

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const getDataFromLocalStorage = async () => {
    // await AsyncStorage.clear();
    const rawData = await AsyncStorage.getItem("Tasks");

    const Data: taskType[] = rawData ? JSON.parse(rawData) : [];

    dispatch({ type: "Set_Tasks", payload: Data });
    setDataInLocalStorage();
  };
  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  const setDataInLocalStorage = async () => {
    const data = await AsyncStorage.setItem(
      "Tasks",
      JSON.stringify(state.Tasks)
    );
  };

  useEffect(() => {
    setDataInLocalStorage();
    console.log(state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

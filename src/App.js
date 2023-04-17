import * as React from "react";
import { FormTaskCreate } from "./components/FormTaskCreate";
import { ListTask } from "./components/ListTask";
import { Pagination } from "./components/Pagination";
import { Report } from "./components/Report";
import { Task } from "./components/Task";
import { TaskListFilter } from "./components/TaskListFilter";
import { ContextApp, initialState, reducerApp } from "./reducerApp";

import "./styles.css";

export default function App() {
  const [state, dispatch] = React.useReducer(reducerApp, initialState);

  return (
    <ContextApp.Provider value={{ state, dispatch }}>
      <div className="App">
        <h1>Отчетность по счетам</h1>
        <FormTaskCreate
          formData={{
            reportId: "vkl_17",
            reportTitle: "Счета с отрицательным остатком",
            isPdk: false,
            scheduledTime: null,
            lifetimeLimit: 5,
            filters: {}
          }}
        />
        <ListTask
          listTask={[...Array(5).keys("")].map((element, i) => ({
            taskId: i + 1,
            reportTitle: "Счета с отрицательным остатком",
            taskStatus: 1
          }))}
        />
        <TaskListFilter />
        <Task />
        <Report />
        <Pagination />
      </div>
    </ContextApp.Provider>
  );
}

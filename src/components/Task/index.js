import * as React from "react";
import "./styleTask.css";

export const Task = ({ taskData = {} }) => {
  const [task, setTask] = React.useState({});

  React.useEffect(() => {
    setTask(taskData);
  }, []);

  return (
    <div className="styleTask">
      <h2>Просмотр задачи</h2>
      <div className="styleTaskFilters">Task Filters</div>
      <div className="styleTaskParameters">Task Parameters</div>
    </div>
  );
};

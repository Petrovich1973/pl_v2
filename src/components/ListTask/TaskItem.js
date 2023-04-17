import * as React from "react";
import "./styleListTask.css";

export const TaskItem = ({ taskData = {} }) => {
  const [task, setTask] = React.useState({});

  React.useEffect(() => {
    setTask(taskData);
  }, [taskData]);

  return (
    <li>
      <h4>
        {task?.taskId} {task?.reportTitle}
      </h4>
      <div className="styleTaskFilters">Task Item Filter</div>
      <div className="styleTaskParameters">Task Item Parameters</div>
    </li>
  );
};

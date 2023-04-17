import * as React from "react";
import { TaskItem } from "./TaskItem";
import "./styleListTask.css";

export const ListTask = ({
  listTask = [],
  title = "Список доступных задач"
}) => {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    setList(listTask);
  }, [listTask]);

  return (
    <div className="styleListTask">
      <h2>{title}</h2>
      <ul>
        {list.map((element) => (
          <TaskItem taskData={element} key={element?.taskId} />
        ))}
      </ul>
    </div>
  );
};

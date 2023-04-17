import * as React from "react";
import "./styleTaskListFilter.css";

export const TaskListFilter = ({
  listFilter = {},
  title = "Фильтр задач",
  description = "сострояние фильтра"
}) => {
  const [filter, setFilter] = React.useState({});

  React.useEffect(() => {
    setFilter(listFilter);
  }, []);

  return (
    <div className="styleTaskListFilter">
      <h2>{title}</h2>
      <div className="styleTaskListFilterDescription">{description}</div>
      <ul>
        <li>
          <h4>Наименование фильтра</h4>
          <div>поле ввода</div>
        </li>
        <li>
          <h4>Наименование фильтра</h4>
          <div>поле ввода</div>
        </li>
        <li>
          <h4>Наименование фильтра</h4>
          <div>поле ввода</div>
        </li>
      </ul>
    </div>
  );
};

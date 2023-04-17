import * as React from "react";
import "./styleReport.css";

export const Report = ({ reportData = {} }) => {
  const [report, setReport] = React.useState({});

  React.useEffect(() => {
    setReport(reportData);
  }, []);

  return (
    <div className="styleReport">
      <table>
        <thead>
          <tr>
            <th>column</th>
            <th>column</th>
            <th>column</th>
            <th>column</th>
            <th>column</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>field</td>
            <td>field</td>
            <td>field</td>
            <td>field</td>
            <td>field</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

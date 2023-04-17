import * as React from "react";
import { ContextApp } from "./reducerApp";
import axios from "axios";

const useActions = () => {
  const { state, dispatch } = React.useContext(ContextApp);
  const getReportType = async () => {
    await console.log("getReportType init");
    const response = await axios.get("http://localhost:3001/reportType");
    await console.log(response.data);
  };
  return { getReportType };
};

export { useActions };

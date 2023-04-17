import * as React from "react";
import "./stylePagination.css";

export const Pagination = ({ paginationData = {} }) => {
  const [pagination, setPagination] = React.useState({});

  React.useEffect(() => {
    setPagination(paginationData);
  }, []);

  return <div className="stylePagination">Pagination</div>;
};

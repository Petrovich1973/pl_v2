import * as React from "react";

export const ContextApp = React.createContext(null);

export const UPDATE_CONTEXT_APP = "UPDATE_CONTEXT_APP";

export const initialState = {
  getReportType: {
    load: false,
    reportTypeResponse: null
  }
};

export const reducerApp = (state, action) => {
  switch (action.type) {
    case UPDATE_CONTEXT_APP:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

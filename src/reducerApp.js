import * as React from "react";

export const ContextApp = React.createContext(null);

export const UPDATE_CONTEXT_APP = "UPDATE_CONTEXT_APP";
export const UPDATE_GET_REPORT_TYPE = "UPDATE_GET_REPORT_TYPE";
export const UPDATE_GET_REPORT_SCHEME = "UPDATE_GET_REPORT_SCHEME";
export const UPDATE_GET_BRANCH = "UPDATE_GET_BRANCH";

export const initialState = {
  getReportType: {
    load: false,
    reportTypeResponse: null,
    messages: null
  },
  getReportScheme: {
    load: false,
    reportSchemeResponse: null,
    messages: null
  },
  getBranch: {
    load: false,
    branchResponse: null,
    messages: null
  }
};

export const reducerApp = (state, action) => {
  switch (action.type) {
    case UPDATE_CONTEXT_APP:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_GET_REPORT_TYPE:
      return {
        ...state,
        getReportType: {
          ...state.getReportType,
          ...action.payload
        }
      };
    case UPDATE_GET_REPORT_SCHEME:
      return {
        ...state,
        getReportScheme: {
          ...state.reportSchemeResponse,
          ...action.payload
        }
      };
    case UPDATE_GET_BRANCH:
      return {
        ...state,
        getBranch: {
          ...state.getBranch,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

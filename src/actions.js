import * as React from "react";
import {ContextApp, initialState, UPDATE_CONTEXT_APP, UPDATE_GET_REPORT_TYPE, UPDATE_GET_REPORT_SCHEME, UPDATE_GET_BRANCH} from "./reducerApp"
import axios from "axios";

const useActions = () => {
  const { state, dispatch } = React.useContext(ContextApp || null);

  const getReportType = async (opts) => {
    await dispatch({
      type: UPDATE_GET_REPORT_TYPE,
      payload: {
        load: true
      }
    })
    const response = await axios.get("http://localhost:3001/reportType", opts);
    try {
      await dispatch({
        type: UPDATE_GET_REPORT_TYPE,
        payload: {
          load: false,
          reportTypeResponse: response.data?.body || null,
          messages: response.data?.messages || null
        }
      })
    } catch (e) {
      await dispatch({
        type: UPDATE_GET_REPORT_TYPE,
        payload: {
          load: false,
          messages: [{
            title: e.code,
            text: `При получении типов отчета произошла ошибка. ${e.response?.statusText} Код ошибки ${e.code}. ${e.response?.status}`,
            type: "error", code: "ERROR_NETWORK"}] || null
        }
      })
    }
  };

  const getReportScheme = async (reportId, opts) => {
    await dispatch({
      type: UPDATE_GET_REPORT_SCHEME,
      payload: {
        load: true
      }
    })
    const response = await axios.get("http://localhost:3001/reportScheme/" + reportId, opts);
    try {
      await dispatch({
        type: UPDATE_GET_REPORT_SCHEME,
        payload: {
          load: false,
          reportSchemeResponse: response.data?.body || null,
          messages: response.data?.messages || null
        }
      })
    } catch (e) {
      await dispatch({
        type: UPDATE_GET_REPORT_SCHEME,
        payload: {
          load: false,
          messages: [{
            title: e.code,
            text: `При получении схемы произошла ошибка. ${e.response?.statusText} Код ошибки ${e.code}. ${e.response?.status}`,
            type: "error", code: "ERROR_NETWORK"}] || null
        }
      })
    }
  };

  const getBranch = async (idMega, opts) => {
    await dispatch({
      type: UPDATE_GET_BRANCH,
      payload: {
        load: true
      }
    })
    const response = await axios.get("http://localhost:3001/branch/" + idMega, opts);
    try {
      await dispatch({
        type: UPDATE_GET_BRANCH,
        payload: {
          load: false,
          branchResponse: response.data?.body || null,
          messages: response.data?.messages || null
        }
      })
    } catch (e) {
      await dispatch({
        type: UPDATE_GET_BRANCH,
        payload: {
          load: false,
          messages: [{
            title: e.code,
            text: `При получении схемы произошла ошибка. ${e.response?.statusText} Код ошибки ${e.code}. ${e.response?.status}`,
            type: "error", code: "ERROR_NETWORK"}] || null
        }
      })
    }
  };

  const onReset = async (object_name) => {
    await dispatch({
      type: UPDATE_CONTEXT_APP,
      payload: {
        [object_name]: initialState[object_name]
      }
    })
  };

  return { getReportType, getReportScheme, getBranch, onReset };
};

export { useActions };

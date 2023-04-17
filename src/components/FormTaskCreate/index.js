import * as React from "react";
import { ControlSelect } from "./controls/ControlSelect";
import { useActions } from "../../actions";
import "./styleFormTaskCreate.css";
const initialState = {
  reportId: null
};
export const FormTaskCreate = ({
  formData = {},
  // updateFormData = () => console.log("updateFormData"),
  title = "Создание новой задачи"
}) => {
  const { getReportType } = useActions();
  const [form, setForm] = React.useState({});
  const [reportType, setReportType] = React.useState([]);
  const [reportScheme, setReportScheme] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  // const [reportId, setReportId] = React.useState({
  //   label: "не выбрано",
  //   value: null
  // });

  React.useEffect(() => {
    setForm((form) => ({ ...initialState, ...form, ...formData }));
  }, [formData]);

  React.useEffect(() => {
    console.log("useEffect getReportType");
    getReportType();
  });

  const onSendForm = () => {
    console.log("FormSend");
  };

  const onChangeFormControl = (value) => {
    setForm((form) => ({ ...form, ...value }));
  };

  const onChangeFilterControl = (control) => {
    console.log("onChangeFilterControl");
  };

  return (
    <div className="styleFormTaskCreate">
      <h2>{title}</h2>
      <div className="styleFormTaskCreateRow">
        <ControlSelect
          options={[
            { label: "ВКЛ-11 Реестр сторнированных операций", value: "vkl_11" },
            { label: "ВКЛ-17 Счета с отрицательным остатком", value: "vkl_17" }
          ]}
          select={form?.reportId}
          onChange={onChangeFormControl}
        />
      </div>
      <div className="styleFormTaskCreateRow">row</div>
      <div className="styleFormTaskCreateRow">row</div>
      <div className="styleFormTaskCreateRow">row</div>
      <div className="styleFormTaskCreateRow">row</div>
      <div className="styleFormTaskCreateRow">row</div>
      <div className="styleFormTaskCreateFooter">
        <button disabled={false} onClick={onSendForm}>
          Создать задачу
        </button>
      </div>
    </div>
  );
};

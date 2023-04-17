export const ControlSelect = ({
  options = [],
  select = { label: "не выбрано", value: "" },
  onChange = () => console.log("onChange")
}) => {
  return (
    <>
      <select
        value={select?.value}
        onChange={(e) =>
          onChange({ label: select?.label, value: e.target.value })
        }
      >
        <option value={""}>не выбрано</option>
        {options.map((option, i) => (
          <option key={i} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </>
  );
};

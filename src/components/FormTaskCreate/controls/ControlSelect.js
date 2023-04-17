export const ControlSelect = ({
                                  options = [],
                                  select = {label: "не выбрано", value: ""},
                                  onChange = () => console.log("onChange")
                              }) => {

    return (
        <>
            <select
                value={select?.value}
                onChange={(e) => {
                    const result = options.find(op => (op.value === e.target.value)) || {label: "не выбрано", value: ""}
                    return onChange(result)
                }}
            >
                <option value={""}>не выбрано</option>
                {options.map((option, i) => (
                    <option key={i} value={option?.value}>
                        {option?.label}
                    </option>
                ))}
            </select>
        </>
    )
}

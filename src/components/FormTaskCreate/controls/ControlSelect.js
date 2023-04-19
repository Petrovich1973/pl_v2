import {Autocomplete, TextField} from "@mui/material"

export const ControlSelect = ({
                                  id = "controlId",
                                  multiple = false,
                                  disabled = false,
                                  options = [],
                                  select = null,
                                  onChange = () => console.log("onChange"),
                                  label = ""
                              }) => {

    return (
        <Autocomplete
            disablePortal
            disabled={disabled}
            multiple={multiple}
            size="small"
            id={id}
            options={options}
            value={select}
            onChange={(event, value) => {
                onChange(value)
            }}
            sx={{width: 500}}
            disableCloseOnSelect={false}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={option => `${option.label}`}
            renderOption={(props, option, {selected}) => (
                <li {...props}>{option.label}</li>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    style={{backgroundColor: 'white'}}
                    placeholder="Выбрать"
                />
            )}
        />
    )
}

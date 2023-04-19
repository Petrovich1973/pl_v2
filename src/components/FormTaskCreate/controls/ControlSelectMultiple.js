import {Autocomplete, Checkbox, TextField} from "@mui/material"
import {CheckBoxOutlineBlank, CheckBox} from "@mui/icons-material"

export const ControlSelectMultiple = ({
                                          id = "controlId",
                                          multiple = true,
                                          disabled = false,
                                          options = [],
                                          select = [],
                                          onChange = () => console.log("onChange"),
                                          label = ""
                                      }) => {
    const icon = <CheckBoxOutlineBlank fontSize="small"/>
    const checkedIcon = <CheckBox fontSize="small"/>

    return (
        <Autocomplete
            disabled={disabled}
            multiple={multiple}
            id={id}
            size="small"
            value={select}
            onChange={(event, values) => onChange(values)}
            options={options}
            disableCloseOnSelect
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={option => `${option?.label}`}
            renderOption={(props, option, {selected}) => (
                <li {...props} key={option?.value}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{marginRight: 8}}
                        checked={selected}/>
                    {option.value}
                </li>
            )}
            sx={{width: 500}}
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

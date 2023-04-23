import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import {CheckBoxOutlineBlank, CheckBox} from '@mui/icons-material'

const icon = <CheckBoxOutlineBlank fontSize="small"/>
const checkedIcon = <CheckBox fontSize="small"/>

export const ControlSelectOffice = ({
                                        id = "controlId",
                                        multiple = true,
                                        disabled = false,
                                        onChange = () => console.log('change office'),
                                        options = [],
                                        select = [],
                                        label = "Код ВСП"
                                    }) => {

    return (
        <Autocomplete
            disabled={!options?.length}
            groupBy={(option) => `ОСБ: ${option?.branchno}`}
            multiple={multiple}
            id={id}
            size="small"
            value={select}
            onChange={(event, values) => onChange(values)}
            options={options}
            disableCloseOnSelect
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={option => `${option?.branchno}/${option?.value}`}
            renderOption={(props, option, {selected}) => (
                <li {...props} key={option?.id}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{marginRight: 8}} checked={selected}/>
                    ВСП: {option?.value} - {option?.label}
                </li>
            )}
            sx={{width: 500}}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    style={{backgroundColor: 'white'}}
                    placeholder="Выбрать ВСП"
                />
            )}
        />
    )
}

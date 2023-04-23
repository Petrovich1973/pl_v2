import {TextField} from "@mui/material"

export const ControlTextInput = ({
                                     id = "controlId",
                                     disabled = false,
                                     type = "number",
                                     value = "",
                                     onChange = () => console.log("onChange"),
                                     label = ""
                                 }) => {

    return (
        <TextField
            id={id}
            label={label}
            type={type}
            variant="outlined"
            value={value}
            disabled={disabled}
            onChange={onChange}
            size={"small"}
            sx={{width: 500}}
            inputProps={{inputMode: 'numeric', pattern: '[a-z]*{0,4}'}}
        />
    )
}

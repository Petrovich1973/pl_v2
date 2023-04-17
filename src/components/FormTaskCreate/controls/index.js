import * as React from "react"
import {ControlSelect} from "./ControlSelect"

export const FormField = ({
                              attr = {},
                              filters = {},
                              onChange = () => console.log("FormField onChange")
                          }) => {
    console.log("FormField", filters)

    const onChangeIdMega = select => {
        onChange({[attr.attributeName]: {...attr, values: select.value}})
    }

    if (attr?.attributeName === 'ID_MEGA') {
        const {listOfPresetValues = []} = attr
        const select = filters['ID_MEGA'] ? (
            {label: filters['ID_MEGA']?.attributeDescription, value: filters['ID_MEGA']?.values}
        ) : (
            {label: "не выбрано", value: ""}
        )
        return (
            <ControlSelect options={listOfPresetValues
                .map(element => ({label: element?.visibleName, value: element?.value}))
                .sort((a, b) => (a.value - b.value))}
                           select={select}
                           onChange={onChangeIdMega}/>
        )
    }
    return (
        <small>Нет обработчика для "{attr?.attributeName || "-"}" атрибута</small>
    )
}

import * as React from "react"
import {ContextApp} from "../../../reducerApp"
import {ControlSelect} from "./ControlSelect"
import {ControlSelectMultiple} from "./ControlSelectMultiple"

export const FormField = ({
                              attr = {},
                              filters = {},
                              onChange = () => console.log("FormField onChange")
                          }) => {
    const {state} = React.useContext(ContextApp || null)
    const {listOfPresetValues = [], attributeName} = attr

    const onChangeControlIdMega = select => {
        console.log({...attr, values: select?.value || ""})
        onChange({...attr, values: select?.value || ""})
    }

    const onChangeControlBranchno = select => {
        onChange({...attr, values: select.map(el => el.value).join("Ѫ")})
    }

    if (attributeName === 'ID_MEGA') {
        const options = listOfPresetValues
            .map(element => ({label: element?.visibleName, value: String(element?.value)}))
            .sort((a, b) => (a.value - b.value))

        const select = filters['ID_MEGA'] ? (
            {
                label: options.find(el => String(el.value) === String(filters['ID_MEGA']?.values))?.label,
                value: String(filters['ID_MEGA']?.values)
            }
        ) : null

        return (
            <ControlSelect
                id={attr?.attributeName}
                disabled={!options.length || state.getBranch.load}
                options={options}
                select={select}
                onChange={onChangeControlIdMega}
                label={attr?.attributeDescription}/>
        )
    }

    if (attr?.attributeName === 'BRANCHNO') {
        const options = (state.getBranch.branchResponse || [])
            .filter(element => (element?.branchno && !element?.office))
            .map(element => ({label: element?.title, value: String(element?.branchno)}))
            .sort((a, b) => (a.value - b.value))

        const select = filters['BRANCHNO'] ? (
            filters['BRANCHNO']?.values.split('Ѫ').map(element => ({label: element, value: String(element)}))
        ) : (
            []
        )

        return (
            <ControlSelectMultiple
                id={attr?.attributeName}
                multiple={true}
                disabled={!options.length || state.getBranch.load}
                options={options}
                select={select}
                onChange={onChangeControlBranchno}
                label={attr?.attributeDescription}/>
        )
    }

    return (
        <small>Нет обработчика для атрибута "{attr?.attributeName || "-"}"</small>
    )
}

import * as React from "react"
import {ContextApp} from "../../../reducerApp"
import {ControlSelect} from "./ControlSelect"
import {ControlSelectMultiple} from "./ControlSelectMultiple"
import {ControlTextInput} from "./ControlTextInput"
import {ControlSelectOffice} from "./ControlSelectOffice"

export const FormField = ({
                              attr = {},
                              filters = {},
                              onChange = () => console.log("FormField onChange")
                          }) => {
    const {state} = React.useContext(ContextApp || null)
    const {listOfPresetValues = [], attributeName} = attr

    const onChangeControlIdMega = select => {
        onChange({...attr, values: select?.value || ""})
    }

    const onChangeControlBranchno = select => {
        onChange({...attr, values: select.map(el => el.value).join("Ѫ")})
    }

    const onChangeControlOffice = select => {
        onChange({...attr, values: select.map(el => `${el.branchno}/${el.value}`).join("Ѫ")})
    }

    const onChangeControlText = event => {
        onChange({...attr, values: event.target.value})
    }

    const onChangeControlNumber = event => {
        // const regex  = /^\d+(?:\.\d{0,2})$/
        // if(regex.test(event.target.value))
            onChange({...attr, values: event.target.value})
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

    if (attr?.attributeName === 'OFFICE') {
        const options = (state.getBranch.branchResponse || [])
            .filter(element => (
                (filters['BRANCHNO']?.values?.split("Ѫ").some(el => (el.split('/')[0] === element?.branchno))
                ) && element?.office))
            .map((element, i) => ({
                label: element?.title,
                id: i,
                branchno: element?.branchno,
                value: String(element?.office)
            }))
            .sort((a, b) => (a.branchno - b.branchno || a.value - b.value))

        const select = filters['OFFICE'] ? (
            filters['OFFICE']?.values.split('Ѫ').map(element => ({
                // label: element.split('/')[1],
                // label: "title",
                branchno: element.split('/')[0],
                value: String(element.split('/')[1])
            }))
        ) : (
            []
        )

        return (
            <ControlSelectOffice
                id={attr?.attributeName}
                multiple={true}
                disabled={!options.length || state.getBranch.load}
                options={options}
                select={select || []}
                onChange={onChangeControlOffice}
                label={attr?.attributeDescription}/>
        )
    }

    if (attr?.attributeName === 'PRINTABLENO' ||
        attr?.attributeName === 'KIND' ||
        attr?.attributeName === 'SUBKIND' ||
        attr?.attributeName === 'CURRENCY' ||
        attr?.attributeName === 'OPCASH') {
        const value = filters[attr?.attributeName] ? (
            filters[attr?.attributeName]?.values
        ) : ""

        return (
            <ControlTextInput
                id={attr?.attributeName}
                value={value}
                onChange={onChangeControlNumber}
                label={attr?.attributeDescription}/>
        )
    }

    if (attr?.attributeName === 'SURNAME' ||
        attr?.attributeName === 'FIRSTNAME' ||
        attr?.attributeName === 'SECONDNAME') {
        const value = filters[attr?.attributeName] ? (
            filters[attr?.attributeName]?.values
        ) : ""

        return (
            <ControlTextInput
                id={attr?.attributeName}
                value={value}
                onChange={onChangeControlText}
                label={attr?.attributeDescription}/>
        )
    }

    return (
        <small title="нет обработчика">
            <strong style={{color: "#ba2121"}}>{attr?.attributeName || "attributeName"}</strong>
            {" "}-{" "}
            <strong><em>{attr?.attributeDescription || "attributeDescription"}</em></strong>
            {" "}
            <small>attributeType: {attr?.attributeType}</small>
        </small>
    )
}

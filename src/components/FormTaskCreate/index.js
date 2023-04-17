import * as React from "react"
import {ControlSelect} from "./controls/ControlSelect"
import {useActions} from "../../actions"
import {ContextApp} from "../../reducerApp"
import "./styleFormTaskCreate.css"
import {FormField} from "./controls"

const initialState = {
    reportId: "",
    reportTitle: "",
    // reportId: "vkl_29",
    // reportTitle: "ВКЛ-29 Закрытые счета с ненулевым остатком",
    isPdk: false,
    scheduledTime: null,
    lifetimeLimit: 5,
    filters: {}
}

export const FormTaskCreate = ({
                                   formData = {},
                                   title = "Создание новой задачи"
                               }) => {
    const {state} = React.useContext(ContextApp || null)
    const {getReportType, getReportScheme, getBranch, onReset} = useActions()
    const [form, setForm] = React.useState({...initialState})
    // const [reportType, setReportType] = React.useState([])
    // const [reportScheme, setReportScheme] = React.useState([])
    const [filters, setFilters] = React.useState([])

    // console.log(state)
    // console.log(filters)

    React.useEffect(() => {
        setForm((form) => ({...form, ...formData}))
    }, [])

    React.useEffect(() => {
        const abortCtrl = new AbortController()
        const opts = {signal: abortCtrl.signal}
        void getReportType(opts)

        return () => abortCtrl.abort()
    }, [])

    React.useEffect(() => {
        const abortCtrl = new AbortController()
        const opts = {signal: abortCtrl.signal}

        if (form?.reportId) void getReportScheme(form?.reportId, opts)
        if (!form?.reportId) void onReset('getReportScheme')

        return () => abortCtrl.abort()
    }, [form?.reportId])

    React.useEffect(() => {
        const abortCtrl = new AbortController()
        const opts = {signal: abortCtrl.signal}

        if ('ID_MEGA' in form?.filters) void getBranch(form?.filters['ID_MEGA']?.values, opts)
        if (!('ID_MEGA' in form?.filters)) void onReset('getBranch')

        return () => abortCtrl.abort()
    }, [form?.filters])

    React.useEffect(() => {
        const {reportSchemeResponse} = state.getReportScheme
        if (reportSchemeResponse) {
            setFilters(reportSchemeResponse
                .filter(attr => attr?.filterOrder)
                .sort((a, b) => a?.filterOrder - b?.filterOrder)
                .map(attr => ({...attr, values: ""})))
        } else {
            setFilters([])
        }
    }, [state.getReportScheme?.reportSchemeResponse])

    const onSendForm = () => {
        console.log("FormSend")
    }

    const onChangeFormControlReportId = (select) => {
        setForm((form) => ({...form, reportId: select.value, reportTitle: select.label}))
    }

    const onChangeFormField = (filter) => {
        setForm((form) => ({...form, filters: {...form.filters, ...filter}}))
    }

    return (
        <div className="styleFormTaskCreate">

            <h2>{title}</h2>

            <div className="styleFormTaskCreateRow">
                {state.getReportType?.reportTypeResponse ? <ControlSelect
                    options={state.getReportType?.reportTypeResponse?.map(element => ({
                        label: element.title,
                        value: element.reportId
                    })).sort((a, b) => a.label - b.label)}
                    select={{label: form?.reportTitle, value: form?.reportId}}
                    onChange={onChangeFormControlReportId}/> : <small>loading...</small>}
            </div>

            {filters.length &&
            filters
                .map(attr => (
                    <div key={attr?.attributeName} className="styleFormTaskCreateRow">
                        <FormField attr={attr} filters={form?.filters || {}} onChange={onChangeFormField}/>
                    </div>
                )) || state.getReportScheme.load && <small>loading...</small>}

            <div className="styleFormTaskCreateFooter">
                <button disabled={false} onClick={onSendForm}>
                    Создать задачу
                </button>
            </div>
        </div>
    )
}

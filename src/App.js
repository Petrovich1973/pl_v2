import * as React from "react"
import {FormTaskCreate} from "./components/FormTaskCreate"
import {ListTask} from "./components/ListTask"
import {Pagination} from "./components/Pagination"
import {Report} from "./components/Report"
import {Task} from "./components/Task"
import {TaskListFilter} from "./components/TaskListFilter"
import {ContextApp, initialState, reducerApp} from "./reducerApp"

import "./styles.css"
{/*
{
    "CURRENCY": {
    "attributeName": "CURRENCY",
        "attributeDescription": "Код валюты",
        "attributeType": "decimal(9,0)",
        "values": "810",
        "operation": "=",
        "filterOrder": 5
},
    "BRANCHNO": {
    "attributeName": "BRANCHNO",
        "attributeDescription": "ОСБ",
        "attributeType": "decimal(9,0)",
        "values": "8592,8593",
        "operation": "IN",
        "filterOrder": 2
},
    "OFFICE": {
    "attributeName": "OFFICE",
        "attributeDescription": "Филиал",
        "attributeType": "decimal(9,0)",
        "values": "8595/300Ѫ8595/301Ѫ8595/304Ѫ8595/305",
        "operation": "=",
        "filterOrder": 3
},
    "RUB_EQ": {
    "attributeName": "RUB_EQ",
        "attributeDescription": "Остаток на счете",
        "attributeType": "decimal(38,2)",
        "values": "5000.00Ѫ40000.00",
        "operation": "BETWEEN",
        "filterOrder": 10
},
    "KIND": {
    "attributeName": "KIND",
        "attributeDescription": "Вид вклада",
        "attributeType": "decimal(5,0)",
        "values": "54",
        "operation": "=",
        "filterOrder": 6
},
    "ID_MEGA": {
    "attributeName": "ID_MEGA",
        "attributeDescription": "ТБ",
        "attributeType": "decimal(9,0)",
        "values": "13",
        "operation": "=",
        "filterOrder": 1
},
    "OPTRANSDAY": {
    "attributeName": "OPTRANSDAY",
        "attributeDescription": "Дата",
        "attributeType": "timestamp",
        "values": "1660770000000Ѫ1661029200000",
        "operation": "BETWEEN",
        "filterOrder": 4
}
}
*/}
export default function App() {
    const [state, dispatch] = React.useReducer(reducerApp, initialState)

    return (
        <ContextApp.Provider value={{state, dispatch}}>
            <div className="App">
                <h1>Отчетность по счетам</h1>
                <div className="groupScreen">
                    <div>
                        <FormTaskCreate
                            formData={{
                                // reportId: "",
                                // reportTitle: "",
                                reportId: "vkl_17",
                                reportTitle: "ВКЛ-17 Счета с отрицательным остатком",
                                isPdk: false,
                                scheduledTime: null,
                                lifetimeLimit: 5,
                                filters: {
                                    ID_MEGA: {
                                        attributeDescription: "ТБ",
                                        attributeName: "ID_MEGA",
                                        attributeType: "decimal(9,0)",
                                        filterOrder: 1,
                                        operation: "=",
                                        values: 13
                                    },
                                    BRANCHNO: {
                                        attributeName: "BRANCHNO",
                                        attributeDescription: "ОСБ",
                                        attributeType: "decimal(9,0)",
                                        values: "8592Ѫ8593",
                                        operation: "IN",
                                        filterOrder: 2
                                    },
                                    OPTRANSDAY: {
                                        attributeDescription: "Дата последней операции",
                                        attributeName: "OPTRANSDAY",
                                        attributeType: "timestamp",
                                        filterOrder: 4,
                                        operation: "BETWEEN",
                                        values: "1681812805010/1681812842858"
                                    }
                                }
                            }}
                        />
                    </div>
                    <div>
                        <ListTask
                            listTask={[...Array(5).keys("")].map((element, i) => ({
                                taskId: i + 1,
                                reportTitle: "Счета с отрицательным остатком",
                                taskStatus: 1
                            }))}
                        />
                        <TaskListFilter/>
                    </div>
                    <div>
                        <Task/>
                        <Report/>
                        <Pagination/>
                    </div>
                </div>
            </div>
        </ContextApp.Provider>
    )
}

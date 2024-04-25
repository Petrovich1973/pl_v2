import React from "react"
import './style.css'
import axios from "axios"

const dataDonor = [
    {
        rowNumber: 1,
        idMega: '13',
        branchno: '2345',
        currency: 36,
        printableno: '45638345934568102345',
        fioClerk: 'Гришин Тимур Федорович',
        openday: '12.02.2023',
        opencash: '13000.99',
        age: 51,
        text: 'text'
    },
    {
        rowNumber: 2,
        idMega: '13',
        branchno: '3048',
        currency: 802,
        printableno: '45638345934568100000',
        fioClerk: 'Трахтенберг Эдуард Фаигович',
        openday: '02.10.2022',
        opencash: '6800000.13',
        age: 51,
        text: 'text'
    },
    {
        rowNumber: 3,
        idMega: '13',
        branchno: '1999',
        currency: 2,
        printableno: '21638345934568100000',
        fioClerk: 'Бубенчиков Болтан Волосякович',
        openday: '31.12.2021',
        opencash: '100.00',
        age: 51,
        text: 'text'
    },
    {
        rowNumber: 4,
        idMega: '13',
        branchno: '4721',
        currency: 54,
        printableno: '88888345934568100000',
        fioClerk: 'Теребоньков Яков Кусакович',
        openday: '31.12.2021',
        opencash: '1.50',
        age: 51,
        text: 'text'
    }
]

const columns = [
    {name: 'rowNumber', title: '№ п/п', align: 'right', width: '40px', wrapTitle: 'nowrap'},
    {name: 'idMega', title: 'ТБ', align: 'right', width: '20px', wrapTitle: 'normal'},
    {name: 'branchno', title: 'ОСБ', align: 'right', width: '30px', wrapTitle: 'normal'},
    {name: 'currency', title: 'Код валюты', align: 'right', width: '40px', wrapTitle: 'normal'},
    {name: 'printableno', title: 'Номер счета', align: 'left', width: '140px', wrapTitle: 'normal'},
    {name: 'fioClerk', title: 'ФИО оператора', align: 'left', width: '150px', wrapTitle: 'normal'},
    {name: 'openday', title: 'Дата открытия счета', align: 'left', width: '60px', wrapTitle: 'normal'},
    {name: 'opencash', title: 'Сумма первоначального взноса', align: 'right', width: 'auto', wrapTitle: 'normal'},
    {name: 'age', title: 'Возраст человека', align: 'right', width: 'auto', wrapTitle: 'normal'},
    {name: 'text', title: 'Подробное описание рыботекста', align: 'left', width: '400px', wrapTitle: 'normal'}
]

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const getText = async () => {
    const response = await axios('https://fish-text.ru/get')
    try {
        const {status, text} = response.data
        if(status === "success") {

            const data = await Array.from(Array(100).keys()).map((el) => {
                const element = dataDonor[randomIntFromInterval(0, 3)]
                return ({
                    ...element,
                    rowNumber: el + 1,
                    currency: randomIntFromInterval(10, 100),
                    age: randomIntFromInterval(18, 90),
                    text: text.slice(0, randomIntFromInterval(20, text.length)),
                    fioClerk: element.fioClerk.split(' ').map(str => <div key={str}>{str}</div>)
                })
            })
            return data
        }
    } catch (e) {

    }

}

export const DataGrid = () => {

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        getText().then((data) => setData(data))
    }, [])

    return (
        <div className={'dataGrid'}>
            <table className={'dataGridTable'}>
                <thead>
                <tr>
                    {columns.map(th => (
                        <th key={th.name}
                            style={{
                                width: th.width,
                                textAlign: th.align,
                                whiteSpace: th.wrapTitle
                            }}>
                            {th.title}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((tr, i) => (
                    <tr key={i}>
                        {columns.map(col => (
                            <td
                                key={col.name}
                                style={{
                                    width: col.width,
                                    textAlign: col.align
                                }}>
                                <div style={{width: col.width}}>{tr[col.name]}</div>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

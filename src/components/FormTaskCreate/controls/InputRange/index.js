import React, {useEffect, useRef, useState} from 'react'
import './style.css'

export const InputRange = () => {

    const [v1, setV1] = useState('')
    const [v2, setV2] = useState('')
    const [focus, setFocus] = useState(null)
    const [style1, setStyle1] = useState({})
    const [style2, setStyle2] = useState({})

    useEffect(() => {
        if(!v2 && focus !== 'v2') {
            setStyle1({width: '100%', maxWidth: '100%'})
            setStyle2({width: 0, padding: 0})
        } else {
            setStyle1({width: 'auto'})
            if(focus === 'v2' || (v2 && !focus)) {
                setStyle2({maxWidth: '100%', flexGrow: 1})
            } else {
                setStyle2({width: 'auto'})
            }
        }
    }, [v1, v2, focus])

    const onChange = ({name, value}) => {
        switch (name) {
            case 'v1':
                setV1(value)
                break
            case 'v2':
                setV2(value)
                break
            default:
                setV1(value)
                setV2(value)
        }
    }

    const onFocus = (name) => setFocus(name)
    const onBlur = () => setFocus(null)

    return (
        <div className={'inputRange'}>
            <Input name={'v1'} value={v1} onChange={onChange} onFocus={onFocus} onBlur={onBlur} style={style1}/>
            {(focus === 'v2' || v2) ? '—' : ''}
            <Input name={'v2'} value={v2} onChange={onChange} onFocus={onFocus} onBlur={onBlur} style={style2}/>
        </div>
    )
}

function Input(props) {
    const contentEditableRef = useRef(null)

    const onFocus = () => props.onFocus(props.name)

    useEffect(() => {
        if (contentEditableRef.current?.textContent !== props.value) {
            contentEditableRef.current.textContent = props.value
        }
    })

    const onInput = event => {
        console.log('onInput', event.target?.textContent)
        const value = event.target?.textContent.replace(/[^+\d]/g, '')
        props.onChange({name: props.name, value})
        // contentEditableRef.current.innerText = value // к сожалению я не нашел лекарство от перемещения курсора в начало строки
    }

    const onKeyDown = event => {
        console.log('onKeyDown', event.code)
        if(event.code === 'Space') {
            event.preventDefault()
            const ev = new KeyboardEvent("keydown", { "key": "Tab" })
            contentEditableRef.current?.dispatchEvent(ev)
            event.stopPropagation()
        }
    }

    return (
        <div
            className={'inputRangeElement'}
            contentEditable="true"
            ref={contentEditableRef}
            onFocus={onFocus}
            onBlur={props.onBlur}
            style={props.style}
            onInput={onInput}
            onKeyDown={onKeyDown}
        />
    );
}

import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../modules/calculator'

import { useHistory } from "react-router-dom"

function CalculatorSecond() {
    let history = useHistory()
    // Redux Selector
    const calculate = useSelector(state => state.calculator)
    // Dispatch
    const dispatch = useDispatch()
    // States
    const [thirdNumber, setThirdNumber] = useState(calculate.thirdNumber)
    const [fourthNumber, setFourthNumber] = useState(calculate.fourthNumber)

    const submit = () => {
        const data = {
            firstNumber: calculate.firstNumber,
            secondNumber: calculate.secondNumber,
            thirdNumber: thirdNumber,
            fourthNumber: fourthNumber
        };

        dispatch(actions.setFormTwo(data, redirector))
    }

    const redirector = (link) => {
        history.push(link)
    }

    return (
        <div>
            <h2>CalculatorSecond</h2>
            <p>{`First Total: ${Number(calculate.firstNumber) + Number(calculate.secondNumber)}`}</p>

            <label>Third Number:</label><br />
            <input value={thirdNumber} onChange={e => setThirdNumber(e.target.value)} />
            <br/><br/>

            <label>Fourth Number:</label><br />
            <input value={fourthNumber} onChange={e => setFourthNumber(e.target.value)} />
            <br/><br/>

            <button onClick={submit}>Submit Total Values</button>
        </div>
    )
}

export default CalculatorSecond

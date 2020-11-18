import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { actions } from '../modules/calculator';

function Calculator() {
    let history = useHistory();
    // Redux Selector
    const calculate = useSelector(state => state.calculator);
    // Dispatch
    const dispatch = useDispatch();
    // States
    const [firstNumber, setFirstNumber] = useState(calculate.firstNumber);
    const [secondNumber, setSecondNumber] = useState(calculate.secondNumber);

    const nextForm = () => {
        const payload = { firstNumber, secondNumber };
        dispatch(actions.setFormOne(payload));
        history.push("/calculator/second");
    }

    return (
        <div>
            <h1>Calculator</h1>
            <label>First Number:</label><br />
            <input value={firstNumber} onChange={e => setFirstNumber(e.target.value)} />
            <br/><br/>

            <label>Second Number:</label><br />
            <input value={secondNumber} onChange={e => setSecondNumber(e.target.value)} />
            <br/><br/>

            <button onClick={nextForm}>Next Form</button>
        </div>
    )
}

export default Calculator

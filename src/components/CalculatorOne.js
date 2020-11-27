import React from 'react'

const CalculatorOne = ({ firstNumber, secondNumber, total, submitForm, setFirstNumber, setSecondNumber }) => {
    return (
        <div>
            <label>First Number:</label><br />
            <input value={firstNumber} onChange={e => setFirstNumber(e.target.value)} />
            <br /><br />

            <label>Second Number:</label><br />
            <input value={secondNumber} onChange={e => setSecondNumber(e.target.value)} />
            <br /><br />

            <label>Total: {total}</label>
            <br /><br />

            <button onClick={submitForm}>Submit</button>
        </div>
    )
}

export default CalculatorOne

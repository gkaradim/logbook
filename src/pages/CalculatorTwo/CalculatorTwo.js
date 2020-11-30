import React from 'react'

const CalculatorTwo = ({ thirdNumber, totalTwo, setThirdNumber, submitFormTwo }) => {
    return (
        <div>
            <label>Third Number:</label><br />
            <input type="number" value={thirdNumber} onChange={e => setThirdNumber(e.target.value)} />
            <br /><br />

            <label>Total: {totalTwo}</label>
            <br /><br />

            <button onClick={submitFormTwo}>Submit</button>
        </div>
    )
}

export default CalculatorTwo

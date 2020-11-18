import { createAction, handleActions } from 'redux-actions'
import axios from 'axios'

export const SET_FIRST_FORM_NUMBERS = "SET_FIRST_FORM_NUMBERS"

const setFormOne = createAction(SET_FIRST_FORM_NUMBERS)

const setFormTwo = (data, redirector) => {
    return (dispatch) => {
        const sum = Number(data.firstNumber) + Number(data.secondNumber) + Number(data.thirdNumber) + Number(data.fourthNumber)
        const values = {
            ...data,
            sum
        }

        axios.post('/calculate/values', values)
            .then(res => {
                console.log(res.data.calculation);
                const payload = { firstNumber: "", secondNumber: "" }
                dispatch(setFormOne(payload))
                redirector('/')
            }).catch(err => {
                console.log(err)
            })
    }
}

export const actions = {
    setFormOne,
    setFormTwo
}

const initialState = {
    firstNumber: "",
    secondNumber: ""
}

export default handleActions({
    SET_FIRST_FORM_NUMBERS: (state, { payload }) => {
        return {
            ...state,
            firstNumber: payload.firstNumber,
            secondNumber: payload.secondNumber,
        }
    }
}, initialState)
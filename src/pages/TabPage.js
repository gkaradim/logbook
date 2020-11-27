import React, { useState, useEffect } from 'react'

import { Tabs, Tab } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

import axios from 'axios'
import moment from 'moment'

// Component Page
import CalculatorOne from '../components/CalculatorOne'
import CalculatorTwo from '../components/CalculatorTwo'

function TabPage() {
    const [data, setData] = useState(null)
    const [fromDate, setFromDate] = useState(new Date())
    const [secondNumber, setSecondNumber] = useState("")
    const [firstNumber, setFirstNumber] = useState("")
    const [thirdNumber, setThirdNumber] = useState("")

    useEffect(() => {
        getTodayValues()
    }, []);

    const getTodayValues = async () => {
        try {
            const date = moment(new Date()).format("YYYY-MM-DD");

            const response = await axios.get(`/calculate/${date}`);

            const resData = response.data;

            if (resData.status) {
                setData(resData.data)
                setFirstNumber(resData.data.firstNumber)
                setSecondNumber(resData.data.secondNumber)
                setThirdNumber(resData.data.thirdNumber)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const changeDate = async (newDate) => {
        try {
            setFromDate(newDate);
            const date = moment(newDate).format("YYYY-MM-DD");

            const response = await axios.get(`/calculate/${date}`);

            const resData = response.data;

            if (resData.status) {
                setData(resData.data)
                setFirstNumber(resData.data.firstNumber)
                setSecondNumber(resData.data.secondNumber)
                setThirdNumber(resData.data.thirdNumber)
            } else {
                setData(null)
                setFirstNumber("")
                setSecondNumber("")
                setThirdNumber("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const submitForm = async () => {
        try {
            if (!data) {
                const date = moment(fromDate).format("YYYY-MM-DD");
                const response = await axios.post('/calculate/create', {
                    firstNumber,
                    secondNumber,
                    fromDate: date
                });

                const data = response.data;

                if (data.status) {
                    setData(data)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const submitFormTwo = async () => {
        try {
            if (!data) {
                alert("First set first number and second number")
            } else {
                const response = await axios.put(`/calculate/${data._id}`, {
                    thirdNumber,
                    firstNumber
                })

                const resData = response.data;

                if (resData.status) {
                    setData(resData.data)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="px-5">
            <h2 className="mb-3">TAB PAGE</h2>

            <DatePicker className="mb-4" selected={fromDate} onChange={date => changeDate(date)} />

            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab className="py-5" eventKey="home" title="Calculator 1">
                    <CalculatorOne
                        firstNumber={firstNumber}
                        secondNumber={secondNumber}
                        total={data ? data.total : ""}
                        submitForm={submitForm}
                        setFirstNumber={setFirstNumber}
                        setSecondNumber={setSecondNumber}
                    />
                </Tab>

                <Tab className="py-5" eventKey="profile" title="Calculator 2">
                    <CalculatorTwo
                        thirdNumber={thirdNumber}
                        totalTwo={data ? data.totalTwo : ""}
                        setThirdNumber={setThirdNumber}
                        submitFormTwo={submitFormTwo}
                    />
                </Tab>
            </Tabs>
        </div>
    )
}

export default TabPage

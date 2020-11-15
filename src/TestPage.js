import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { actions } from './modules/account';

function TestPage() {
    // const account = useSelector(state => state.account);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(account)
        // dispatch({ type: "TEST_LOADING", payload: "ASD" });
        // dispatch(actions.loader())
        dispatch(actions.fetchTheData());
    }, []);

    return (
        <div>
            {/* <p>HELLO {`${account.loading}`}</p> */}
        </div>
    )
}

export default TestPage

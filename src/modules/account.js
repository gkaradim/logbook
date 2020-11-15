import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
// Burası ActionTypes olarak kullanılır
export const TEST_LOADING = "TEST_LOADING";
export const SET_USER_DATAS ="SET_USER_DATAS";

// ------------------------------------
// Actions
// ------------------------------------
/*
    Actionlar, burada yaratılabilir.
    CreateAction:
        İçerisine aldığı değer actionType'tır.
*/
const testLoading = createAction(TEST_LOADING);
const setUserDatas = createAction(SET_USER_DATAS);


/*
    Ek olarak "const loader" da bir action'dur.
    createAction'la ayni islevi gorur.
    Bir ornek:
        dispatch(testLoading(true));
        > Buradaki true degeri bir payload'dir.
        > Reducer'lari kullanirken bu payload icerisindeki veriler kullanilir.
*/

/**
 * Loaderrr
 * @returns {function(*): *}
 */
const loader = () => {
    return (dispatch) => {
        console.log("LOADER WORKING");
        // true => payload
        dispatch(testLoading(true));
        // dispatch({ type: TEST_LOADING });
    }
}

const fetchTheData = () => {
    return (dispatch) => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                dispatch(setUserDatas(res.data));
            }).catch(err => {
                console.log(err.response ? err.response : err);
            });
    }
}

/* Actionlar disari aktarilir. Diger WEB sayfalarda kullanilabilmesi icin. */
export const actions = {
    loader,
    testLoading,
    fetchTheData
};

// ------------------------------------
// Reducer
// ------------------------------------
// Konuyla ilgili (account), ilk degerler yaratilir.
const initialState = {
    loading: false,
    data: {},
    users: []
}

/*
    HandleActions:
        Burasi reducer kismidir.
        > TEST_LOADING = actionType
            Bunun karsiligi bir fonksiyondur.
            state default olarak initialState'i kabul eder.
            payload ise yukarida belirttigim gibi icerisinde bulunan degeri buraya alir.
            "Burada payload'in kullanimi yapacagimiz isleme gore degisir."
    HandeActions export default ile disa aktarilir ve combineReducer icin kullanilir.
*/
export default handleActions({
    TEST_LOADING: (state, { payload }) => {
        console.log(payload);
        return {
            ...state,
            loading: true
        }
    },
    SET_USER_DATAS: (state, { payload }) => {
        return {
            ...state,
            users: payload
        }
    }
}, initialState);
import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
// Burası ActionTypes olarak kullanılır
export const TEST_LOADING = "TEST_LOADING";

// ------------------------------------
// Actions
// ------------------------------------
/*
    Actionlar, burada yaratılabilir.
    CreateAction:
        İçerisine aldığı değer actionType'tır.
*/
const testLoading = createAction(TEST_LOADING);


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
    }
}

/* Actionlar disari aktarilir. Diger WEB sayfalarda kullanilabilmesi icin. */
export const actions = {
    loader,
    testLoading
};

// ------------------------------------
// Reducer
// ------------------------------------
// Konuyla ilgili (account), ilk degerler yaratilir.
const initialState = {
    loading: false,
    data: {}
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
    }
}, initialState);
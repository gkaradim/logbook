import { combineReducers } from 'redux';

/* 
    Account:
        Bu dosya içerisinde;
            Actions
            Reducers
            ActionTypes
        bulunur.
*/
import account from './account';

// CombineReducers: Reducer'ları kombine eder ve bunları beraber kullanılmasını sağlar.
// Bir tür birleştirme sağlar.
export default combineReducers({
    account
});
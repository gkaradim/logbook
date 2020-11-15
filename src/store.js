import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './modules';

// İlk alınan değerler değişken olarak yaratılır.
const initialState = {};
const enhancers = [];
const middleware = [thunk];
const persistConfig = {
    key: "root",
    storage
};

/*
    PersistReducer:
        Reducer'dan farklı olarak, verileri localStorage'da tutar.
        Bu sayede veriler sayfa yenilendiğinde veya sayfa kapatılıp açıldığında kaybolmazlar.
*/
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Geliştirme modu açıkken chrome eklentisi varsa, chrome redux eklentisini aktif eder.
if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
    }
}

// Ara araçların redux içerisinde kullanımını sağlar.
// Redux Thunk bir araçtır ve bunu reduxa ekler.
// Örnek olarak REDUX_DEVTOOLS da bir araçtır. Redux'a bunu da dahil eder.
const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

/* 
    Create Store:
        Redux'la ilgili yaratılan action, reducer'ları sisteme ekler.
*/
const store = createStore(persistedReducer, initialState, composedEnhancers);

// hot reloading
// Geliştirme modu açıkken değişiklikler olduğunda anlık yenileme sağlar.
if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
        module.hot.accept('./modules', () => {
            store.replaceReducer(rootReducer);
        });
    }
}

export const persistor = persistStore(store);
export default store;

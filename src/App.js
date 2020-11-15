/* 
  Provider:
    Kapsayıcıdır. Provider yazılan sistemin en dış katmanı olmalı.
    Provider katmanı, içerisinde bulunduğu sayfaların redux ile çalışmasını sağlar.
    Ana katmandır.
*/

/*
 PersistGate:
  Persistor değişkeni alır. Bu persistor reducer'ları barındırır.
  Normal reducer'lardan farkı ise, bilgileri localStorage'da tutar.
  Yani veriler sayfa yenilendiğinde kaybolmaz.
*/

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// CUSTOMS
import store, { persistor } from './store';

// CSS
import './App.css';

import TestPage from './TestPage';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TestPage />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

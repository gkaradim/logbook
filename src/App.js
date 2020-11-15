/* 
  Provider:
    It is the container we use to transfer data to all React app.
    Provider layer is letting the pages work with redux if they are inside of the provider.
    It is the main layer.
*/

/*
 PersistGate:
  It takes persistor as vairable.It keeps inside the reducers.
  There is a slight difference , it keeps localStorage.
  When you refresh the page it doesnt go away.
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

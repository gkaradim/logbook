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

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

// CUSTOMS
import store, { persistor } from "./store";

// CSS
import "./App.css";

import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import CalculatorSecond from "./pages/CalculatorSecond";
import TabPage from "./pages/TabPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/calculator">Calculator</Link>
                  </li>
                  <li>
                    <Link to="/tabs">Influent</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/calculator">
                <Calculator />
              </Route>
              <Route path="/calculator/second">
                <CalculatorSecond />
              </Route>
              <Route path="/tabs">
                <TabPage />
              </Route>
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

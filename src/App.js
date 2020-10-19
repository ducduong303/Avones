import React from 'react';
import {BrowserRouter as Router, Switch,Route,} from "react-router-dom";

import "../src/assets/css/style.scss";
import Context from './context/Context';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Context>
                        <Route exact path="/">
                                <Home></Home>
                        </Route>
                        <Route path="/account/login">
                                <Login></Login>
                        </Route>
                        <Route path="/account/register" component={Register}></Route>
                        <Route path="/product/:id" component={ProductDetail} />
                        <Route path="/cart" component={Cart} />
                    </Context>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

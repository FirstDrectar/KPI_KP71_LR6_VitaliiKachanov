import React, { Component } from "react";
import {
    Route,
    BrowserRouter
} from "react-router-dom";
import LoginForm from "./LoginForm"
import DashBoard from "./DashBoard"

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Route exact path="/" component={LoginForm}/>
                    <Route path="/dashboard" component={DashBoard}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;
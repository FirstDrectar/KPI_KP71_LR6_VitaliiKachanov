import React, { Component } from "react";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            users: [
                {name : "vitas1", password :"vitas1"}
                ]
        };

        this.name_change = this.name_change.bind(this);
        this.password_change = this.password_change.bind(this);

        this.handle_submit = this.handle_submit.bind(this);
    }

    name_change(event) {
        this.setState({name: event.target.value});
    }

    password_change(event) {
        this.setState({password: event.target.value});
    }

    handle_submit = event => {
        event.preventDefault();

        let my_user = {};
        for (let user of this.state.users) {
            if (user.name === this.state.name) {
                my_user = user;
                break;
            }
        }

        if (!isNaN(parseInt(this.state.name.slice(-1))) &&
            /^[a-zA-Z][a-zA-Z\s]*$/.test(this.state.name.substring(0, this.state.name.length - 1))
        )
        {
            if (typeof my_user === "undefined") {
                unsuccessful_border("login");
                document.getElementById("error").innerHTML = "Error. Your login is incorrect";
            } else if (my_user.password !== this.state.password) {
                unsuccessful_border("password");
                successful_border("login");
                document.getElementById("error").innerHTML = "Error. Your password is incorrect";
            } else {
                this.props.history.push("/dashboard");
            }

        } else {
            unsuccessful_border("login");
            document.getElementById("error").innerHTML = "Error. Your login is incorrect";
        }
    }

    render() {
        return (
            <form onSubmit={this.handle_submit}>
                <div className="form-group">
                    <label htmlFor="login">Name</label>
                    <input value={this.state.name} onChange={this.name_change} type="text" className="form-control" id="login" placeholder="Enter login"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={this.state.password} onChange={this.password_change} type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <p id="error"></p>
                <button type="submit" className="btn btn-dark">Submit</button>
            </form>
        );
    }
}

function unsuccessful_border(id) {
    document.getElementById(id).style.borderColor = "red";
}

function successful_border(id) {
    document.getElementById(id).style.borderColor = "green";
}

export default LoginForm;
import React, { Component } from "react";

class DashBoard extends Component {

    state = {
        days: [],
        inputLinkClicked: false,
        index : 0
    }

    componentDidMount() {

        const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
        fetch(cors_api_url + "https://www.metaweather.com/api/location/924938/", {
                method: 'GET'
            })
            .then(result => result.json())
            .then(data => {
                document.getElementById("loader").remove();
                this.setState({
                    days : data.consolidated_weather,
                    inputLinkClicked: true
                });
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div className="my_container" id="container">
                <div className="loader" id="loader"></div>
                {
                    this.state.inputLinkClicked ?
                        this.state.days.map(day => {
                            return (
                                <Day day={day} key={day.ideal} />
                            )
                        })
                        :
                        <div></div>
                }
            </div>
        );
    }
}


function Day(props) {
    return (
        <div className="card">
            <img src={createImage(props.day.weather_state_name)} className="card-img-top" alt="Cloud" />
            <div className="card-body">
                <h5 className="card-title">{props.day.weather_state_name}</h5>
                <p className="card-text">Date : {props.day.weather_state_abbr}</p>
                <p className="card-text">Min temp : {props.day.min_temp}</p>
                <p className="card-text">Max temp : {props.day.the_temp}</p>
                <p className="card-text">Wind speed : {parseFloat(props.day.wind_speed).toFixed(2)}</p>
                <p className="card-text">Wind direction : {parseFloat(props.day.wind_direction).toFixed(2)}</p>
            </div>
        </div>
    )
}

function createImage(name) {
    switch(name) {
        case "Showers" : return "https://ssl.gstatic.com/onebox/weather/48/rain.png";
        case "Light Rain" : return "https://ssl.gstatic.com/onebox/weather/48/rain_light.png";
        case "Light Cloud" : return "https://ssl.gstatic.com/onebox/weather/48/sunny_s_cloudy.png";
        case "Heavy Cloud" : return "https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png";
        default : return "https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png";
    }
}

export default DashBoard;
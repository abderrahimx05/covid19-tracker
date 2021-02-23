import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import {
    FormControl,
    Select,
    MenuItem,
    Card,
    CardContent,
} from "@material-ui/core";

function App() {
    //https://disease.sh/v3/covid-19/countries i use this to get countries

    const [countries, setCounties] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [dataTable, setDataTAble] = useState([]);
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);
    useEffect(() => {
        const getCountriesData = async() => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso3,
                    }));
                    setDataTAble(data);
                    setCounties(countries);
                });
        };
        getCountriesData();
    }, []);
    const onCountryChange = async(event) => {
        const countryCode = event.target.value;
        console.log(countryCode);
        setCountry(countryCode);

        const url =
            countryCode === "worldwide" ?
            "https://disease.sh/v3/covid-19/all" :
            `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCountry(countryCode);
                setCountryInfo(data);
            });
    };
    console.log("====================================");
    console.log(countryInfo);
    console.log("====================================");
    //https://disease.sh/v3/covid-19/countries

    return ( <
            div className = "app" > { " " } { /* i use here 2 container one in the left and the other in the other in the right for organize my code */ } { " " } <
            div className = "app_left" >
            <
            div className = "app_header" >
            <
            h1 > COVID - 19 TRACKER < /h1>{" "} <
            FormControl className = "app_dropdown" >
            <
            Select variant = "outlined"
            onChange = { onCountryChange }
            value = { country } >
            <
            MenuItem value = "worldWide" > WorldWide < /MenuItem>{" "} {
            countries.map((country) => ( <
                MenuItem value = { country.value } > { country.name } < /MenuItem>
            ))
        } { " " } <
        /Select>{" "} < /
    FormControl > { " " } <
        /div>{" "} <
    div className = "app_stats" >
        <
        InfoBox title = "Coronavirus Cases"
    cases = { countryInfo.todayCases }
    total = { countryInfo.cases }
    />{" "} <
    InfoBox title = "Recovered"
    cases = { countryInfo.todayRecovered }
    total = { countryInfo.recovered }
    />{" "} <
    InfoBox title = "Deaths"
    cases = { countryInfo.todayDeaths }
    total = { countryInfo.deaths }
    />{" "} { / * info corona cases * / } { / * info corona recoveries * / } { " " } { / * info of details * / } { " " } < /
    div > { " " } { /* Header */ } { /* title and select input  */ } { /**Map */ } < Map / >
        <
        /div>{" "} <
    Card className = "app_right" > { " " } { /* this section is for table and the graph for data */ } <
        CardContent >
        <
        h3 > Live cases by Country < /h3> {/ ** table * /}{" "} <
    Table countries = { dataTable }
    /> <h3> Worldwide new cases </h
    3 > { " " } { /**Graph */ } { " " } <
        /CardContent>{" "} < /
    Card > { " " } <
        /div>
);
}

export default App;
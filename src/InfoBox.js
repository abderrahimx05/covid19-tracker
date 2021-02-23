import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function infoBox({ title, cases, total }) {
    return ( <
        Card className = "infoBox" >
        <
        CardContent > { " " } { /*title  Coronavirus cases*/ } { " " } <
        Typography className = "info_title"
        color = "textSecondary" > { " " } { title } { " " } <
        /Typography>{" "} <
        h2 className = "info_cases" > { cases } < /h2>{" "} <
        Typography className = "info_total"
        color = "textSecondary" > { " " } { total }
        Total { " " } <
        /Typography>{" "} { /*number of cases */ } { /*number total*/ } { " " } <
        /CardContent>{" "} <
        /Card>
    );
}
ss;

export default infoBox;
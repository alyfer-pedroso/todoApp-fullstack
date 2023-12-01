import React from "react";
import _if from "./if";

export default (props) => (
    <_if text={!props.hide}>
        <button className={"btn btn-" + props.style} onClick={props.onClick}>
            <i className={"fa fa-" + props.icon}></i>
        </button>
    </_if>
);

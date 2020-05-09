import React from "react";
import { useLocation } from "react-router";
import queryString from 'query-string';
import { Redirect } from "react-router-dom";


export default function CodeAuth() {
    const location = useLocation();
    const values = queryString.parse(location.search)
    console.log(values.code)
    return(
        <Redirect to={{
            pathname: '/channels',
            state:{code: values.code }
        }}
/>
    )
}

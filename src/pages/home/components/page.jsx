import React, { useState, useEffect, useContext } from 'react';
import Form from './form';
import Result from './result';
import '../css/page.css';
import Collapsible from 'react-collapsible';
import {GAP_AG, GAP_HAR, Process, getResidualRiskSummary, AT_HAR, PRE_HAR } from './../../../util/math';
import { storeContext } from './../../../util/store';
import Paper from '@mui/material/Paper';

function Page(props) {
    const [results, setResults] = useState(undefined);
    const [final_results, setFinalResults] = useState(undefined);

    useEffect(() => {
        console.log('results: ' + results)

        if (results != undefined) {
            let numerical = {
                "GAP_AG": props.store['GAP_AG'][results['GAP_AG']],
                "GAP_HAR": props.store['GAP_HAR'][results['GAP_HAR']],
                "PRE_HAR": props.store['PRE_HAR'][results['PRE_HAR']],
                "AT_HAR": props.store['AT_HAR'][results['AT_HAR']],
                "Process": props.store['Process'][results['Process']],
                "Finished": results['Finished']
            };
            console.log(numerical);
            let risk = getResidualRiskSummary(
                numerical['GAP_AG'],
                numerical['GAP_HAR'],
                numerical['PRE_HAR'],
                numerical['AT_HAR'],
                numerical['Process'],
                numerical['Finished']
            )
            console.log(risk);
            setFinalResults(risk);
        }
    }, [results, props.store]);

    return (
        <Paper
            style={{
                "border": "none",
                width: "100%"
            }}
            elevation={4}
        >
            <Form setResults={setResults} final_results={final_results}/>
            <Result results={final_results} />
        </Paper>
    );
}

export default Page;
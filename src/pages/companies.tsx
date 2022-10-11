import React, { useEffect, useState } from "react";
import { Collapse } from 'antd';

import api from "../services/api";

const { Panel } = Collapse;

export default function Companies() {
    const [companies, setCompanies] = useState<any[]>([]);

    useEffect(() => {
        const promise = api.getAllCompanies();
        promise.then((response) => {
            console.log(response);
            setCompanies(response.data);
        });
    }, []);

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    return (
        <>
            <h1>Companies</h1>
            {companies ? companies.map((company) =>
                <Collapse onChange={onChange}>
                    <Panel header={company.name} key="1">
                        <h2>{company.name}</h2>
                        <Units name={company.name}/>
                    </Panel>
                </Collapse>
            ): null}
        </>
    );
}

function Units(props: any) {
    const { name } = props;
    const [units, setUnits] = useState<any[]>([]);

    useEffect(() => {
        const promise = api.getUnitsByCompany(name);
        promise.then((response) => {
            console.log(response);
            setUnits(response.data);
        });
    }, []);

    return (
        <>
            {units ? units.map((unit) =>
                <div>
                    <h3>{unit.name}</h3>
                </div>) : null}
        </>
    );
}

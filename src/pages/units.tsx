import React, { useEffect, useState } from "react";
import { Collapse } from 'antd';

import api from "../services/api";

const { Panel } = Collapse;

export default function Units() {
    const [units, setUnits] = useState<any[]>([]);

    useEffect(() => {
        const promise = api.getUnits();
        promise.then((response) => {
            console.log(response);
            setUnits(response.data);
        });
    }, []);

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    return (
        <>  
            <h1>Units</h1>
            {units ? units.map((unit) =>
                <Collapse onChange={onChange}>
                    <Panel header={unit.name} key="1">
                        <p><strong>Company: </strong>{unit.company}</p>
                    </Panel>
                </Collapse>
            ): null}
        </>
    );
}

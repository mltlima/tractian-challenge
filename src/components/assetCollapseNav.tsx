import { Collapse } from 'antd';
import React from 'react';
import { Progress } from 'antd';

const { Panel } = Collapse;

export interface Asset {
    description: string;
    health: number;
    image: string;
    model: string;
    name: string;
    owner: string;
    status: string;
    unit: string;
}

export default function AssetCollapseNav({description, health, image, model, name, owner, status, unit}: Asset ) {

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    return (
        <Collapse onChange={onChange}>
            <Panel header={name} key="1">
                <img className='asset-image' src={image} alt={name} />
                <p><strong>Health</strong></p>
                <Progress type="circle" percent={health} style={{marginBottom: "15px" }}/>
                <p><strong>Status: </strong> {status}</p>
                <Progress type="circle" percent={status === "Running" ? 100 : status === "Alerting" ? 50 : 0} style={{marginBottom: "15px" }}/>
                <p><strong>Description: </strong> {`${description}`}</p>
                <p><strong>Model: </strong> {model}</p>
                <p><strong>Owner: </strong>{owner}</p>
                <p><strong>Unit: </strong> {unit}</p>
            </Panel>
        </Collapse>
    );
};

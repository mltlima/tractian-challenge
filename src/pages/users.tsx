import React, { useEffect, useState } from "react";
import { Collapse } from 'antd';

import api from "../services/api";

const { Panel } = Collapse;

export default function Users() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const promise = api.getAllUsers();
        promise.then((response) => {
            setUsers(response.data);
        });
    }, []);

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    return (
        <>  
            <h1>Users</h1>
            {users ? users.map((user) =>
                <Collapse onChange={onChange}>
                    <Panel header={user.username} key="1">
                        <p><strong>Email: </strong>{user.email}</p>
                        <p><strong>Company: </strong>{user.company}</p>
                    </Panel>
                </Collapse>
            ): null}
        </>
    );
}
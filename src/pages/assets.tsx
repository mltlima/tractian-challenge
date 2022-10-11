import React, { useEffect, useState } from "react";

import api from "../services/api";

export default function Assets() {
    const [assets, setAssets] = useState<any[]>([]);

    useEffect(() => {
        const promise = api.getAllAssets();
        promise.then((response) => {
            console.log(response);
            setAssets(response.data);
        });
    }, []);

    return (
        <>
            <h1>Assets</h1>
            {assets ? assets.map((asset) => <p>{asset.name}</p>) : null}
        </>
    );
}

import React, { useEffect, useState } from "react";

import api from "../services/api";
import AssetCollapseNav, { Asset } from "../components/assetCollapseNav";
import AssetChart from "../components/assetChart";

export default function Assets() {
    const [assets, setAssets] = useState<any[]>([]);
    const [graphData, setGraphData] = useState<any[]>([]);

    useEffect(() => {
        const promise = api.getAllAssets();
        promise.then((response) => {
            console.log(response);
            setAssets(response.data);

            const data = response.data.map((asset: Asset) => {
                return {
                    name: asset.name,
                    y: asset.health
                };
            });
            if (data.length > 0) {
                setGraphData(data);
            }
        });
    }, []);
  
    return (
        <>  
            {graphData.length > 1 ? <AssetChart name="Assets" data={graphData} /> : null}
            <h1>Assets</h1>
            {assets ? assets.map((asset) => 
            <AssetCollapseNav description={asset.description} health={asset.health} image={asset.image} model={asset.model} name={asset.name} owner={asset.owner} status={asset.status} unit={asset.unit}/>) 
            : null}
        </>
    );
}

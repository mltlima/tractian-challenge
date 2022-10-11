import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


export default function AssetChart(props: any) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options: Highcharts.Options = {
    title: {
        text: props.name,
    },
    series: [{
        name: "Health",
        type: 'column',
        colorByPoint: true,
        data: props.data,
    }]
};

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  );
};
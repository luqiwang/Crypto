import React, {Component} from 'react'
import {Line} from 'react-chartjs-2'

/*
data format
[{
  time: 1523592000
  close: 7832.39
  high: 7854.06
  low: 7804.49
  open: 7835.01
  volumefrom: 2672.2
  volumeto: 21007411.03
},
...]
*/
const GraphDetail = ({data}) => {

  const labels = data.map(o => new Date(o.time).getHours());
  const ds = data.map(o => o.close);
  const histoData = {labels, datasets: [{data: ds}]};

  return (
    <Line data={histoData} />
  );
};

export default GraphDetail;

import React from 'react';
import {connect} from 'react-redux';
import MonitorList from './MonitorList';

function Monitor({coins, prices, history}) {
  if (!prices) history.push('/');

  return (
  <div style={{padding: "10px"}}>
    <h2>Your Monitoring</h2>
    <MonitorList coins={coins} prices={prices} />
  </div>

  )
}

export default connect(({auth: {coins}, prices}) => ({coins, prices}))(Monitor);

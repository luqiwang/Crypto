import React from 'react';
import {connect} from 'react-redux';
import MonitorList from './MonitorList';

function Monitor({coins, prices}) {

  return (
  <div>
    <h1>Your Monitoring</h1>
    <MonitorList coins={coins} prices={prices} />
  </div>

  )
}

export default connect(({auth: {coins}, prices}) => ({coins, prices}))(Monitor);

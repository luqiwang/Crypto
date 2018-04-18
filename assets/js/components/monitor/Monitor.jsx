import React from 'react';
import {connect} from 'react-redux';
import MonitorList from './MonitorList';
import {Redirect} from 'react-router-dom';

function Monitor({coins, prices, history}) {
  if (!prices) {
    console.log(history);
    return <Redirect to="/" />
    //history.push('/');
  }

  return (
  <div>
    <MonitorList coins={coins} prices={prices} />
  </div>

  )
}

export default connect(({auth: {coins}, prices}) => ({coins, prices}))(Monitor);

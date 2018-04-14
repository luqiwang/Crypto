import React from 'react';
import MonitorItem from './MonitorItem';
import { Button, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';


export default function MonitorList({coins, prices}) {
  const items = coins.map(
    coin => <MonitorItem key={coin.id} coin={coin} price={prices[coin.code]['USD']} />
  );

  return <div>
    <div className="jumbotron" style={{fontSize:30, backgroundImage: "url(" + "images/jumbotron.jpg" + ")"}}>
      <span style={{color:'grey'}}>CryptoMonitor</span>
    </div>
    <Card style={{backgroundColor: '#DDDDDD',}}>
      <CardBody>
      <Row>
          <Col>Icon</Col>
          <Col>Coin</Col>
          <Col>Price</Col>
          <Col>Hold</Col>
          <Col>Low / High Limits</Col>
          <Col>Detail</Col>
          <Col>Setting</Col>
          <Col>Cancel Monitoring</Col>
      </Row>
    </CardBody>
    </Card>

    <div>
      { items }
    </div>

  </div>;
}
